import type { RequestHandler } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface IDecodedPayload {
  _id: string;
  lat: number;
  exp: number;
}

type Decoded = IDecodedPayload | string | JwtPayload;

const checkAuth: RequestHandler = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if (token) {
    try {
      const decoded: Decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);

      req.body.userId =
        typeof decoded === 'object' && '_id' in decoded ? decoded._id : req.body.userId;

      next();
    } catch (err) {
      return res.status(401).json({
        message: 'No access',
      });
    }
  } else {
    return res.status(401).json({
      message: 'No access',
    });
  }
};

export default checkAuth;
