package k8s

import (
	"context"

	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func (k *KubeClient) GetConfigMaps(ctx context.Context, ns string) ([]string, error) {

	iCm := k.Client.CoreV1().ConfigMaps(ns)

	cmList, err := iCm.List(ctx, v1.ListOptions{Watch: false})
	if err != nil {
		k.Logger.ErrorContext(ctx, "could not fetch cm list", "error", err)
		return []string{}, err
	}

	cmx := []string{}
	for _, cm := range cmList.Items {
		cmx = append(cmx, cm.Name)
	}
	k.Logger.InfoContext(ctx, "cm list fetch successful", "namespace", ns)
	return cmx, nil
}

func (k *KubeClient) GetConfigMapByName(ctx context.Context, ns string, name string) (map[string]string, error) {

	iCm := k.Client.CoreV1().ConfigMaps(ns)

	cm, err := iCm.Get(ctx, name, v1.GetOptions{})
	if err != nil {
		k.Logger.ErrorContext(ctx, "could not fetch cm list", "error", err)
		return map[string]string{}, err
	}

	k.Logger.InfoContext(ctx, "cm fetch successful", "namespace", ns, "name", name)

	return cm.Data, nil
}

func (k *KubeClient) SetConfigMapByName(ctx context.Context, ns string, name string, data map[string]string) error {

	iCm := k.Client.CoreV1().ConfigMaps(ns)

	cm, err := iCm.Get(ctx, name, v1.GetOptions{})

	k.Logger.Info("updating cm", "cm", cm)
	if err != nil {
		k.Logger.ErrorContext(ctx, "could not fetch cm list", "error", err)
		return err
	}

	k.Logger.InfoContext(ctx, "cm fetch successful", "namespace", ns, "name", name)
	cm.Data = data

	updatedCm, err := k.Client.CoreV1().ConfigMaps(ns).Update(ctx, cm, v1.UpdateOptions{})
	if err != nil {
		k.Logger.Error("error updating cm", "error", err)
		return err
	}

	k.Logger.Info("cm updated", "cm", updatedCm.Name)
	return nil
}
