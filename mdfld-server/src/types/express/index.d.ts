// Custom Request type : to include name and email
export {};
declare global {
  namespace Express {
    export interface Request {
      email?: string;
    }
  }
}
