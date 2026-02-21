import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const connection = process.env.DATABASE_URL || "mariadb://root:@localhost:3306/shoestore";

const adapter = new PrismaMariaDb(connection);

export const prisma = new PrismaClient({ adapter});