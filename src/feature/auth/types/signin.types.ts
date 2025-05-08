
export interface SigninResponse {
    message: string;
    status:  number;
    data:    SigninResponseData;
  }
  
  export interface SigninResponseData {
    token: string;
    user:  SigninResponseUser;
  }
  
  export interface SigninResponseUser {
    id:         string;
    name:       string;
    username:   string;
    email:      string;
    role:       string;
    profileUrl: null;
    createdAt:  Date;
    updatedAt:  null;
  }
  