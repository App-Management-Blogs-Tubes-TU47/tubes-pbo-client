export interface UserDetailsResponse {
  message: string;
  status: number;
  data: UserDetailsResponseData;
  error: string;
}

export interface UserDetailsResponseData {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  profileUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
