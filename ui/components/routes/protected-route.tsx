import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";
import { useRouter } from "next/router";
import { NextPageContext } from "next";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

const HendlerIntercepter = async () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const accessToken = getCookie(
    router.query as unknown as NextPageContext,
    "accessToken"
  );
  const refreshToken = localStorage.getItem("refreshToken");

  if (!accessToken || !refreshToken) {
    Router.push("/user/login");
    return;
  }

  const newTokens = await axios
    .post("http://localhost:5000/refresh-token", {
      refreshToken,
    })
    .then((res) => {
      // setCookie("accessToken", res.data.accessToken, 7);
      setLoading(false);
    })
    .catch((err) => {
      localStorage.removeItem("refreshToken");
      Router.push("/login");
    });

  if (loading) {
    return <p>Loading...</p>;
  }
};
// interface IProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const accessToken = getCookie(
//       router.query as unknown as NextPageContext,
//       "accessToken"
//     );
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (!accessToken || !refreshToken) {
//       Router.push("/user/login");
//       return;
//     }

//     axios
//       .post("http://localhost:5000/refresh-token", {
//         refreshToken,
//       })
//       .then((res) => {
//         // setCookie("accessToken", res.data.accessToken, 7);
//         setLoading(false);
//       })
//       .catch((err) => {
//         localStorage.removeItem("refreshToken");
//         Router.push("/login");
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return <>{children}</>;
// };

export const getCookie = (ctx: NextPageContext | undefined, name: string) => {
  if (!ctx || !ctx.req) return undefined;
  const value = ctx.req.headers.cookie
    ?.split(";")
    .find((c) => c.trim().startsWith(`${name}=`));
  if (!value) return undefined;
  return value.split("=")[1];
};

function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/;`;
}

export default ProtectedRoute;
