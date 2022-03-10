import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '~server/models';

/**
 * @desc   Get Refresh Token
 * @route  GET /api/refresh
 * @access Private
 */
const getRefreshToken: RequestHandler = async (req, res) => {
  const cookies = req.cookies as { jwt?: string };
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const user = await UserModel.findOne({ refreshToken }).exec();
  if (!user) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN!, (err, decoded) => {
    const payload = decoded as { email?: string };

    if (err || user.email !== payload.email) {
      return res.sendStatus(403);
    }

    const roles = user.roles;

    const accessToken = jwt.sign(
      {
        email: user.email,
        roles: roles,
      },
      process.env.JWT_ACCESS_TOKEN!,
      { expiresIn: '120s' }
    );

    res.json({ name: user.name, roles, accessToken });
  });
};

export { getRefreshToken };
