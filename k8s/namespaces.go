package k8s

import (
	"context"

	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// TODO: map options from api
type NSListOpts struct {
}

func (k *KubeClient) GetNamespaces(ctx context.Context) ([]string, error) {
	core := k.Client.CoreV1()
	ns := core.Namespaces()

	nx, err := ns.List(ctx, v1.ListOptions{
		Watch: false,
	})

	if err != nil {
		return []string{}, err
	}

	var items []string
	for _, n := range nx.Items {
		items = append(items, n.Name)
	}
	return items, nil
}
