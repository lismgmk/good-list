import React from "react";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import { Button, makeStyles, TextField, Box } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
//   button: {
//     margin: theme.spacing(1),
//   },
// }));

interface ICreateUser {
  login: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const Registration: React.FC = () => {
  // const { register, handleSubmit, errors } = useForm<ICreateUser>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateUser>();
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={(props) => (
          <TextField
            label="Login"
            name="login"
            error={!!errors.login}
            helperText={errors.login?.message}
            // onChange={props.onChange}
            // defaultValue={props.value}
          />
        )}
        name="login"
        control={control}
        defaultValue=""
        rules={{ required: true }}
      />
      <Controller
        render={(props) => (
          <TextField
            label="Email"
            name="email"
            error={!!errors.email}
            helperText={errors.email?.message}
            // onChange={props.onChange}
            // defaultValue={props.value}
          />
        )}
        name="email"
        control={control}
        defaultValue=""
        rules={{ required: true }}
      />
      <Controller
        render={(props) => {
          return (
            <Box>
              <TextField
                variant="outlined"
                name="password"
                type="password"
                label="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Box>
          );
        }}
        control={control}
        name="password"
      />
      <Controller
        render={(props) => (
          <TextField
            label="Repeat Password"
            type="password"
            name="repeatPassword"
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
          />
        )}
        name="repeatPassword"
        control={control}
        defaultValue=""
        rules={{ required: true }}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Registration;
