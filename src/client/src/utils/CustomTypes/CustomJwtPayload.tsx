export type CustomJwtPayload = {
    nameid: string,
    email: string,
    FirstName: string,
    LastName: string,
    role: string,
    nbf: number,
    exp: number,
    iat: number,
    iss: string
}