import React from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface ILoginFormData {
  login: string;
  password: string;
}

const Login: React.FC = () => {
  const router = useRouter();
  // const { register, handleSubmit, errors } = useForm<ILoginFormData>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormData>();

  const onSubmit = async (data: ILoginFormData) => {
    try {
      const response: AxiosResponse<ILoginResponse> =
        await axios.post<ILoginResponse>("http://localhost:5000/login", data);
      document.cookie = `accessToken=${response.data.accessToken}`;
      localStorage.setItem("refreshToken", response.data.refreshToken);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={(props) => (
          <input
            name="login"
            placeholder="Login"
            // onChange={props.onChange}
            // value={props.value}
          />
        )}
        name="login"
        control={control}
        defaultValue=""
        rules={{
          required: true,
          minLength: 5,
          maxLength: 7,
        }}
      />
      {errors.login && (
        <p>Login is required and must be between 5 and 7 characters long.</p>
      )}

      <Controller
        render={(props) => (
          <input
            type="password"
            name="password"
            placeholder="Password"
            // onChange={props.onChange}
            // value={props.value}
          />
        )}
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: true,
          minLength: 5,
          maxLength: 7,
        }}
      />
      {errors.password && (
        <p>Password is required and must be between 5 and 7 characters long.</p>
      )}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
