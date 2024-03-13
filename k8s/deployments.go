package k8s

import (
	"context"
	"time"

	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

type DeploymentState struct {
	Name             string
	Replicas         int32
	AvailableRelicas int32
	ReadyReplicas    int32
	CreatedAt        time.Time
}

func (k *KubeClient) ListDeploymentsByNamespace(ctx context.Context, ns string) ([]DeploymentState, error) {
	deployments, err := k.Client.AppsV1().Deployments(ns).List(ctx, v1.ListOptions{})
	if err != nil {
		k.Logger.Error("could not fetch deployments list", "error", err)
		return []DeploymentState{}, err
	}

	var dList []DeploymentState
	for _, deployment := range deployments.Items {
		d := DeploymentState{
			Name:             deployment.Name,
			Replicas:         deployment.Status.Replicas,
			AvailableRelicas: deployment.Status.AvailableReplicas,
			ReadyReplicas:    deployment.Status.ReadyReplicas,
			CreatedAt:        deployment.CreationTimestamp.Time,
		}
		dList = append(dList, d)

	}
	return dList, nil
}

func (k *KubeClient) ScaleDeploymentsByName(ctx context.Context, ns string, name string, replicas int32) (DeploymentState, error) {

	deployment, err := k.Client.AppsV1().Deployments(ns).Get(ctx, name, v1.GetOptions{})
	if err != nil {
		k.Logger.Error("could not fetch deployments list", "error", err)
		return DeploymentState{}, err
	}

	deployment.Spec.Replicas = &replicas
	updatedDeploy, err := k.Client.AppsV1().Deployments(ns).Update(ctx, deployment, v1.UpdateOptions{})
	if err != nil {
		k.Logger.Error("could not update deployment list", "error", err, "name", name)
		return DeploymentState{}, err
	}
	return DeploymentState{
		Name:             updatedDeploy.Name,
		Replicas:         *deployment.Spec.Replicas,
		AvailableRelicas: deployment.Status.AvailableReplicas,
		ReadyReplicas:    deployment.Status.ReadyReplicas,
		CreatedAt:        time.Now(),
	}, nil
}
