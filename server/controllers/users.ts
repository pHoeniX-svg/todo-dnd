import { RequestHandler } from 'express';
import { UserModel } from '~server/models';

/**
 * @desc   Get All Users
 * @route  GET /api/users
 * @access Private
 */
const getUsers: RequestHandler = async (_req, res) => {
  const users = await (
    await UserModel.find()
  ).map((user) => {
    const { name, email, _id } = user;
    return {
      _id,
      name,
      email,
    };
  });
  if (!users) return res.status(204).json({ message: 'no users found' });
  res.status(200).json(users);
};

/**
 * @desc   Get Single User
 * @route  GET /api/users/:id
 * @access Private
 */
const getUser: RequestHandler = async (req, res) => {
  const request = req as unknown as Request & {
    params: { id: string };
  };

  if (!request?.params?.id) {
    return res.status(400).json({ message: 'a user id is required' });
  }

  const user = await UserModel.findOne({
    _id: request.params.id,
  }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `no user matches the id ${request.params.id}.` });
  }

  const { name, email, _id, roles } = user;

  res.status(200).json({ _id, name, email });
};

/**
 * @desc   Delete A User
 * @route  DELETE /api/users/:id
 * @access Private
 */
const deleteUser: RequestHandler = async (req, res) => {
  const request = req as unknown as Request & {
    body: { id: string };
  };

  if (!request?.body?.id) {
    return res.status(400).json({ message: 'a user id is required' });
  }

  const user = await UserModel.findOne({
    _id: request.body.id,
  }).exec();

  if (!user) {
    return res
      .status(204)
      .json({ message: `no user matches the id ${request.body.id}.` });
  }

  const result = await UserModel.deleteOne({ _id: request.body.id });
  res.status(204).json(result);
};
export { getUsers, getUser, deleteUser };
