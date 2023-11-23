export default interface IIpAddressLockout {
  /**
   * Increment attempt
   * @param ipAddress
   */
  increment(ipAddress: string): Promise<void>;

  /**
   * Checks if address is blocked
   * @param ipAddress
   */
  isBlocked(ipAddress: string): Promise<boolean>;
}
