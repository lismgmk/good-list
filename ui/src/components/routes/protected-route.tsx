import React, { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";

interface IProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      Router.push("/login");
      return;
    }

    axios
      .post("http://localhost:5000/refresh-token", {
        refreshToken,
      })
      .then((res) => {
        setCookie("accessToken", res.data.accessToken, 7);
        setLoading(false);
      })
      .catch((err) => {
        localStorage.removeItem("refreshToken");
        Router.push("/login");
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
};

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()!.split(";").shift();
  }

  return null;
}

function setCookie(name: string, value: string, days: number): void {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/;`;
}

export default ProtectedRoute;
