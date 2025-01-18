import prisma from "../prisma/prisma.js";

export const createMessage = async (req, res) => {
  const { content, userId } = req.body;
  try {
    const message = await prisma.message.create({
      data: {
        content,
        userId,
      },
    });
    res.status(200).json({ message: "Message Sent" }, message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error ",
      error,
    });
  }
};

