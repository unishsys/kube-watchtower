package handlers

import (
	"context"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/by-sabbir/config-mapper/k8s"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Handler struct {
	Router     *echo.Echo
	Server     *http.Server
	KubeClient *k8s.KubeClient
}

func NewHandler() *Handler {

	e := echo.New()
	l := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	h := &Handler{}
	server := &http.Server{
		Addr:         ":8080",
		ReadTimeout:  30 * time.Second,
		Handler:      e.Server.Handler,
		WriteTimeout: 30 * time.Second,
	}

	h.KubeClient = k8s.NewOutClusterKube(l)

	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogStatus:   true,
		LogURI:      true,
		LogError:    true,
		HandleError: true, // forwards error to the global error handler, so it can decide appropriate status code
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			if v.Error == nil {
				l.LogAttrs(context.Background(), slog.LevelInfo, "REQUEST",
					slog.String("uri", v.URI),
					slog.Int("status", v.Status),
				)
			} else {
				l.LogAttrs(context.Background(), slog.LevelError, "REQUEST_ERROR",
					slog.String("uri", v.URI),
					slog.Int("status", v.Status),
					slog.String("err", v.Error.Error()),
				)
			}
			return nil
		},
	}))
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
	h.Router.GET("/", h.IndexView)

	rg := h.Router.Group("/api/v1")
	rg.POST("/apply", h.ApplyCM)
	rg.GET("/get-namespaces", h.GetNamespaces)
	rg.GET("/cm/:namespace", h.GetCmByNamespace)
	rg.GET("/cm/:namespace/:name", h.GetCmByName)
	rg.POST("/cm/:namespace/:name", h.SetConfigMapByName)
}
