import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const connectionString = process.env.DATABASE_URL || "mysql://root:@localhost:3306/shoestore";

const adapter = new PrismaMariaDb(connectionString.replace("mysql://", "mariadb://"));

export const prisma = new PrismaClient({ adapter });
