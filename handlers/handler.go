package handlers

import (
	"io"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
)

type Handler struct {
	Router *echo.Echo
	Logger *slog.Logger
	Server *http.Server
}

func NewHandler() *Handler {

	e := echo.New()
	l := slog.New(slog.NewJSONHandler(io.MultiWriter(os.Stderr, os.Stdin), nil))
	h := &Handler{
		Logger: l,
	}
	server := &http.Server{
		Addr:         ":8080",
		ReadTimeout:  30 * time.Second,
		Handler:      e.Server.Handler,
		WriteTimeout: 30 * time.Second,
	}

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
}
