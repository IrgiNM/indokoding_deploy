export type User = {
  id: string;
  username: string;
  email?: string;
  password: string;
  confirm_password?: string;
  createdAt: string;
  role?: string;
  total_join?: number;
  total_career?: number;
  total_contact?: number;
  captcha: string;
  update?: boolean;
}


// export type User = {
//   id: string;
//   username: string;
//   email?: string;
//   password: string;
//   confirm_password?: string;
//   level?: string;
//   position?: string;
//   fired?: string;
//   phone?: string;
//   sick?: number;
//   createdAt: string;
//   permission?: number;
//   not_reason?: number;
//   role_job?: string[];
//   role?: string;
//   total_join?: number;
//   total_career?: number;
//   total_contact?: number;
//   captcha: string;
// }
