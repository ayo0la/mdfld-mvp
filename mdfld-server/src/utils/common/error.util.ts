class CustomError extends Error {
  statusCode: number;
  metaData: unknown;
  constructor(statusCode: number, message: string, metaData?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.metaData = metaData;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
export default CustomError;
