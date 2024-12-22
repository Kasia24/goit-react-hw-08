import { useSelector } from "react-redux";
import { Task } from "./Task";
import { selectVisibleTasks } from "../redux/selectors";
import { classed } from "@tw-classed/react";

export const TaskList = () => {
  const visibleTasks = useSelector(selectVisibleTasks);

  return (
    <List>
      {visibleTasks.map((task) => (
        <li key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </List>
  );
};

const List = classed.ul("py-4 flex flex-col gap-3");
