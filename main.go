package main

import (
	"log"
	"log/slog"
	"os"

	"github.com/by-sabbir/config-mapper/handlers"
	"github.com/by-sabbir/config-mapper/k8s"
)

func main() {
	if err := run(); err != nil {
		log.Fatalf("could not start server: %+v", err)
	}

}

func run() error {

	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	kClient := k8s.NewOutClusterKube(logger)
	srv := handlers.NewHandler(kClient)
	// srv.Logger.Info("server initializing", "host", srv.Server.Addr)

	return srv.Server.ListenAndServe()
}
