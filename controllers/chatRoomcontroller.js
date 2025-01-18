import prisma from "../prisma/prisma.js";

export const createChatRoom = async (req, res) => {
  const name = req.body();
  try {
    const chatRoom = await prisma.user.create({
      data: {
        name,
      },
    });
    res.status(200).json({
      status: true,
      message: "ChatRoom created Successfully",
      chatRoom,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
      error,
    });
  }
};
