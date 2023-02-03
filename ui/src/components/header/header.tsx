import React from "react";
import { Button, makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>My App</h1>
      <div>
        <Button variant="contained" color="secondary">
          Admin
        </Button>
        <Button variant="contained" color="secondary">
          User
        </Button>
      </div>
    </div>
  );
};

export default Header;
