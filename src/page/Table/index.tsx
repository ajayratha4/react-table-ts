import { Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import { GenericTableColumnType } from "GenericTable/types";
import GenericTable from "GenericTable";

const Table = () => {
  interface TableRows {
    id: number;
    name: string;
    name2: string;
    name3: string;
    name4: string;
    name5: string;
    name6: string;
    name7: string;
    name8: string;
  }

  const genericTableRows: TableRows[] = Array.from(Array(20)).map(
    (item, index) => ({
      id: index + 1,
      name: `Table cell ${index + 1}`,
      name2: `Table cell ${index + 1}`,
      name3: `Table cell ${index + 1}`,
      name4: `Table cell ${index + 1}`,
      name5: `Table cell ${index + 1}`,
      name6: `Table cell ${index + 1}`,
      name7: `Table cell ${index + 1}`,
      name8: `Table cell ${index + 1}`,
    })
  );
  const genericTableHeadCells: GenericTableColumnType<
    TableRows,
    keyof TableRows
  >[] = [
    {
      key: "id",
      label: "Header",
    },
    {
      key: "name",
      label: "Header",
    },
    {
      key: "name2",
      label: "Header",
    },
    {
      key: "name3",
      label: "Header",
      sorting: false,
    },
    {
      key: "name4",
      label: "Header",
    },
    {
      key: "name5",
      label: "Header",
      sorting: false,
    },
    {
      key: "name6",
      label: "Header",
    },
    {
      key: "name7",
      label: "Header",
    },
    {
      key: "name8",
      style: {
        width: 30,
        textAlign: "center",
      },
      sorting: false,
      label: "Action",
      component: () => {
        return (
          <IconButton sx={{ color: ({ palette }) => palette.text.secondary }}>
            <MoreVertIcon />
          </IconButton>
        );
      },
    },
  ];
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          height: 500,
        }}
      >
        <GenericTable
          rows={genericTableRows}
          headCells={genericTableHeadCells}
          sorting={true}
        />
      </Box>
    </Box>
  );
};

export default Table;
