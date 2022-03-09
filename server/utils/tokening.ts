import jwt from 'jsonwebtoken';

const generateToken = (id: string, secret: string) => {
  return jwt.sign({ id }, secret, {
    expiresIn: '2d',
  });
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret);
};

export { generateToken, verifyToken };
