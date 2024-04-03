package handlers

import (
	"fmt"
	"io"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"
)

var (
	upgrader = websocket.Upgrader{}
)

func (h *Handler) GetDeploymentLogs(c echo.Context) error {

	ns := c.Param("namespace")
	name := c.Param("name")
	if len(ns) == 0 && len(name) == 0 {
		h.Logger.Error("namespace and name needed")
		return c.JSON(http.StatusBadRequest, Resp{
			Status: "error",
			Msg:    "Namespace as Path Parameter is Required",
			Error:  nil,
			Data:   nil,
		})
	}

	reqs, err := h.KubeClient.GetDeploymentLogs(c.Request().Context(), ns, name)
	if err != nil {
		h.Logger.Error("error getting logs", "error", err, "ns", ns, "deployment", name)
		return c.JSON(http.StatusInternalServerError, Resp{
			Status: "error",
			Msg:    "Tailing logs failed",
			Error:  err,
			Data:   nil,
		})
	}

	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()
	h.Logger.Info("ws upgraded", "conn", ws.LocalAddr().String())

	for _, r := range reqs {
		body, err := r.Stream(c.Request().Context())
		if err != nil {
			h.Logger.Warn("error request parsing", "error", err, "deploy", name, "ns", ns)
		}
		defer body.Close()
		for {
			buf := make([]byte, 2048)
			numBytes, err := body.Read(buf)
			if numBytes == 0 {
				continue
			}
			if err == io.EOF {
				break
			}
			if err != nil {
				fmt.Println("error", err)
			}
			err = ws.WriteMessage(websocket.TextMessage, buf[:numBytes])
			if err != nil {
				h.Logger.Error("could not write msg to ws", "error", err, "ns", ns, "name", name)
			}
		}
	}

	return nil
}