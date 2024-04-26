export type Sign = (
  payload: any,
  secret: string,
  expiresIn = "1h"
) => Promise<string | undefined>;

export type Verify = <T>(
  token: string,
  secret: string
) => Promise<T | undefined>;
