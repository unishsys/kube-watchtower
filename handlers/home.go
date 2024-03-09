package handlers

import (
	"github.com/by-sabbir/config-mapper/views"
	"github.com/labstack/echo/v4"
)

func (h *Handler) IndexView(c echo.Context) error {

	cmp := views.Base()
	c.Response().Header().Set(echo.HeaderContentType, echo.MIMETextHTML)
	return cmp.Render(c.Request().Context(), c.Response().Writer)
}
