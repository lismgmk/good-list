import { Box } from "@mui/material";
import React from "react";

const sxRoot = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "50px",
  // backgroundColor: theme.palette.primary.main,
  // color: theme.palette.common.white,
};
interface Props {
  text: string;
}

const Footer: React.FC<Props> = ({ text }) => {
  return (
    <Box sx={sxRoot}>
      <p>{text}</p>
    </Box>
  );
};

export default Footer;
