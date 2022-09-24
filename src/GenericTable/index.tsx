import React, { useEffect, useState } from "react";
import { Table, TableContainer, TablePagination, Paper } from "@mui/material";

import GenericTableHead from "./GenericTableHead";
import GenericTableToolbar from "./GenericTableToolbar";
import GenericTableBody from "./GenericTableBody";
import { GenericTableColumnType, Order } from "./types";

export type RowType = {
  id: number;
};

type EnhancedTableProps<T extends RowType, K extends keyof T> = {
  rows: Array<T>;
  headCells: Array<GenericTableColumnType<T, K>>;
  showHeadCells?: boolean;
  onRowClick?: (arg: T) => void;
  showToolbar?: boolean;
  toolbarAction?: (arg: T[]) => void;
  showCheckbox?: boolean;
  toolbar?: JSX.Element;
  initialRowsPerPage?: number;
  rowsPerPageOptions?: number[];
  toolbarHeading?: string;
  serverSidePagination?: boolean;
  totalRows?: number;
  showPagination?: boolean;
  handleServerSidePagination?: (newPage: number, rowsPerPage: number) => void;
  sorting?: boolean;
  orderType?: Order;
  orderByColumn?: K;
};

const GenericTable = <T extends RowType, K extends keyof T>({
  rows,
  headCells,
  showHeadCells = true,
  onRowClick,
  toolbar,
  showToolbar = false,
  toolbarAction,
  showCheckbox = false,
  rowsPerPageOptions,
  initialRowsPerPage = 5,
  toolbarHeading,
  totalRows,
  showPagination = true,
  serverSidePagination = false,
  handleServerSidePagination,
  sorting = false,
  orderType = Order.ASC,
  orderByColumn = headCells && headCells[0].key,
}: EnhancedTableProps<T, K>): JSX.Element => {
  const [rowCells, setRowCells] = useState(rows || []);
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const [order, setOrder] = useState(orderType);
  const [orderBy, setOrderBy] = useState(orderByColumn);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    if (serverSidePagination && handleServerSidePagination) {
      handleServerSidePagination(newPage, rowsPerPage);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if (serverSidePagination && handleServerSidePagination) {
      handleServerSidePagination(0, parseInt(event.target.value, 10));
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rowCells.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectClick = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    if (selectedIndex === -1) {
      setSelected([...selected, id]);
    } else if (Number.isInteger(selectedIndex)) {
      const newArr = [...selected];
      newArr.splice(selectedIndex, 1);
      setSelected(newArr);
    }
  };

  const handleToolbarAction = () => {
    const selectedRows = rowCells.filter((row) =>
      selected.some((item) => item === row.id)
    );
    if (selectedRows && toolbarAction) {
      toolbarAction(selectedRows || []);
    }
  };

  const descendingComparator = (a: T, b: T, orderKey: K) => {
    if (b[orderKey] < a[orderKey]) {
      return -1;
    }
    if (b[orderKey] > a[orderKey]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (orderTypee: Order, orderKey: K) => {
    return orderTypee === Order.DESC
      ? (a: T, b: T) => descendingComparator(a, b, orderKey)
      : (a: T, b: T) => -descendingComparator(a, b, orderKey);
  };

  const handleRequestSort = (property: K) => {
    const isAsc = orderBy === property && order === Order.ASC;
    setOrder(isAsc ? Order.DESC : Order.ASC);
    setOrderBy(property);
  };

  useEffect(() => {
    let stableRows = rows?.slice().sort(getComparator(order, orderBy));

    if (!serverSidePagination) {
      stableRows = stableRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }
    setRowCells(stableRows);
  }, [order, orderBy, page, rows, rowsPerPage, serverSidePagination]);

  return (
    <Paper>
      {showToolbar && (
        <GenericTableToolbar
          numSelected={selected.length}
          heading={toolbarHeading}
          toolbar={toolbar}
          toolbarAction={handleToolbarAction}
        />
      )}
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size={"medium"}>
          {showHeadCells && (
            <GenericTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headCells={headCells}
              showCheckbox={showCheckbox}
              numSelected={selected.length}
              rowCount={rowCells.length}
              onSelectAllClick={handleSelectAllClick}
              sorting={sorting}
            />
          )}
          {rowCells.length > 0 && (
            <GenericTableBody
              rows={rowCells}
              headCells={headCells}
              onRowClick={onRowClick}
              showCheckbox={showCheckbox}
              selected={selected}
              handleSelectClick={handleSelectClick}
            />
          )}
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions || [5, 10, 25]}
          component="div"
          count={totalRows || rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default GenericTable;
