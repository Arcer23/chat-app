import userValidator from "../validation/user.validator.js";
import prisma from "../prisma/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const { userSchema, loginUserSchema } = userValidator;

export const registerUser = async (req, res) => {
  const { errors } = userSchema.validate(req.body);
  if (errors) {
    res.status(400).json({
      status: false,
      message: "Validation Errors",
      details: errors.details,
    });
  }
  const { username, name, email, password } = req.body;
  try {
    const ifuser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (ifuser) {
      res.status(400).json({
        status: false,
        error: "Account with this email already Exists ",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = prisma.user.create({
      data: {
        username,
        email,
        name,
        password: hashedPassword,
      },
    });

    console.log(user);
    const token = jwt.sign(
      { _id: user.id, email: user.email },
      process.env.SECRETKEY,
      { expiresIn: "24h" }
    );
    res.status(200).json({
      status: true,
      message: "Account Made Successfully",
      token,
      user,
    });
  } catch (errors) {
    console.log(errors);
    res.status(400).json({
      status: false,
      error: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {
  const { error } = loginUserSchema.validate(req.body);
  if (error) {
    return res.status(500).json({
      status: false,
      message: "Validation Error",
      details: error.details,
    });
  }

  try {
    const { email, password } = req.body;
    const ifuser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!ifuser) {
      return res.status(401).json({
        status: false,
        message: "User does not exist",
      });
    }

    const ispasswordValid = await bcrypt.compare(password, ifuser.password);
    if (!ispasswordValid) {
      return res.status(401).json({
        status: false,
        error: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { _id: ifuser.id, email: ifuser.email },
      process.env.SECRETKEY,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      status: true,
      message: "Login Successful",
      token,
      user: ifuser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      error: "Internal Server Error",
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: "Validation Error",
      details: error.details,
    });
  }
  const { name, username, email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "User not found",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });
    return res.status(200).json({
      status: true,
      message: "User updated Successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      error: "Internal Server Error",
    });
  }
};
