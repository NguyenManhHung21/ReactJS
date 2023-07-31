import { NextFunction, Request, Response } from 'express';
import { IUser, User } from '../models/userModel';
import bcrypt from 'bcrypt';

type userLogin = Omit<IUser, 'password'>;

export const register = async (
  req: Request<
    {},
    {},
    {
      username: string;
      email: string;
      password: string;
    }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, username, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) return res.json({ msg: 'Username already used', status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck) return res.json({ msg: 'Email already used', status: false });

    const passwordHashed = await bcrypt.hash(password, 10);

    const user: Partial<IUser> = await User.create({
      email,
      username,
      password: passwordHashed,
    });
    // delete user.password;
    const userWithoutPassword = {
      id: user._id,
      username: user.username,
      email: user.email,
      isAvatarImageSet: user.isAvatarImageSet,
      avatarImage: user.avatarImage,
    };
    return res.json({ status: true, user: userWithoutPassword });
  } catch (error) {}
};

export const login = async (
  req: Request<{}, {}, { username: string; password: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;

    const user: IUser | null = await User.findOne({ username });
    if (user && user.password) {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck)
        return res.json({ msg: 'Username or Password is not correct!', status: false });
      else {
        const userWithoutPassword = {
          id: user._id,
          username: user.username,
          email: user.email,
          isAvatarImageSet: user.isAvatarImageSet,
          avatarImage: user.avatarImage,
        };
        return res.json({ user: userWithoutPassword, status: true });
      }
    } else {
      return res.json({ msg: 'Username or Password is not correct!', status: false });
    }
  } catch (error) {
    next(error);
  }
};

export const setAvatar = async (
  req: Request<{ id: string }, {}, { avatarImage: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const { avatarImage } = req.body;
  try {
    const userUpdated: IUser | null = await User.findByIdAndUpdate(
      id,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      // { returnDocument: 'after' },
      { new: true },
    );

    if (userUpdated) {
      const userWithoutPassword = {
        id: userUpdated._id,
        username: userUpdated.username,
        email: userUpdated.email,
        isAvatarImageSet: userUpdated.isAvatarImageSet,
        avatarImage: userUpdated.avatarImage,
      };
      return res.json({
        msg: 'Updated avatar successfully!',
        userUpdated: userWithoutPassword,
        status: true,
      });
    }
  } catch (error) {
    next(error);
  }
};

// $nin: ['id1', 'id2', 'id3'] ~ ngoại trừ nhiều
// $ne : 'id1' ~ ngoại trừ 1
export const getAllUsers = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  try {
    const allUsersExceptLogin = await User.find({ _id: { $ne: id } }).select({
      username: 1,
      email: 1,
      avatarImage: 1,
    });

    res.json(allUsersExceptLogin);
  } catch (error) {
    next(error);
  }
};
