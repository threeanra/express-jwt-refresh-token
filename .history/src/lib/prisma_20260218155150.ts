import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const connection = process.env.DATABASE_URL;

const adapter = new PrismaMariaDb(connection);

export const prisma = new PrismaClient({ adapter });
