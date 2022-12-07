export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  donation?: string;
  stripeAccountNumber?: string;
}
