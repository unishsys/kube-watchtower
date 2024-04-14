package k8s

import (
	"context"

	corev1 "k8s.io/api/core/v1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/labels"
	"k8s.io/client-go/rest"
)

func (k *KubeClient) GetDeploymentLogs(ctx context.Context, ns string, name string) ([]*rest.Request, error) {
	k.Logger.Info("tailing logs", "ns", ns, "name", name)

	var lines int64 = 20
	var since int64 = 24 * 3600
	deployClient := k.Client.AppsV1().Deployments(ns)

	targetDeployment, err := deployClient.Get(ctx, name, v1.GetOptions{})
	if err != nil {
		k.Logger.Error("could not fetch deployment", "error", err, "name", name, "ns", ns)
	}

	labelSelector := v1.LabelSelector{MatchLabels: targetDeployment.Labels}
	listOptions := v1.ListOptions{
		LabelSelector: labels.Set(labelSelector.MatchLabels).String(),
	}

	pods, err := k.Client.CoreV1().Pods(ns).List(ctx, listOptions)
	if err != nil {
		k.Logger.Error("could not get pods for selected label", "labels", labelSelector, "ns", ns)

		return []*rest.Request{}, err
	}

	var lr []*rest.Request
	for _, pod := range pods.Items {
		logsReq := k.Client.CoreV1().Pods(ns).GetLogs(pod.Name, &corev1.PodLogOptions{
			TailLines:                    &lines,
			InsecureSkipTLSVerifyBackend: true,
			Follow:                       true,
			SinceSeconds:                 &since,
		})

		lr = append(lr, logsReq)

	}
	return lr, err
}

func (k *KubeClient) GetPodLogs(ctx context.Context, ns string, name string) *rest.Request {
	k.Logger.Info("tailing logs", "ns", ns, "pod_name", name)

	var lines int64 = 20
	var since int64 = 24 * 3600

	logsReq := k.Client.CoreV1().Pods(ns).GetLogs(name, &corev1.PodLogOptions{
		TailLines:                    &lines,
		InsecureSkipTLSVerifyBackend: true,
		Follow:                       true,
		SinceSeconds:                 &since,
	})

	return logsReq
}
