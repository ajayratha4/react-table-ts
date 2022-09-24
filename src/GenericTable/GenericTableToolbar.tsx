import React from "react";
import { alpha, Box, IconButton, Tooltip, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type GenericTableToolbarProps = {
  toolbar?: JSX.Element;
  heading?: string;
  numSelected: number;
  toolbarAction?: () => void;
};

const GenericTableToolbar = ({
  toolbar,
  heading,
  numSelected,
  toolbarAction,
}: GenericTableToolbarProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: ({ palette }) =>
          alpha(palette.primary.main, palette.action.activatedOpacity),
        px: 1.5,
        alignItems: "center",
        minHeight: 64,
        width: 1,
      }}
    >
      {numSelected > 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: 1,
            alignItems: "center",
          }}
        >
          <Typography color="inherit">{numSelected} selected</Typography>
          <Tooltip title="Action">
            <IconButton onClick={toolbarAction}>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Box sx={{ width: 1 }}>
          {toolbar ? toolbar : <Typography>{heading}</Typography>}
        </Box>
      )}
    </Box>
  );
};

export default GenericTableToolbar;
