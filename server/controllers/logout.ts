import { RequestHandler } from 'express';
import { UserModel } from '~server/models';

/**
 * @desc   Sign Out A User
 * @route  GET /api/logout
 * @access Private
 */
const handleLogout: RequestHandler = async (req, res) => {
  const cookies = req.cookies as { jwt?: string };
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const user = await UserModel.findOne({ refreshToken }).exec();

  if (!user) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      // secure: true,
    });
    return res.sendStatus(204);
  }
  user.refreshToken = '';

  const result = await user.save();
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: 'none',
    // secure: true,
  });

  res.sendStatus(204);
};

export { handleLogout };
