package handlers

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) GetNodesInfo(c echo.Context) error {

	nodesInfo, err := h.KubeClient.GetNodesInfo(c.Request().Context())
	if err != nil {
		h.Logger.Error("error getting nodes list", "error", err)
		return c.JSON(http.StatusInternalServerError, Resp{
			Status: "error",
			Msg:    "List NodesInfo Failed",
			Error:  err,
			Data:   nodesInfo,
		})
	}
	c.JSON(http.StatusOK, Resp{
		Status: "success",
		Msg:    "List Nodes",
		Error:  nil,
		Data:   nodesInfo,
	})
	return nil
}
