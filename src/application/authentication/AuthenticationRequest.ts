export class AuthenticationRequest {
  constructor(
    public readonly username: string,
    public readonly password: string
  ) {}
}
