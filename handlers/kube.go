package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/labstack/echo/v4"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/yaml"
)

type ConfigMap struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty" protobuf:"bytes,1,opt,name=metadata"`

	Immutable *bool `json:"immutable,omitempty" protobuf:"varint,4,opt,name=immutable"`

	Data map[string]string `json:"data,omitempty" protobuf:"bytes,2,rep,name=data"`

	BinaryData map[string][]byte `json:"binaryData,omitempty" protobuf:"bytes,3,rep,name=binaryData"`
}

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
	c.Logger().Info("========================", nx)

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

	var data map[string]string

	err := json.NewDecoder(c.Request().Body).Decode(&data)
	if err != nil {
		c.Logger().Error("could not marshal json", "err", err)
	}

	return h.KubeClient.SetConfigMapByName(c.Request().Context(), ns, name, data)

}
