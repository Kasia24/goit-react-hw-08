import { useDispatch, useSelector } from "react-redux";
import { FilterButton } from "./FilterButton";
import { selectFilterStatus, setStatusFilter } from "../redux/slices/filter";
import { STATUS_FILTERS } from "../constants/filter";
import { classed } from "@tw-classed/react";

import { selectTaskCount } from "../redux/selectors";

export const StatusFilter = () => {
  const { active, completed } = useSelector(selectTaskCount);
  const filter = useSelector(selectFilterStatus);
  const dispatch = useDispatch();

  const handleFilterChange = (filter) => dispatch(setStatusFilter(filter));

  const { ALL, ACTIVE, COMPLETED } = STATUS_FILTERS;

  return (
    <Container>
      <FilterButton
        selected={filter === ALL}
        onClick={() => handleFilterChange(ALL)}
      >
        All
      </FilterButton>

      <FilterButton
        selected={filter === ACTIVE}
        onClick={() => handleFilterChange(ACTIVE)}
      >
        Active ({active})
      </FilterButton>

      <FilterButton
        selected={filter === COMPLETED}
        onClick={() => handleFilterChange(COMPLETED)}
      >
        Completed ({completed})
      </FilterButton>
    </Container>
  );
};

const Container = classed.div("flex gap-3");
