package k8s

import (
	"context"

	corev1 "k8s.io/api/core/v1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/intstr"
)

type ServiceOptions struct {
	Name          string            `json:"name"`
	Namespace     string            `json:"namespace"`
	Labels        map[string]string `json:"labels"`
	ContainerPort int               `json:"containerPort"`
	ServicePort   int               `json:"servicePort"`
	Protocol      string            `json:"protocol"`
	Selector      map[string]string `json:"selector"`
	Type          string            `json:"type"`
}

func (k *KubeClient) CreateService(ctx context.Context, svc *ServiceOptions) (*corev1.Service, error) {

	svcClient := k.Client.CoreV1().Services(svc.Namespace)

	svcOptions := &corev1.Service{
		ObjectMeta: v1.ObjectMeta{
			Name:      svc.Name,
			Namespace: svc.Namespace,
			Labels:    svc.Labels,
		},
		Spec: corev1.ServiceSpec{
			Ports: []corev1.ServicePort{
				{
					Port:       int32(svc.ServicePort),
					TargetPort: intstr.FromInt(svc.ContainerPort),
					Protocol:   corev1.Protocol(svc.Protocol), // TODO: find a better way to validate protocol
				},
			},
			Selector: svc.Selector,
			Type:     corev1.ServiceType(svc.Type), // TODO: find a better way to validate service type
		},
	}

	createdService, err := svcClient.Create(ctx, svcOptions, v1.CreateOptions{})
	if err != nil {
		k.Logger.Error("CreateService Service", "error", err)
		return &corev1.Service{}, err
	}

	return createdService, nil
}
