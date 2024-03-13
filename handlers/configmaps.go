package handlers

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
	"sigs.k8s.io/yaml"
)

type DataHolder struct {
	Data string `json:"data"`
}

func (h *Handler) ApplyCM(c echo.Context) error {

	var cm DataHolder

	if err := c.Bind(&cm); err != nil {
		h.Logger.Error("error reading request body", "error", err)
		return err
	}

	h.Logger.Info(cm.Data)

	return nil
}

func (h *Handler) GetNamespaces(c echo.Context) error {

	nx, err := h.KubeClient.GetNamespaces(c.Request().Context())
	if err != nil {
		h.Logger.Error("could fetch namespaces", "error", err)
		return c.JSON(http.StatusForbidden, Resp{
			Status: "error",
			Msg:    "Failed to Fetch Namespace",
			Error:  err,
			Data:   nx,
		})
	}

	return c.JSON(http.StatusOK, Resp{
		Status: "success",
		Msg:    "Fetched Namespace Successfully",
		Error:  err,
		Data:   nx,
	})
}

func (h *Handler) GetCmByNamespace(c echo.Context) error {

	ns := c.Param("namespace")
	if len(ns) == 0 {
		h.Logger.Error("namespace needed")
		return c.JSON(http.StatusBadRequest, Resp{
			Status: "error",
			Msg:    "Namespace as Path Parameter is Required",
			Error:  nil,
			Data:   nil,
		})
	}
	nx, err := h.KubeClient.GetConfigMaps(c.Request().Context(), ns)
	if err != nil {
		h.Logger.Error("could fetch namespaces", "error", err)
		return c.JSON(http.StatusForbidden, Resp{
			Status: "error",
			Msg:    "Failed to Fetch Namespace",
			Error:  err,
			Data:   nx,
		})
	}

	return c.JSON(http.StatusOK, Resp{
		Status: "success",
		Msg:    "Fetched Namespace Successfully",
		Error:  err,
		Data:   nx,
	})
}

func (h *Handler) GetCmByName(c echo.Context) error {

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

	nx, err := h.KubeClient.GetConfigMapByName(c.Request().Context(), ns, name)
	if err != nil {
		h.Logger.Error("error getting cm", "error", err)
		return c.JSON(http.StatusForbidden, Resp{
			Status: "error",
			Msg:    "Failed to Fetch ConfigMap",
			Error:  err,
			Data:   nx,
		})
	}

	bytes, err := json.Marshal(nx)
	if err != nil {
		h.Logger.Error("error", "error", err)
		return c.JSON(http.StatusForbidden, Resp{
			Status: "error",
			Msg:    "Failed to Fetch ConfigMap",
			Error:  err,
			Data:   nil,
		})
	}

	bts, err := yaml.JSONToYAML(bytes)
	if err != nil {
		h.Logger.Error("error", "error", err)
		return c.JSON(http.StatusForbidden, Resp{
			Status: "error",
			Msg:    "Failed to Fetch ConfigMap",
			Error:  err,
			Data:   nx,
		})
	}

	return c.JSON(http.StatusOK, Resp{
		Status: "success",
		Msg:    "Fetched ConfigMap Successfully",
		Error:  err,
		Data:   string(bts),
	})
}

func (h *Handler) SetConfigMapByName(c echo.Context) error {
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

	reqBytes, err := io.ReadAll(c.Request().Body)
	if err != nil {
		h.Logger.Info("could not read req body", "error", err)
		return c.JSON(http.StatusBadRequest, Resp{
			Status: "error",
			Msg:    "Could not marshal request body into json",
			Error:  err,
			Data:   nil,
		})
	}

	jsonData, err := yaml.YAMLToJSON(reqBytes)
	if err != nil {
		h.Logger.Info("could not marshall yaml to json", "error", err)
		return c.JSON(http.StatusForbidden, Resp{
			Status: "error",
			Msg:    "Could not marshall yaml to json",
			Error:  err,
			Data:   nil,
		})
	}

	var data map[string]string
	if err := json.Unmarshal(jsonData, &data); err != nil {
		h.Logger.Error("could not unmarshal jsondata", "error", err, "jsondata", jsonData)
		return c.JSON(http.StatusForbidden, Resp{
			Status: "error",
			Msg:    "Could not unmarshall json",
			Error:  err,
			Data:   nil,
		})
	}

	if err := h.KubeClient.SetConfigMapByName(c.Request().Context(), ns, name, data); err != nil {
		h.Logger.Error("could not update cm", "error", err)
		return c.JSON(http.StatusForbidden, Resp{
			Status: "error",
			Msg:    "Failed to set configmap",
			Error:  err,
			Data:   nil,
		})
	}
	return c.JSON(http.StatusCreated, Resp{
		Status: "sucess",
		Msg:    "ConfigMap Updated",
		Error:  nil,
		Data:   nil,
	})
}
