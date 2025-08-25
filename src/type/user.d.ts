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
}
