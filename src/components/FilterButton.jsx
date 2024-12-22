import { classed } from "@tw-classed/react";

export const FilterButton = ({ selected, children, ...props }) => {
  const className = selected ? "hoverable green" : "hoverable";

  return (
    <Button className={[className, props.className].join(" ")} {...props}>
      {children}
    </Button>
  );
};

const Button = classed.button("py-2 px-4 bg-slate-200");
