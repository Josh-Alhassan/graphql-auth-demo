import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const APP_SECRET = process.env.APP_SECRET as string;

export function getTokenPayload(token: string) {
  return jwt.verify(token, APP_SECRET) as { userId: number };
}

export function getUserIdFromAuthHeader(
  authHeader: string | undefined
): number | null {
  if (!authHeader) return null;
  const token = authHeader.replace("Bearer ", "");

  try {
    const { userId } = getTokenPayload(token);
    return userId;
  } catch {
    return null;
  }
}

export { prisma, APP_SECRET };
