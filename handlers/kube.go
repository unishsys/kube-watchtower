package handlers

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/labstack/echo/v4"
	gyaml "gopkg.in/yaml.v3"
	"sigs.k8s.io/yaml"
)

type DataHolder struct {
	Data string `json:"data"`
}

func (h *Handler) ApplyCM(c echo.Context) error {

	var cm DataHolder

	if err := c.Bind(&cm); err != nil {
		c.Logger().Error("error reading request body", "error", err)
		return err
	}

	c.Logger().Info(cm.Data)

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
		c.Logger().Error("namespace needed")
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
		c.Logger().Error("namespace and name needed")
		return c.JSON(http.StatusBadRequest, "namespace and name required")
	}
	nx, err := h.KubeClient.GetConfigMapByName(c.Request().Context(), ns, name)

	c.Logger().Info("error", "error", err)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	if err != nil {
		c.Logger().Error("error", "error", err)
		return c.JSON(http.StatusInternalServerError, err)
	}

	bytes, err := json.Marshal(nx)
	if err != nil {
		c.Logger().Error("error", "error", err)
		return c.JSON(http.StatusInternalServerError, err)
	}

	bts, err := yaml.JSONToYAML(bytes)
	if err != nil {
		c.Logger().Error("error", "error", err)
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, string(bts))
}

func (h *Handler) SetConfigMapByName(c echo.Context) error {
	ns := c.Param("namespace")
	name := c.Param("name")
	if len(ns) == 0 && len(name) == 0 {
		c.Logger().Error("namespace and name needed")
		return c.JSON(http.StatusBadRequest, "namespace and name required")
	}

	reqBytes, err := io.ReadAll(c.Request().Body)
	if err != nil {
		c.Logger().Info("could not read req body", "error", err)
		return c.JSON(http.StatusInternalServerError, err)
	}

	var ydata string
	if err := gyaml.Unmarshal(reqBytes, &ydata); err != nil {
		c.Logger().Info("could not umarshal yaml", "error", err)
		return c.JSON(http.StatusInternalServerError, err)
	}

	jsonData, err := yaml.YAMLToJSON([]byte(ydata))
	if err != nil {
		c.Logger().Info("could not umarshal json", "error", err)
		return c.JSON(http.StatusInternalServerError, err)
	}

	var data map[string]string
	json.Unmarshal(jsonData, &data)

	if err := h.KubeClient.SetConfigMapByName(c.Request().Context(), ns, name, data); err != nil {
		c.Logger().Error("could not update cm", "error", err)
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusCreated, data)
}
