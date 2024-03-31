"use server";
import { db } from "@/services/database";
import bcrypt from "bcryptjs";

export const signUp = async (email: string, password: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return "Usuário com esse email ja existe!";
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await db.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return "Sucesso!";
  } catch (error) {
    return "Erro";
  }
};
