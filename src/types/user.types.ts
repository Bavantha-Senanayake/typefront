export interface User {
  id?: string;
  firstname: string | number;
  age: string | number;
}

export interface CreateUserRequest {
  firstname: string | number;
  age: string | number;
}

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}
