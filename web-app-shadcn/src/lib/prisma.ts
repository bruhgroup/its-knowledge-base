import { PrismaClient } from "@prisma/client";

// image bitnami/postgresql
// POSTGRESQL_DATABASE = next
// POSTGRESQL_USERNAME = next
// POSTGRESQL_PASSWORD = next1234

const prisma: PrismaClient = new PrismaClient();

export default prisma;
