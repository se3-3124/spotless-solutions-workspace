export type MailConfig = {
  /**
   * The address of the user receiving the mail
   */
  to: string;
  subject: string;
  html: string;
};

export default interface IMailer {
  /**
   * Send email
   * @param {MailConfig} config Email configuration
   */
  sendMail(config: MailConfig): Promise<boolean>;
}
