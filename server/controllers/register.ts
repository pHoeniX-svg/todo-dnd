import bcrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';
import { UserModel } from '~server/models';
/**
 * @desc   Create A User
 * @route  POST /api/register
 * @access Public
 */
const registerUser = asyncHandler(async function (req, res) {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  if (!name || !email || !password) {
    res.status(400).json({ message: 'username, email and password required' });
  }
  const userExists = await UserModel.findOne({ email }).exec();

  if (userExists) {
    res.status(409).json({ message: 'this user already exists' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      res.status(400).json({ message: 'invalid data' });
    }

    res.status(201).json({ success: `new user ${user?.name} created!` });
  } catch (error) {
    let err = error as Error;
    res.status(500).json({ message: err.message });
  }
});

export { registerUser };
