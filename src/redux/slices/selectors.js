import { createSelector } from "@reduxjs/toolkit";
import { selectTasks } from "./slices/tasks";
import { selectFilterStatus } from "./slices/filter";
import { STATUS_FILTERS } from "../constants/filter";

export const selectVisibleTasks = createSelector(
  [selectTasks, selectFilterStatus],
  (tasks, statusFilter) => {
    console.log("running selectVisibleTasks");

    switch (statusFilter) {
      case STATUS_FILTERS.ACTIVE: {
        return tasks.filter((task) => !task.completed);
      }
      case STATUS_FILTERS.COMPLETED: {
        return tasks.filter((task) => task.completed);
      }
      case STATUS_FILTERS.ALL:
      default: {
        return tasks;
      }
    }
  }
);

export const selectTaskCount = createSelector([selectTasks], (tasks) => {
  console.log("running selectTaskCount");

  return tasks.reduce(
    (acc, task) => {
      const key = task.completed ? "completed" : "active";
      acc[key] += 1;
      return acc;
    },
    { active: 0, completed: 0 }
  );
});
