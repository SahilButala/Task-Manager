import { IUser } from "../models/User_Model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
