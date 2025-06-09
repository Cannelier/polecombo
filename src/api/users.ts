import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const prisma = new PrismaClient();
const users = new Hono();

users.post('/', async (c) => {
    const { id, email } = await c.req.json()

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        })
        if (!existingUser)
            {
                const user = await prisma.user.create({
                    data: {
                        id: id,
                        email: email,
                    }
                })
                return c.json(user);
            }
        return c.json(existingUser)
    } catch (error) {
        console.error("User sync failed:", error);
    }
})

export default users;