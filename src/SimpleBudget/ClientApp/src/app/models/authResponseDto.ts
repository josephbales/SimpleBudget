export interface AuthResponseDto {
  isAuthSuccessful: boolean;
  errorMessage: string | null;
  token: string | null;
  provider: string | null;
}
