import React from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import { Button, makeStyles, TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

interface ICreateUser {
  login: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const Registration: React.FC = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm<ICreateUser>();

  const onSubmit = async (data: ICreateUser) => {
    if (data.password !== data.repeatPassword) {
      console.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/registration",
        data
      );
      if (response.data.success) {
        console.log("Registration successful!");
      } else {
        console.log(`Registration failed: ${response.data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          label="Username"
          name="login"
          inputRef={register({ required: true })}
          error={!!errors.login}
          helperText={errors.login?.message}
        />
        <TextField
          label="Email"
          name="email"
          inputRef={register({ required: true })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          inputRef={register({ required: true })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Repeat Password"
          type="password"
          name="repeatPassword"
          inputRef={register({ required: true })}
          error={!!errors.repeatPassword}
          helperText={errors.repeatPassword?.message}
        />
      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className={classes.button}
      >
        Register
      </Button>
    </form>
  );
};

export default Registration;
