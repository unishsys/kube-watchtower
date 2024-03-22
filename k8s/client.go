package k8s

import (
	"flag"
	"log/slog"
	"path/filepath"

	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	"k8s.io/client-go/util/homedir"
	//
	// Uncomment to load all auth plugins
	// _ "k8s.io/client-go/plugin/pkg/client/auth"
	//
	// Or uncomment to load specific auth plugins
	// _ "k8s.io/client-go/plugin/pkg/client/auth/azure"
	// _ "k8s.io/client-go/plugin/pkg/client/auth/gcp"
	// _ "k8s.io/client-go/plugin/pkg/client/auth/oidc"
)

type KubeClient struct {
	Client *kubernetes.Clientset
	Logger *slog.Logger
	Config *rest.Config
}

func NewInClusterKube(logger *slog.Logger) *KubeClient {
	// creates the in-cluster config
	config, err := rest.InClusterConfig()
	if err != nil {
		logger.Error("error getting incluster config", "error", err)
	}
	// creates the clientset
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		logger.Error("error getting incluster clientset", "error", err)
	}

	logger.Info("in-cluster clientset initialized")
	return &KubeClient{
		Client: clientset,
		Logger: logger,
		Config: config,
	}
}

func NewOutClusterKube(logger *slog.Logger) *KubeClient {
	var kubeconfig *string
	if home := homedir.HomeDir(); home != "" {
		kubeconfig = flag.String("kubeconfig", filepath.Join(home, ".kube", "config"), "(optional) absolute path to the kubeconfig file")
	} else {
		kubeconfig = flag.String("kubeconfig", "/app/config", "/app/config")
	}
	flag.Parse()

	// use the current context in kubeconfig
	config, err := clientcmd.BuildConfigFromFlags("", *kubeconfig)
	if err != nil {
		logger.Error("error getting out fo cluster config", "error", err)
	}

	// create the clientset
	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		logger.Error("error getting out fo cluster clientset", "error", err)
	}
	logger.Info("remote cluster clientset initialized")
	return &KubeClient{
		Client: clientset,
		Logger: logger,
		Config: config,
	}
}
