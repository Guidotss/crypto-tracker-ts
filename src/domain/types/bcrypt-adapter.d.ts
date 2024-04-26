


export type Sign = (password: string, salt = 12) => Promise<string>
export type Verify = (password: string, hashedPassword: string) => Promise<boolean>