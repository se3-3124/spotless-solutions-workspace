export default interface IServer {
  /**
   * Add a CORS policy to a specific host.
   * @param host Hostname
   */
  addCorsOrigin(host: string): void;

  /**
   * Run the webserver.
   */
  run(): void;
}
