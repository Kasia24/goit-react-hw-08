import { useDispatch } from "react-redux";
import { deleteTask, toggleCompleted } from "../redux/operations/tasks";
import { classed } from "@tw-classed/react";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteTask(task.id));

  const handleToggle = () => dispatch(toggleCompleted(task));

  const className = task.completed
    ? "hoverable red striked"
    : "hoverable green";

  return (
    <Bar className="row" style={{ justifyContent: "flex-start" }}>
      <input
        className="hoverable"
        style={{ width: "25px", height: "25px" }}
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />

      <Row>
        <p className={className}>{task.text}</p>

        <Button className="hoverable" type="button" onClick={handleDelete}>
          Delete
        </Button>
      </Row>
    </Bar>
  );
};

const Bar = classed.div("p-2 bg-indigo-200");

const Row = classed.div(
  "pl-3 pr-6 w-full flex items-center justify-between gap-4"
);

const Button = classed.button("py-2 px-4 bg-red-500 text-white");
