import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectIsLoading } from "../redux/slices/tasks";
import { TaskForm } from "../components/TaskForm";
import { StatusFilter } from "../components/StatusFilter";
import { TaskList } from "../components/TaskList";
import { fetchTasks } from "../redux/operations/tasks";
import { classed } from "@tw-classed/react";

export const TasksPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (error) return <p className="red">Error fetching tasks: {error}</p>;
  if (isLoading) return <p className="blue">Loading tasks...</p>;

  return (
    <Layout>
      <Title>Tasks</Title>

      <Section>
        <TaskForm />
        <StatusFilter />
      </Section>

      <TaskList />
    </Layout>
  );
};

const Layout = classed.main("p-2");

const Title = classed.h2("py-4 text-4xl bold");

const Section = classed.section("flex gap-4");
