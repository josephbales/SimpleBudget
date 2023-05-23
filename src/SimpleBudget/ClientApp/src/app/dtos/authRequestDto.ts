export interface AuthRequestDto {
  provider: number; // TODO: pass in non-case sensitive to backend.
  idToken: string;
}
