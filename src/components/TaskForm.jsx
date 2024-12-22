import { useDispatch } from "react-redux";
import { addTask } from "../redux/operations/tasks";
import { classed } from "@tw-classed/react";

export const TaskForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    dispatch(addTask(form.elements["text"].value));

    form.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" name="text" placeholder="Enter task text..." />
      <Button type="submit" className="hoverable">
        Add task
      </Button>
    </form>
  );
};

const Input = classed.input("p-2 bg-slate-100");

const Button = classed.button("py-2 px-4 bg-slate-200");
