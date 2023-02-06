import axios, { HeadersDefaults } from "axios";

type LoginData = {
  email: string;
  password: string;
};

export const postUserData = async (data: LoginData) => {
  const res = await axios.post("user/login", data).then((res) => {
    return {
      // Change the path of reading the values from response as per your backend reponse
      auth_token: res.data.data["X-Auth-Token"],
      refresh_token: res.data.data["X-Refresh-Token"],
    };
  });

  return res;
};
