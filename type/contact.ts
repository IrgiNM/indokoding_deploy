export type Contact = {
  id: string;
  name: string;
  email: string;
  massage: string;
  date?: {
    _seconds: number;
    _nanoseconds: number;
  };
};
