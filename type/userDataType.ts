export type UserData = {
    update: boolean;
    id?: string;
    username: string;
    email: string;
    password?: string;
    confirm_password?: string;
    role: string;
  }