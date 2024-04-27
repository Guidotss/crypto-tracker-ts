export type Sign = (
  payload: object,
  secret: string,
  expiresIn?: string
) => Promise<string | undefined>;

export type Verify = <T>(
  token: string,
  secret: string
) => Promise<T>;


export type TokenData = {
  _id: string; 
  iat: number; 
  exp: number;
}