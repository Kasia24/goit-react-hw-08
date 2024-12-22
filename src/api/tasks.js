import { client, fakeClient } from "./http-client";

const initialTasks = [
  { id: 0, text: "Learn HTML and CSS", completed: true },
  { id: 1, text: "Get good at JavaScript", completed: true },
  { id: 2, text: "Master React", completed: false },
  { id: 3, text: "Discover Redux", completed: false },
  { id: 4, text: "Build amazing apps", completed: false },
];

const FakeTasksApi = {
  getAllTasks: async () => fakeClient.request(initialTasks),
  addTask: async (text) => {
    await fakeClient.request(text);

    const newTask = { id: Date.now(), text, completed: false };
    initialTasks.push(newTask);

    return newTask;
  },
  deleteTask: async (taskId) => {
    await fakeClient.request(taskId);

    const index = initialTasks.findIndex((task) => task.id === taskId);
    if (index !== -1) {
      initialTasks.splice(index, 1);
    }

    return taskId;
  },
  toggleTask: async (task) => {
    await fakeClient.request(task);

    const updatedTask = { ...task, completed: !task.completed };
    const index = initialTasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      initialTasks[index] = updatedTask;
    }

    return updatedTask;
  },
};

const usingFake = true;

export const TasksApi = usingFake
  ? FakeTasksApi
  : {
      getAllTasks: async () => {
        const res = await client.get(`/tasks`);
        return res.data;
      },
      addTask: async (text) => {
        const res = await client.post(`/tasks`, { text });
        return res.data;
      },
      deleteTask: async (taskId) => {
        const res = await client.delete(`/tasks/${taskId}`);
        return res.data;
      },
      toggleTask: async (task) => {
        const res = await client.put(`/tasks/${task.id}`, { ...task });
        return res.data;
      },
    };
