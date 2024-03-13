package handlers

import (
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) ListDeploymentsByNamespace(c echo.Context) error {
	ns := c.Param("namespace")
	if len(ns) == 0 {
		h.Logger.Error("namespace needed")
		return c.JSON(http.StatusBadRequest, "namespace required")
	}

	deploys, err := h.KubeClient.ListDeploymentsByNamespace(c.Request().Context(), ns)
	if err != nil {
		h.Logger.Error("error getting deployment list", "error", err)
		return c.JSON(http.StatusInternalServerError, Resp{
			Status: "error",
			Msg:    "List Deployments Failed",
			Error:  err,
			Data:   deploys,
		})
	}
	c.JSON(http.StatusOK, Resp{
		Status: "success",
		Msg:    "List Deployments",
		Error:  nil,
		Data:   deploys,
	})
	return nil
}

func (h *Handler) ScaleDeploymentsByName(c echo.Context) error {

	type Scale struct {
		Namespace      string `json:"namespace"`
		DeploymentName string `json:"name"`
		Replicas       int32  `json:"replicas"`
	}
	var s Scale
	if err := c.Bind(&s); err != nil {
		h.Logger.Error("error getting request body", "error", err)
		body, _ := io.ReadAll(c.Request().Body)
		return c.JSON(http.StatusBadRequest, Resp{
			Status: "error",
			Msg:    "Scale Deployment Failed",
			Error:  err,
			Data:   string(body),
		})
	}
	scaledDeployment, err := h.KubeClient.ScaleDeploymentsByName(c.Request().Context(), s.Namespace, s.DeploymentName, s.Replicas)
	if err != nil {
		h.Logger.Error("error getting deployment list", "error", err)
		return c.JSON(http.StatusInternalServerError, Resp{
			Status: "error",
			Msg:    "Scale Deployment Failed",
			Error:  err,
			Data:   s,
		})
	}
	c.JSON(http.StatusAccepted, Resp{
		Status: "success",
		Msg:    "Scale Deployment",
		Error:  nil,
		Data:   scaledDeployment,
	})
	return nil
}
