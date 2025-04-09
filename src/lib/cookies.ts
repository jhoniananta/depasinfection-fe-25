import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getToken = (): string => cookies.get("@depas25ugm");

export const setToken = (token: string) => {
  cookies.set("@depas25ugm", token, { path: "/" });
};

export const removeToken = () => cookies.remove("@depas25ugm", { path: "/" });
