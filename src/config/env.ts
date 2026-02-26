export const env = {
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_REFRESHTOKEN: process.env.JWT_REFRESHTOKEN as string,
    PORT: process.env.PORT || 3000
}