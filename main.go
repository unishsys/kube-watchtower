package main

import (
	"log/slog"
	"os"

	"github.com/by-sabbir/kube-watchtower/cmd"
)

var (
	Version   = ""
	BuildTime = ""
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

	logger.Info("Build Info", "Version", Version, "BuildTime", BuildTime)
	cmd.Execute()
}
