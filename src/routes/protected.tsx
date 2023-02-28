import { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate, Outlet } from 'react-router-dom'
import { Spinner } from '@/components/Elements'
import { MainLayout } from '@/components/Layout'
import { lazyImport } from '@/utils/lazyImport'

const { Discussions } = lazyImport(
  () => import('@/features/discussions/routes/Discussions'),
  'Discussions'
)
const { Discussion } = lazyImport(
  () => import('@/features/discussions/routes/Discussion'),
  'Discussion'
)
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard')
const { Profile } = lazyImport(() => import('@/features/users'), 'Profile')
const { Users } = lazyImport(() => import('@/features/users'), 'Users')

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

export const protectedRoutes: RouteObject[] = [
  {
    path: '/app',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/app/users', element: <Users /> },
      { path: '/app/profile', element: <Profile /> },
      {
        path: '/app/discussions',
        children: [
          {
            index: true,
            element: <Discussions />
          },
          {
            path: '/app/discussions/:discussionId',
            element: <Discussion />
          }
        ]
      },
      { path: '*', element: <Navigate to="." /> }
    ]
  }
]
