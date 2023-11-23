export type ServiceAccountInformation = {
  /**
   * User ID.
   */
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  /**
   * User email. Some providers won't give email.
   */
  email?: string | null;
};
