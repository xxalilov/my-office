import { User } from "../models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { asyncHandler } from "../middlewares/async";
import { BadRequestError } from "../errors/bad-request-error";
import { NotFoundError } from "../errors/not-found-error";
import { Password } from "../services/password";
import { UnauthorizedError } from "../errors/unauthorized-error";

/**
 * @desc  Signup user
 * @route POST /api/v1/auth/signup
 * @access  Public
 */
export const signup = asyncHandler(async (req: Request, res: Response) => {
  const currentUser = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (currentUser) {
    throw new BadRequestError("Email already use.");
  }

  const user = await User.create(req.body);
  user.save();

  sendTokenResponse(user, 201, res);
});

/**
 * @desc  Signin user
 * @route POST /api/v1/auth/signin
 * @access  Public
 */
export const signin = asyncHandler(async (req: Request, res: Response) => {
  const currentUser = await User.findOne({ where: { email: req.body.email } });

  if (!currentUser) {
    throw new NotFoundError("User not found.");
  }

  const matchPassword = await Password.compare(
    currentUser.password,
    req.body.password
  );

  if (!matchPassword) {
    throw new BadRequestError("Incorrect password.");
  }

  sendTokenResponse(currentUser, 200, res);
});

/**
 * @desc  Get user
 * @route GET /api/v1/auth/user
 * @access  Private
 */
export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findOne({
      attributes: { exclude: ["password"] },
      where: { id: req.user?.id },
    });
    res.status(200).json({
      status: 200,
      data: user,
    });
  }
);

/**
 * @desc  Sigout user
 * @route POST /api/v1/auth/signout
 * @access  Private
 */
export const signout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.end();
});

/**
 * @desc  Update user details
 * @route PUT /api/v1/auth/updatedetails
 * @access  Private
 */
export const updateUserDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { id: req.user?.id } });

    if (!user) {
      throw new UnauthorizedError("You must login.");
    }

    if (req.body.password && req.body.currentPassword) {
      const matchPassword = await Password.compare(
        user?.password,
        req.body.currentPassword
      );

      if (!matchPassword) {
        throw new BadRequestError("Incorrect password.");
      }

      const hashedPassword = await Password.toHash(req.body.password);
      req.body.password = hashedPassword;
    }

    const updatedUser = await user?.update(req.body);
    updatedUser?.save();

    res.status(200).json({
      status: 200,
      data: updatedUser,
    });
  }
);

// Send Token Middleware
const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRE,
    }
  );

  const options = {
    expires: new Date(
      Date.now() + Number(config.JWT_COOKIE_EXPIRE) * 24 * 60 * 1000
    ),
    httpOnly: true,
    secure: false,
  };

  if (config.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ status: statusCode, token });
};
