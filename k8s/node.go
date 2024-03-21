package k8s

import (
	"context"
	"time"

	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

type NodeCondition struct {
	Type          string
	Status        string
	Message       string
	LastHeartBeat time.Time
}

type NodeInfo struct {
	NodeName       string
	CpuQuantity    int64
	MemoryQuantity int64
	PodQuantity    int64
	ContainerCount int
	Conditions     []NodeCondition
}

func (k *KubeClient) GetNodesInfo(ctx context.Context) ([]NodeInfo, error) {

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
		cpuInt, _ := cpuQuantity.AsInt64()
		ni.CpuQuantity = cpuInt

		memQuantity := capacity.Memory()
		memInt, _ := memQuantity.AsInt64()
		memGi := memInt / (1024 * 1024 * 1024)

		ni.MemoryQuantity = memGi

		podQuantity := capacity.Pods()
		podsInt, _ := podQuantity.AsInt64()
		ni.PodQuantity = podsInt

		conditions := node.Status.Conditions
		for _, condition := range conditions {
			var nc NodeCondition
			nc.Type = string(condition.Type)
			nc.Status = string(condition.Status)
			nc.Message = condition.Message
			nc.LastHeartBeat = condition.LastHeartbeatTime.Time

			ni.Conditions = append(ni.Conditions, nc)
		}

		nix = append(nix, ni)
	}

	return nix, nil
}
