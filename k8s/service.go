package k8s

import (
	"context"
	"strconv"
	"strings"

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

type ServiceInfo struct {
	Name       string  `json:"name"`
	Type       string  `json:"type"`
	ClusterIp  string  `json:"clusterIp"`
	ExternalIp string  `json:"externalIp"`
	Ports      string  `json:"ports"`
	CreatedAt  v1.Time `json:"createdAt"`
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

func (k *KubeClient) GetAllServicesByNs(ctx context.Context, ns string) ([]ServiceInfo, error) {
	svcClient := k.Client.CoreV1().Services(ns)

	svcList, err := svcClient.List(ctx, v1.ListOptions{})
	if err != nil {
		k.Logger.Error("List Services Failed", "error", err)
		return []ServiceInfo{}, err
	}

	var sx []ServiceInfo
	for _, svc := range svcList.Items {
		port := strconv.Itoa(int(svc.Spec.Ports[0].Port)) + " -> " + strconv.Itoa(int(svc.Spec.Ports[0].NodePort))
		ing := svc.Status.LoadBalancer.Ingress
		ingressIp := " "
		for _, i := range ing {
			ingressIp += i.IP
		}
		var s ServiceInfo
		s.Name = svc.Name
		s.Type = string(svc.Spec.Type)
		s.ClusterIp = svc.Spec.ClusterIP
		s.ExternalIp = strings.TrimSpace(ingressIp)
		s.Ports = port
		s.CreatedAt = svc.CreationTimestamp

		sx = append(sx, s)
	}

	return sx, nil
}

func (k *KubeClient) DeleteServiceByName(ctx context.Context, ns string, name string) error {

	svcClient := k.Client.CoreV1().Services(ns)

	err := svcClient.Delete(ctx, name, v1.DeleteOptions{})
	if err != nil {
		k.Logger.Error("Service Deletion Failed", "error", err)
		return err
	}
	return nil
}
