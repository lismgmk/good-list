import React from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

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
  const { register, handleSubmit, errors } = useForm<ILoginFormData>();

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
      <input
        name="login"
        ref={register({
          required: true,
          minLength: 5,
          maxLength: 7,
        })}
        placeholder="Login"
      />
      {errors.login && (
        <p>Login is required and must be between 5 and 7 characters long.</p>
      )}

      <input
        type="password"
        name="password"
        ref={register({
          required: true,
          minLength: 5,
          maxLength: 7,
        })}
        placeholder="Password"
      />
      {errors.password && (
        <p>Password is required and must be between 5 and 7 characters long.</p>
      )}

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
