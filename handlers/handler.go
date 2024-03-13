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

	"github.com/by-sabbir/config-mapper/k8s"
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

//go:embed static
var embededFiles embed.FS

func getFileSystem() http.FileSystem {
	fsys, err := fs.Sub(embededFiles, "static")
	if err != nil {
		panic(err)
	}
	return http.FS(fsys)
}

func NewHandler(kubeClient *k8s.KubeClient) *Handler {

	e := echo.New()
	l := kubeClient.Logger
	h := &Handler{
		Logger: l,
	}
	server := &http.Server{
		Addr:         ":8080",
		ReadTimeout:  30 * time.Second,
		Handler:      e.Server.Handler,
		WriteTimeout: 30 * time.Second,
	}

	h.KubeClient = kubeClient

	e.Use(middleware.CORS())
	h.Server = server
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
	assetHandler := http.FileServer(getFileSystem())
	h.Router.GET("/static/*", echo.WrapHandler(http.StripPrefix("/static/", assetHandler)))
	h.Router.GET("/", h.IndexView)

	h.Router.GET("/ping", h.Ping)

	rg := h.Router.Group("/api/v1")
	rg.GET("/get-namespaces", h.GetNamespaces)
	rg.POST("/apply", h.ApplyCM)

	cmRg := h.Router.Group("/api/v1/cm")
	cmRg.GET("/:namespace", h.GetCmByNamespace)
	cmRg.GET("/:namespace/:name", h.GetCmByName)
	cmRg.POST("/:namespace/:name", h.SetConfigMapByName)

	deployRg := h.Router.Group("/api/v1/deploy")
	deployRg.POST("/", h.ScaleDeploymentsByName)
	deployRg.GET("/:namespace", h.ListDeploymentsByNamespace)
}

func (h *Handler) Start() error {

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt)
	defer stop()
	// Start server
	go func() {
		if err := h.Server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			h.Logger.Error("shutting down the server")
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
