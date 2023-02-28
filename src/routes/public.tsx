import type { RouteObject } from 'react-router-dom'
import { lazyImport } from '@/utils/lazyImport'

const { Layout } = lazyImport(
  () => import('@/features/auth/components/Layout'),
  'Layout'
)
const { Login } = lazyImport(
  () => import('@/features/auth/routes/Login'),
  'Login'
)
const { Register } = lazyImport(
  () => import('@/features/auth/routes/Register'),
  'Register'
)

export const publicRoutes: RouteObject[] = [
  {
    path: '/auth',
    // element: <Layout />
    children: [
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <Register />
      }
    ]
  }
]
