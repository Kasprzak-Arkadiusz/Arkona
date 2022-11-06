export type CustomJwtPayload = {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    role: string,
    nbf: number,
    exp: number,
    iat: number,
    iss: string
}