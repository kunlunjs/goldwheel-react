export type AuthUser = {
  id: string
  email: string
  bio: string
  first_name: string
  last_name: string
  role: 'ADMIN' | 'USER'
}

export type UserResponse = {
  jwt: string
  user: AuthUser
}
