export interface IUser {
  name: string;
  email: string;
  password: string;
  donation?: string;
  stripeAccountNumber?: string;
}
