'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import { api } from '@/services/api';
import type { Project, Task, TaskStatus } from '@/types';

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const client = useQueryClient();
  const { user } = useAuth();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['projects', id],
    queryFn: () => api<Project>(`/projects/${id}`),
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ['projects', id, 'tasks'],
    queryFn: () => api<Task[]>(`/projects/${id}/tasks`),
  });

  const createTask = useMutation({
    mutationFn: (title: string) =>
      api(`/projects/${id}/tasks`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          status: 'todo',
          priority: 'medium',
          assignee: user?._id ?? null,
        }),
      }),
    onSuccess: () => {
      setNewTaskTitle('');
      client.invalidateQueries({ queryKey: ['projects', id, 'tasks'] });
      client.invalidateQueries({ queryKey: ['my-tasks'] });
      client.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  const updateTaskStatus = useMutation({
    mutationFn: ({ taskId, status }: { taskId: string; status: TaskStatus }) =>
      api(`/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['projects', id, 'tasks'] });
      client.invalidateQueries({ queryKey: ['my-tasks'] });
      client.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });

  if (projectLoading) return <p className="text-sm text-slate-500">Loading project details...</p>;
  if (!project)
    return <p className="text-sm text-red-500">Project not found or you do not have access.</p>;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-primary">Project Details</p>
        <h1 className="mt-1 text-3xl font-semibold">{project.name}</h1>
        <p className="mt-2 text-slate-500">{project.description || 'No description provided.'}</p>
      </div>

      <Card className="p-5">
        <h2 className="mb-4 font-semibold">Create a new Task</h2>
        <form
          className="flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (newTaskTitle.trim()) createTask.mutate(newTaskTitle);
          }}
        >
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="What needs to be done?"
            disabled={createTask.isPending}
          />
          <Button type="submit" disabled={createTask.isPending || !newTaskTitle.trim()}>
            Add Task
          </Button>
        </form>
      </Card>

      <div className="space-y-4">
        <h2 className="font-semibold text-xl">Tasks</h2>
        {tasksLoading ? (
          <p className="text-sm text-slate-500">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-sm text-slate-500">No tasks yet.</p>
        ) : (
          <div className="grid gap-3">
            {tasks.map((task) => (
              <Card key={task._id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{task.title}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    {task.status.replace('_', ' ')} · {task.priority}
                  </p>
                </div>
                <div>
                  {task.status !== 'done' && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        updateTaskStatus.mutate({
                          taskId: task._id,
                          status: task.status === 'todo' ? 'in_progress' : 'done',
                        })
                      }
                      disabled={updateTaskStatus.isPending}
                    >
                      {task.status === 'todo' ? 'Start Task' : 'Complete'}
                    </Button>
                  )}
                  {task.status === 'done' && (
                    <span className="text-sm font-semibold text-green-600">Completed</span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
