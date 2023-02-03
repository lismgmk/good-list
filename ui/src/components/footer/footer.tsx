import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

interface Props {
  text: string;
}

const Footer: React.FC<Props> = ({ text }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>{text}</p>
    </div>
  );
};

export default Footer;
