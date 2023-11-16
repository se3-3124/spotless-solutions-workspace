export type RegistrationSuccess = {
  success: boolean;
};

export type RegistrationFailure = {
  error: true;
  messages: string[];
};
