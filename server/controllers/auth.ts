import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '~server/models';

/**
 * @desc   Authenticate A User
 * @route  POST /api/auth
 * @access Public
 */
const handleLogin: RequestHandler = async (req, res) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };
  if (!email || !password)
    return res
      .status(400)
      .json({ message: 'email and password are required.' });

  const user = await UserModel.findOne({ email }).exec();
  if (!user) {
    return res.sendStatus(401);
  }

  const match = await bcrypt.compare(password, user.password);
  if (match) {
    const roles = user?.roles?.filter(Boolean);

    const accessToken = jwt.sign(
      {
        email: user.email,
        roles: roles,
      },
      process.env.JWT_ACCESS_TOKEN!,
      { expiresIn: '120s' }
    );

    const refreshToken = jwt.sign(
      { email: user.email },
      process.env.JWT_REFRESH_TOKEN!,
      { expiresIn: '1d' }
    );

    user.refreshToken = refreshToken;

    const result = await user.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      // secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ name: user.name, roles, accessToken });
  } else {
    res.sendStatus(401);
  }
};

export { handleLogin };
