export type UserRegistrationData = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  tos: boolean;
};

export const UserRegistrationDataSchema = {
  firstName: 'required',
  lastName: 'required',
  email: 'required|email',
  password: 'required|password_complexity',
  phoneNumber: 'required|phone_number',
  tos: 'required|accepted',
};
