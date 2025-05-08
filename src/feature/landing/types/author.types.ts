export interface LandingAuthorDetailsResponse {
  message: string;
  status: number;
  data: LandingAuthorDetailsResponseData;
}

export interface LandingAuthorDetailsResponseData {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  profileUrl: string | null;
  createdAt: Date;
  updatedAt: null;
}
