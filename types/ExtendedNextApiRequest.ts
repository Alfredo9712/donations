import { NextApiRequest } from "next";

export interface ExtendedNextApiRequest extends NextApiRequest {
  id: string;
}
