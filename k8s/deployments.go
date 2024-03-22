package k8s

import (
	"context"
	"time"

	corev1 "k8s.io/api/core/v1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/labels"
	"sigs.k8s.io/yaml"
)

type DeploymentState struct {
	Name             string            `json:"name"`
	Replicas         int32             `json:"replicas"`
	AvailableRelicas int32             `json:"availableReplicas"`
	ReadyReplicas    int32             `json:"readyReplicas"`
	Status           string            `json:"status"`
	Labels           map[string]string `json:"labels"`
	CreatedAt        time.Time         `json:"createdAt"`
}

type PodDetails struct {
	Name   string                   `json:"name"`
	Status []corev1.ContainerStatus `json:"status"`
}

func (k *KubeClient) ListDeploymentsByNamespace(ctx context.Context, ns string) ([]DeploymentState, error) {
	deployClient := k.Client.AppsV1().Deployments(ns)
	deployments, err := deployClient.List(ctx, v1.ListOptions{})
	if err != nil {
		k.Logger.Error("could not fetch deployments list", "error", err)
		return []DeploymentState{}, err
	}

	var dList []DeploymentState
	for _, deployment := range deployments.Items {
		deploymentStatus := "success"
		if deployment.Status.Replicas != deployment.Status.ReadyReplicas {
			deploymentStatus = "warning"
		}
		if deployment.Status.ReadyReplicas == 0 {
			deploymentStatus = "error"
		}
		d := DeploymentState{
			Name:             deployment.Name,
			Replicas:         deployment.Status.Replicas,
			AvailableRelicas: deployment.Status.AvailableReplicas,
			ReadyReplicas:    deployment.Status.ReadyReplicas,
			CreatedAt:        deployment.CreationTimestamp.Time,
			Labels:           deployment.Labels,
			Status:           deploymentStatus,
		}
		dList = append(dList, d)
	}
	return dList, nil
}

func (k *KubeClient) ScaleDeploymentsByName(ctx context.Context, ns string, name string, replicas int32) (DeploymentState, error) {
	deployClient := k.Client.AppsV1().Deployments(ns)
	deployment, err := deployClient.Get(ctx, name, v1.GetOptions{})
	if err != nil {
		k.Logger.Error("could not fetch deployments list", "error", err)
		return DeploymentState{}, err
	}

	deployment.Spec.Replicas = &replicas
	updatedDeploy, err := deployClient.Update(ctx, deployment, v1.UpdateOptions{})
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

func (k *KubeClient) GetContainersInDeployment(ctx context.Context, ns string, name string) ([]PodDetails, error) {

	deployClient := k.Client.AppsV1().Deployments(ns)
	podClient := k.Client.CoreV1().Pods(ns)

	deployment, err := deployClient.Get(ctx, name, v1.GetOptions{})
	if err != nil {
		k.Logger.Info("fetch deploy failed", "error", err)
		return []PodDetails{}, err
	}
	labelSelector := v1.LabelSelector{MatchLabels: deployment.Labels}
	listOptions := v1.ListOptions{
		LabelSelector: labels.Set(labelSelector.MatchLabels).String(),
	}

	podList, err := podClient.List(ctx, listOptions)
	if err != nil {
		k.Logger.Info("fetch pods failed", "error", err)
		return []PodDetails{}, err
	}

	var podDetails []PodDetails
	for _, pod := range podList.Items {
		p := PodDetails{
			Name:   pod.Name,
			Status: pod.Status.ContainerStatuses,
		}
		podDetails = append(podDetails, p)
	}

	return podDetails, nil
}

func (k *KubeClient) GetDeploymentYaml(ctx context.Context, ns string, name string) (string, error) {

	deploy, err := k.Client.AppsV1().Deployments(ns).Get(ctx, name, v1.GetOptions{})
	if err != nil {
		k.Logger.Error("fetch deploy failed", "error", err)
		return "", err
	}

	deployBytes, err := yaml.Marshal(deploy.Spec)
	if err != nil {
		k.Logger.Error("marshaling deploy failed", "error", err)
		return "", err
	}

	return string(deployBytes), nil
}

func (k *KubeClient) UpdateDeploymentYaml(ctx context.Context, ns string, name string, updatedSpecYaml string) (string, error) {

	deployClient := k.Client.AppsV1().Deployments(ns)

	deploy, err := deployClient.Get(ctx, name, v1.GetOptions{})
	if err != nil {
		k.Logger.Info("fetch deploy failed", "error", err)
		return "", err
	}

	if err := yaml.Unmarshal([]byte(updatedSpecYaml), &deploy.Spec); err != nil {
		k.Logger.Error("unmarshaling deploy failed", "error", err)
		return "", err
	}

	updatedDeployment, err := deployClient.Update(ctx, deploy, v1.UpdateOptions{})
	if err != nil {
		k.Logger.Error("fetch updated deploy failed", "error", err)
		return "", err
	}

	deployBytes, err := yaml.Marshal(updatedDeployment.Spec)
	if err != nil {
		k.Logger.Error("marshaling deploy failed", "error", err)
		return "", err
	}

	return string(deployBytes), nil
}
