import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import React from "react";

import { GenericTableColumnType, Order } from "./types";

type GenericTableHeadProps<T, K extends keyof T> = {
  headCells: Array<GenericTableColumnType<T, K>>;
  showCheckbox: boolean;
  numSelected: number;
  rowCount: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: K;
  onRequestSort: (property: K) => void;
  sorting: boolean;
};

const GenericTableHead = <T, K extends keyof T>({
  headCells,
  showCheckbox,
  numSelected,
  rowCount,
  onSelectAllClick,
  order,
  orderBy,
  onRequestSort,
  sorting,
}: GenericTableHeadProps<T, K>): JSX.Element => {
  const createSortHandler = (property: K) => () => {
    onRequestSort(property);
  };
  return (
    <TableHead>
      <TableRow>
        {showCheckbox && (
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        )}
        {headCells.map((headCell, index) => {
          const { sorting: cellSorting = true, key } = headCell;
          return (
            <TableCell
              sortDirection={orderBy === key ? order : false}
              sx={{
                ...headCell?.style,
              }}
              key={index}
            >
              {sorting && cellSorting ? (
                <TableSortLabel
                  active={orderBy === key}
                  direction={orderBy === key ? order : Order.ASC}
                  onClick={createSortHandler(key)}
                >
                  <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                    {headCell.label}
                  </Typography>
                </TableSortLabel>
              ) : (
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {headCell.label}
                </Typography>
              )}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default GenericTableHead;
