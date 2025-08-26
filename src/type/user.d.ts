import { USER_ROLE, USER_SEX, USER_STATUS } from "@/constant/user";

export interface UserQueryType {
  name?: string;
  status?: string;
  current?: number;
  pageSize?: number;
}

export interface UserType {
  name: string;
  status: "on" | "off";
  _id?: string;
  nickName: string;
  sex:USER_SEX;
  role:USER_ROLE;
  status:USER_STATUS;
}
