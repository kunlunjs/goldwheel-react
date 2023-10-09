import { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { Spinner } from '@/components/Elements'
import { MainLayout } from '@/components/Layout'
// import { Loading } from '@/components/Loading'
import { useUser } from '@/lib/auth'
import { lazyImport } from '@/utils/lazyImport'

const { DiscussionsPage } = lazyImport(
  () => import('@/features/discussions/routes/Discussions'),
  'DiscussionsPage'
)
const { DiscussionPage } = lazyImport(
  () => import('@/features/discussions/routes/Discussion'),
  'DiscussionPage'
)
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard')
const { Profile } = lazyImport(() => import('@/features/users'), 'Profile')
const { Users } = lazyImport(() => import('@/features/users'), 'Users')

const App = () => {
  const user = useUser()
  const location = useLocation()

  if (!user.data) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Spinner size="lg" />
            {/* <Loading /> */}
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
            element: <DiscussionsPage />
          },
          {
            path: '/app/discussions/:discussionId',
            element: <DiscussionPage />
          }
        ]
      },
      { path: '*', element: <Navigate to="." /> }
    ]
  }
]
