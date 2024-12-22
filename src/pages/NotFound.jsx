import { classed } from "@tw-classed/react";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <Container>
      <Title>Not found</Title>
      <Highlight to="/">Go home</Highlight>
    </Container>
  );
};

const Container = classed.article("py-32 text-center flex flex-col gap-4");

const Title = classed.h2(" text-4xl bold ");

const Highlight = classed(Link, "hoverable", "bold underline text-blue-800");
