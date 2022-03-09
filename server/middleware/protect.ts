import { Request, RequestHandler } from 'express';
import { IUser } from '~server/types';
import { verifyToken } from '~server/utils';

const protect: RequestHandler = (req: unknown, res, next) => {
  const request = req as Request & IUser;

  const authHeader =
    request.headers.authorization || (request.headers.Authorization as string);

  if (!authHeader?.startsWith('Bearer')) {
    return res.sendStatus(401);
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token, process.env.JWT_ACCESS_TOKEN!) as IUser;
    request.name = decoded.name;
    request.roles = decoded.roles;
    next();
  } catch (error) {
    const e = error as Error;
    console.error(e.name, e.message);
    return res.sendStatus(403);
  }
};

export { protect };
