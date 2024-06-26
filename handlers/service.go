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

func (h *Handler) GetAllServicesByNs(c echo.Context) error {
	ns := c.Param("namespace")
	if len(ns) == 0 {
		h.Logger.Error("namespace and name needed")
		return c.JSON(http.StatusBadRequest, Resp{
			Status: "error",
			Msg:    "Namespace as Path Parameter is Required",
			Error:  nil,
			Data:   nil,
		})
	}

	services, err := h.KubeClient.GetAllServicesByNs(c.Request().Context(), ns)
	if err != nil {
		h.Logger.Error("GetAllServices", "error", err)
		return c.JSON(http.StatusInternalServerError, Resp{
			Status: "error",
			Msg:    "Fetching Services Failed",
			Error:  err,
			Data:   services,
		})
	}

	c.JSON(http.StatusOK, Resp{
		Status: "success",
		Msg:    "Successfully Fetched All Services",
		Error:  nil,
		Data:   services,
	})
	return nil
}

func (h *Handler) DeleteServiceByName(c echo.Context) error {
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

	err := h.KubeClient.DeleteServiceByName(c.Request().Context(), ns, name)
	if err != nil {
		h.Logger.Error("GetAllServices", "error", err)
		return c.JSON(http.StatusInternalServerError, Resp{
			Status: "error",
			Msg:    "Deleting Service Failed",
			Error:  err,
			Data:   nil,
		})
	}

	c.JSON(http.StatusNoContent, Resp{
		Status: "success",
		Msg:    "Successfully Deleted Service",
		Error:  nil,
		Data:   nil,
	})
	return nil
}
