import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getToken = (): string => cookies.get("@depas25ugm");

export const setToken = (token: string) => {
  cookies.set("@depas25ugm", token, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    httpOnly: false,
  });
};

export const removeToken = () => cookies.remove("@depas25ugm", { path: "/" });
