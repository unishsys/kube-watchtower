package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) GetAllPodsInfo(c echo.Context) error {

	pods, err := h.KubeClient.GetAllPodsInfo(c.Request().Context())
	if err != nil {
		h.Logger.Error("error getting pods list", "error", err)
		return c.JSON(http.StatusInternalServerError, Resp{
			Status: "error",
			Msg:    "List PodsInfo Failed",
			Error:  err,
			Data:   pods,
		})
	}
	c.JSON(http.StatusOK, Resp{
		Status: "success",
		Msg:    "List Pods",
		Error:  nil,
		Data:   pods,
	})

	return nil
}
