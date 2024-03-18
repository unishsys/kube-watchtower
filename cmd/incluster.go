package cmd

import (
	"log"
	"log/slog"
	"os"

	"github.com/by-sabbir/kube-watchtower/handlers"
	"github.com/by-sabbir/kube-watchtower/k8s"
	"github.com/spf13/cobra"
)

// inclusterCmd represents the incluster command
var inclusterCmd = &cobra.Command{
	Use:   "incluster",
	Short: "Configure the CM editor in-cluster run as a pod",
	Run: func(cmd *cobra.Command, args []string) {
		if err := runInCluster(); err != nil {
			log.Fatal("could not execute remote cluster config: ", err)
		}
	},
}

func init() {
	rootCmd.AddCommand(inclusterCmd)
}

func runInCluster() error {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	kClient := k8s.NewInClusterKube(logger)
	srv := handlers.NewHandler(kClient)

	return srv.Start()
}
