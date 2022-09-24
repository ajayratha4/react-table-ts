import {
  Box,
  Checkbox,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

import { RowType } from ".";
import { GenericTableColumnType } from "./types";

type GenericTableBodyProps<T extends RowType, K extends keyof T> = {
  rows: Array<T>;
  headCells: Array<GenericTableColumnType<T, K>>;

  onRowClick?: (arg: T) => void;
  showCheckbox: boolean;
  selected: number[];
  handleSelectClick: (row: number) => void;
};

const GenericTableBody = <T extends RowType, K extends keyof T>({
  rows,
  headCells,
  onRowClick,
  showCheckbox,
  selected,
  handleSelectClick,
}: GenericTableBodyProps<T, K>): JSX.Element => {
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    } else if (showCheckbox && handleSelectClick) {
      handleSelectClick(row.id);
    }
  };

  return (
    <TableBody>
      {rows.map((row, index) => {
        const isItemSelected = isSelected(row.id);
        return (
          <TableRow
            onClick={() => handleRowClick(row)}
            selected={isItemSelected}
            sx={{ cursor: showCheckbox || onRowClick ? "pointer" : "default" }}
            hover
            key={index}
          >
            {showCheckbox && (
              <TableCell
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectClick(row.id);
                }}
                padding="checkbox"
              >
                <Checkbox color="primary" checked={isItemSelected} />
              </TableCell>
            )}

            {headCells.map((item, i) => {
              return (
                <TableCell
                  sx={{
                    ...item.style,
                  }}
                  key={i}
                >
                  {item?.component ? (
                    <Box onClick={(e) => e.stopPropagation()}>
                      {item.component(row)}
                    </Box>
                  ) : (
                    <Typography>
                      <>{row[item.key]}</>
                    </Typography>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default GenericTableBody;
