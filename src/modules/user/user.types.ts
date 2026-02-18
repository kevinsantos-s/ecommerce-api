import { UserRole } from "@prisma/client"

export type CreateUser = {
    name: String;
    email: String;
    password: String;
    role: UserRole;
}

export type UserResponse = {
    id: String;
    name: String;
    email: String;
    createdAt: Date;
    updatedAt: Date;
}