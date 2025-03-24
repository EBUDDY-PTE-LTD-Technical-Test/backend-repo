// User interface defining the structure of user data
export interface User {
  uid: string;
  name: string;
  email: string;
}

// Request interface for updating user data
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
  profilePicture?: string;
}
