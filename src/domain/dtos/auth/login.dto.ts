export class LoginDto {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}

  static fromRequest(request: { [key: string]: string }): [string?, LoginDto?] {
    const { email, password } = request;
    if (!email) {
      return ["Email is required"];
    }
    if (!password) {
      return ["Password is required"];
    }
    if (password.length < 6) {
      return ["Password must be at least 6 characters"];
    }
    return [undefined, new LoginDto(email, password)];
  }
}
