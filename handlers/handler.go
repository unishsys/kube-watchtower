package handlers

import (
	"context"
	"io/fs"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"time"

	"embed"

	"github.com/by-sabbir/kube-watchtower/k8s"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Handler struct {
	Router     *echo.Echo
	Server     *http.Server
	Logger     *slog.Logger
	KubeClient *k8s.KubeClient
}

type Resp struct {
	Status string `json:"status"`
	Msg    string `json:"msg"`
	Error  error  `json:"error"`
	Data   any    `json:"data"`
}

//go:embed spa
var staticContent embed.FS

func NewHandler(kubeClient *k8s.KubeClient) *Handler {
	e := echo.New()
	l := kubeClient.Logger
	h := &Handler{
		Logger: l,
	}
	server := &http.Server{
		Addr:         ":8081",
		ReadTimeout:  30 * time.Second,
		Handler:      e.Server.Handler,
		WriteTimeout: 30 * time.Second,
	}

	h.KubeClient = kubeClient

	h.Server = server
	e.Use(middleware.CORS())
	h.Router = e
	h.mapRoute()

	return h
}

func (h *Handler) Ping(c echo.Context) error {

	c.JSON(http.StatusOK, map[string]string{
		"ping": "pong",
	})

	return nil
}

func (h *Handler) mapRoute() {
	// Serve static files
	fsys, err := fs.Sub(staticContent, "spa")
	if err != nil {
		panic(err)
	}

	h.Router.GET("/", echo.WrapHandler(http.FileServer(http.FS(fsys))))
	h.Router.GET("/assets/*", echo.WrapHandler(http.FileServer(http.FS(fsys))))
	h.Router.GET("/ping", h.Ping)

	rg := h.Router.Group("/api/v1")
	rg.GET("/get-namespaces", h.GetNamespaces)
	rg.POST("/apply", h.ApplyCM)

	nodeRg := h.Router.Group("/api/v1/nodes")
	nodeRg.GET("/", h.GetNodesInfo)

	podRg := h.Router.Group("/api/v1/pods")
	podRg.GET("/", h.GetAllPodsInfo)

	cmRg := h.Router.Group("/api/v1/cm")
	cmRg.GET("/:namespace", h.GetCmByNamespace)
	cmRg.GET("/:namespace/:name", h.GetCmByName)
	cmRg.POST("/:namespace/:name", h.SetConfigMapByName)

	deployRg := h.Router.Group("/api/v1/deploy")
	deployRg.POST("/", h.ScaleDeploymentsByName)
	deployRg.GET("/:namespace", h.ListDeploymentsByNamespace)
	deployRg.GET("/:namespace/:name", h.GetContainersInDeployment)
	deployRg.GET("/:namespace/:name/yaml", h.GetDeploymentYaml)
	deployRg.POST("/:namespace/:name/yaml", h.UpdateDeploymentYaml)

	svcRg := h.Router.Group("/api/v1/svc")
	svcRg.POST("/", h.CreateService)
	svcRg.GET("/:namespace", h.GetAllServicesByNs)
	svcRg.DELETE("/:namespace/:name", h.DeleteServiceByName)

	logsRg := h.Router.Group("/api/v1/logs")
	logsRg.GET("/deploy/:namespace/:name", h.GetDeploymentLogs)
	logsRg.GET("/pod/:namespace/:name", h.GetPodLogs)

}

func (h *Handler) Start() error {

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()
	// Start server
	go func() {
		h.Logger.Info("initiating server", "addr", h.Server.Addr)
		if err := h.Server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			h.Logger.Error("shutting down the server", "error", err)
		}
	}()

	// Wait for interrupt signal to gracefully shutdown the server with a timeout of 10 seconds.
	<-ctx.Done()
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := h.Server.Shutdown(ctx); err != nil {
		h.Logger.Error("could not gracefully shutdown", "error", err)
		return err
	}

	return nil
}
