package overseer

import "context"

type Resource interface {
	Kind() string
}

type Process interface {
	// Execute runs the process
	Execute(context.Context, []Resource) ([]Resource, error)
}

type Task interface {
	Execute(context.Context, []Resource) ([]Resource, error)
}

type TaskEstimator interface {
	// EstimateTask estimates the time and confidence of a task
	EstimateTask(context.Context, Task) (int, float64, error)
}

type Project interface {
	Name() string
	Goal() string
	Resources() []Resource
}
