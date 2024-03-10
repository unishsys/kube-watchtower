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
		return err
	}

	return c.JSON(http.StatusOK, nx)
}

func (h *Handler) GetCmByNamespace(c echo.Context) error {

	ns := c.Param("namespace")
	if len(ns) == 0 {
		h.Logger.Error("namespace needed")
		return c.JSON(http.StatusBadRequest, "namespace required")
	}
	nx, err := h.KubeClient.GetConfigMaps(c.Request().Context(), ns)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, nx)
}

func (h *Handler) GetCmByName(c echo.Context) error {

	ns := c.Param("namespace")
	name := c.Param("name")
	if len(ns) == 0 && len(name) == 0 {
		h.Logger.Error("namespace and name needed")
		return c.JSON(http.StatusBadRequest, "namespace and name required")
	}

	nx, err := h.KubeClient.GetConfigMapByName(c.Request().Context(), ns, name)
	if err != nil {
		h.Logger.Error("error getting cm", "error", err)
		return c.JSON(http.StatusInternalServerError, err)
	}

	bytes, err := json.Marshal(nx)
	if err != nil {
		h.Logger.Error("error", "error", err)
		return c.JSON(http.StatusInternalServerError, err)
	}

	bts, err := yaml.JSONToYAML(bytes)
	if err != nil {
		h.Logger.Error("error", "error", err)
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, string(bts))
}

func (h *Handler) SetConfigMapByName(c echo.Context) error {
	ns := c.Param("namespace")
	name := c.Param("name")
	if len(ns) == 0 && len(name) == 0 {
		h.Logger.Error("namespace and name needed")
		return c.JSON(http.StatusBadRequest, "namespace and name required")
	}

	reqBytes, err := io.ReadAll(c.Request().Body)
	if err != nil {
		h.Logger.Info("could not read req body", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"status": "error",
			"msg":    "ConfigMap Failed to Updated",
			"error":  err.Error(),
		})
	}

	jsonData, err := yaml.YAMLToJSON(reqBytes)
	if err != nil {
		h.Logger.Info("could not umarshal json", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"status": "error",
			"msg":    "ConfigMap Failed to Updated",
			"error":  err.Error(),
		})
	}

	var data map[string]string
	if err := json.Unmarshal(jsonData, &data); err != nil {
		h.Logger.Error("could not unmarshal jsondata", "error", err, "jsondata", jsonData)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"status": "error",
			"msg":    "ConfigMap Failed to Updated",
			"error":  err.Error(),
		})
	}

	if err := h.KubeClient.SetConfigMapByName(c.Request().Context(), ns, name, data); err != nil {
		h.Logger.Error("could not update cm", "error", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"status": "error",
			"msg":    "ConfigMap Failed to Updated",
			"error":  err.Error(),
		})
	}
	return c.JSON(http.StatusCreated, map[string]string{
		"status": "success",
		"msg":    "ConfigMap Updated",
	})
}
