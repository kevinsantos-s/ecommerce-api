export interface createUser{ 
    name: string
    email: string
    password: string
}

export interface userResponse{
    id: string
    name: string
    email: string
    password: string
    createdAt: Date
    
}

export interface editUser{
    id: string
    name: string
    email: string
    password: string
    updatedAt: Date
}
