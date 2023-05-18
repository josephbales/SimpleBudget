export interface AuthResponseDto {
  authToken: string;
  refreshToken: string;
  provider: string;
  userId: string;
  username: string;
  email: string;
  avatarUrl: string;
}
