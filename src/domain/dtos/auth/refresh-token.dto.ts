export class RefreshTokenDto {
  constructor(public readonly refreshToken: string) {}

  static fromHeader(header: string): [string?, RefreshTokenDto?] {
    const [type, token] = header.split(" ");
    if (type === "Bearer") {
      return [undefined, new RefreshTokenDto(token)];
    }
    return ["Invalid token type", undefined];
  }
}
