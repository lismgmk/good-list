import { Button, Box } from "@mui/material";
import React from "react";

const sxRoot = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // padding: theme.spacing(2),
  // backgroundColor: theme.palette.primary.main,
  // color: theme.palette.primary.contrastText,
};
const Header: React.FC = () => {
  return (
    <Box sx={sxRoot}>
      <h1>My App</h1>
      <div>
        <Button variant="contained" color="secondary">
          Admin
        </Button>
        <Button variant="contained" color="secondary">
          User
        </Button>
      </div>
    </Box>
  );
};

export default Header;
