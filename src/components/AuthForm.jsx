import { classed } from "@tw-classed/react";

export const AuthForm = ({ label, onSubmit, disabled = false }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(event);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        <Input type="email" name="email" placeholder="Email" />
      </Label>

      <Label>
        <Input type="password" name="password" placeholder="Password" />
      </Label>

      <Button type="submit" className="hoverable" disabled={disabled}>
        {label}
      </Button>
    </Form>
  );
};

const Form = classed.form("p-4 max-w-72");

const Label = classed.label("block mb-2 text-sm font-medium text-gray-700");

const Input = classed.input("w-full p-2 bg-slate-100");

const Button = classed.button("w-full py-2 px-4 bg-slate-200 bold");
