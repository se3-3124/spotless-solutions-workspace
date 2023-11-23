export type RegistrationSuccess = {
  success: boolean;
};

export type AuthenticationFailure = {
  error: true;
  messages: string[];
};
