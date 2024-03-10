package handlers

import (
	"log/slog"
	"net/http"
	"time"

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
	h.Router.Static("/static", "./static")

	h.Router.GET("/ping", h.Ping)

	rg := h.Router.Group("/api/v1")
	rg.POST("/apply", h.ApplyCM)
	rg.GET("/get-namespaces", h.GetNamespaces)
	rg.GET("/cm/:namespace", h.GetCmByNamespace)
	rg.GET("/cm/:namespace/:name", h.GetCmByName)
	rg.POST("/cm/:namespace/:name", h.SetConfigMapByName)
}
