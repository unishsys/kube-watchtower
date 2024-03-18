package handlers

import (
	"io"
	"net/http"

	"github.com/by-sabbir/kube-watchtower/k8s"
	"github.com/labstack/echo/v4"
)

func (h *Handler) CreateService(c echo.Context) error {

	var so k8s.ServiceOptions

	if err := c.Bind(&so); err != nil {
		h.Logger.Error("CreateService Handler", "error", err)
		body, _ := io.ReadAll(c.Request().Body)
		return c.JSON(http.StatusBadRequest, Resp{
			Status: "error",
			Msg:    "Service Creation Failed",
			Error:  err,
			Data:   string(body),
		})
	}

	createdSvc, err := h.KubeClient.CreateService(c.Request().Context(), &so)
	if err != nil {
		h.Logger.Error("CreateService Handler", "error", err)
		return c.JSON(http.StatusInternalServerError, Resp{
			Status: "error",
			Msg:    "Service Creation Failed",
			Error:  err,
			Data:   createdSvc,
		})
	}
	c.JSON(http.StatusAccepted, Resp{
		Status: "success",
		Msg:    "Service Created",
		Error:  nil,
		Data:   createdSvc,
	})
	return nil
}
