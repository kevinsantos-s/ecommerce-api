import { prisma } from "../../client"
import { createUser, userResponse } from "./user.interface";

export class UserService{
    async create(data: createUser): Promise<userResponse>{
        const user = await prisma.user.create({
            data,
        })
        return user;
    }
}