import React, { FC } from "react";
import { Sort } from "../Sort/Sort";
import { Filter } from "../Filter/Filter";
import { Search } from "../Search/Search";
import { TFilterState, TSortState } from "../../App";
import { TOnFilter, TOnSearch, TOnSort } from "../../types/handlers";

type TFiltersProps = {
  sort: TSortState;
  filters: TFilterState;
  search: string;
  onSort: TOnSort;
  onFilter: TOnFilter;
  onSearch: TOnSearch;
};

export const Filters: FC<TFiltersProps> = ({
  sort,
  filters,
  search,
  onSort,
  onFilter,
  onSearch,
}) => {
  return (
    <div>
      <Sort value={sort} onChange={onSort} />
      <Filter values={filters} onChange={onFilter} />
      <Search value={search} onChange={onSearch} />
    </div>
  );
};
