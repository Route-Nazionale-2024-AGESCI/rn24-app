import { getUser as APIgetUser } from "../dataManager/user";

export async function getUser() {
  let user;
  if (navigator.onLine) {
    user = await APIgetUser();
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    user = JSON.parse(localStorage.getItem("user"));
  }
  return user ?? {};
}
