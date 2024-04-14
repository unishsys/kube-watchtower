package k8s

func (k *KubeClient) GetCronJobs() {
	k.Client.BatchV1().Jobs("")
}
