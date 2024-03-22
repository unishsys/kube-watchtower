package k8s

import (
	"context"
	"time"

	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	metrics "k8s.io/metrics/pkg/client/clientset/versioned"
)

type NodeCondition struct {
	Type          string    `json:"type"`
	Status        string    `json:"status"`
	Message       string    `json:"message"`
	LastHeartBeat time.Time `json:"lastBeat"`
}

type NodeInfo struct {
	NodeName       string          `json:"nodeName"`
	CpuQuantity    float64         `json:"cpuQuantity"`
	MemoryQuantity float64         `json:"memoryQuantity"`
	CpuUsage       float64         `json:"cpuUsage"`
	MemoryUsage    float64         `json:"memoryUsage"`
	PodQuantity    float64         `json:"podQuantity"`
	ContainerCount int             `json:"containerCount"`
	Conditions     []NodeCondition `json:"conditions"`
	Ready          bool            `json:"ready"`
}

func (k *KubeClient) GetNodesInfo(ctx context.Context) ([]NodeInfo, error) {
	mc, err := metrics.NewForConfig(k.Config)
	if err != nil {
		k.Logger.Error("Metrics Client initiation failed", "error", err)
		return []NodeInfo{}, err
	}

	nodeClient := k.Client.CoreV1().Nodes()
	nodeList, err := nodeClient.List(ctx, v1.ListOptions{})
	if err != nil {
		k.Logger.Error("Error listing nodes", "error", err)
		return []NodeInfo{}, nil
	}
	var nix []NodeInfo
	for _, node := range nodeList.Items {
		var ni NodeInfo
		ni.NodeName = node.Name
		ni.ContainerCount = len(node.Status.Images)
		capacity := node.Status.Capacity
		cpuQuantity := capacity.Cpu()
		cpuQ := cpuQuantity.AsApproximateFloat64()
		ni.CpuQuantity = cpuQ

		memQuantity := capacity.Memory()
		memQ := memQuantity.AsApproximateFloat64()

		ni.MemoryQuantity = memQ

		podQuantity := capacity.Pods()
		podsQ := podQuantity.AsApproximateFloat64()
		ni.PodQuantity = podsQ

		nodeMetrics, _ := mc.MetricsV1beta1().NodeMetricses().Get(ctx, ni.NodeName, v1.GetOptions{})
		nodeCpu := nodeMetrics.Usage.Cpu()
		nodeMem := nodeMetrics.Usage.Memory()

		ni.CpuUsage = nodeCpu.AsApproximateFloat64()
		ni.MemoryUsage = nodeMem.AsApproximateFloat64()

		conditions := node.Status.Conditions
		for _, condition := range conditions {
			var nc NodeCondition
			nc.Type = string(condition.Type)
			nc.Status = string(condition.Status)
			nc.Message = condition.Message
			nc.LastHeartBeat = condition.LastHeartbeatTime.Time
			ni.Ready = false
			if nc.Type == "Ready" {
				ni.Ready = true
			}
			ni.Conditions = append(ni.Conditions, nc)
		}

		nix = append(nix, ni)
	}

	return nix, nil
}
