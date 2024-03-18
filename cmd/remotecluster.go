package cmd

import (
	"log"
	"log/slog"
	"os"

	"github.com/by-sabbir/kube-watchtower/handlers"
	"github.com/by-sabbir/kube-watchtower/k8s"
	"github.com/spf13/cobra"
)

// remoteclusterCmd represents the remotecluster command
var remoteclusterCmd = &cobra.Command{
	Use:   "remotecluster",
	Short: "Configure the CM editor in local or remote cluster, kube config file is required",
	Run: func(cmd *cobra.Command, args []string) {
		if err := runRemoteCluster(); err != nil {
			log.Fatal("could not execute remote cluster config: ", err)
		}
	},
}

func init() {
	rootCmd.AddCommand(remoteclusterCmd)
}

func runRemoteCluster() error {
	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	kClient := k8s.NewOutClusterKube(logger)
	srv := handlers.NewHandler(kClient)

	return srv.Start()
}
