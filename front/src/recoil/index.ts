import { atom } from "recoil";
import { IUser } from "@/types";

export const userState = atom<IUser>({
  key: "userState",
  default: {
    uuid: "",
    name: "",
  },
});
