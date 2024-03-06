package main

import (
	"log"

	"github.com/by-sabbir/config-mapper/handlers"
)

func main() {
	if err := run(); err != nil {
		log.Fatalf("could not start server: %+v", err)
	}

}

func run() error {

	srv := handlers.NewHandler()
	// srv.Logger.Info("server initializing", "host", srv.Server.Addr)

	return srv.Server.ListenAndServe()
}
