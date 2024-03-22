package k8s

import (
	"context"

	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	metrics "k8s.io/metrics/pkg/client/clientset/versioned"
)

type PodInfo struct {
	Namespace string  `json:"namespace"`
	Name      string  `json:"name"`
	Restarts  int32   `json:"restarts"`
	CPU       float64 `json:"cpu"`
	Memory    float64 `json:"memory"`
	Status    string  `json:"status"`
}

func (k *KubeClient) GetAllPodsInfo(ctx context.Context) ([]PodInfo, error) {

	mc, err := metrics.NewForConfig(k.Config)
	if err != nil {
		k.Logger.Error("Metrics Client initiation failed", "error", err)
		return []PodInfo{}, err
	}

	allPods, err := k.Client.CoreV1().Pods("").List(ctx, v1.ListOptions{})
	if err != nil {
		k.Logger.Error("pods fetch failed", "error", err)
		return []PodInfo{}, err
	}

	var px []PodInfo
	pCh := make(chan PodInfo)
	for _, pod := range allPods.Items {

		go func() {
			var p PodInfo
			p.Namespace = pod.Namespace
			p.Name = pod.Name
			p.Restarts = pod.Status.ContainerStatuses[0].RestartCount

			podMetrics, err := mc.MetricsV1beta1().PodMetricses(p.Namespace).Get(ctx, p.Name, v1.GetOptions{})
			if err != nil {
				k.Logger.Error("could not get metrics data", "pod", pod.Name, "error", err)
			}

			var pmCpu, pmMem float64
			for _, pm := range podMetrics.Containers {
				pmCpu += pm.Usage.Cpu().AsApproximateFloat64()
				pmMem += pm.Usage.Memory().AsApproximateFloat64()
			}

			p.CPU = pmCpu
			p.Memory = pmMem
			p.Status = string(pod.Status.Phase)
			pCh <- p
		}()
		px = append(px, <-pCh)
	}

	return px, nil
}
