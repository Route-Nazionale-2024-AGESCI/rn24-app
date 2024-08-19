import { getUser as APIgetUser } from "../dataManager/user";
import useSWR from "swr";

export function useUser() {
  const { data, error, mutate } = useSWR("profile/", APIgetUser);

  // TODO: manage errors
  error !== undefined && console.error(error);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
    return { user: data, mutate };
  }
  return { user: JSON.parse(localStorage.getItem("user")) ?? {}, mutate: null };
}

export async function getUser() {
  let user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    user = await APIgetUser();
    localStorage.setItem("user", JSON.stringify(user));
  }
  return user;
}
