import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Spinner } from '@/components/Elements'
import { MainLayout } from '@/components/Layout'
import { DiscussionsRoutes } from '@/features/discussions'
import { Dashboard } from '@/features/misc'
import { Users, Profile } from '@/features/users'
// TODO
// import { lazyImport } from '@/utils/lazyImport'

// const { DiscussionsRoutes } = lazyImport(
//   () => import('@/features/discussions'),
//   'DiscussionsRoutes'
// )
// const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard')
// const { Profile } = lazyImport(() => import('@/features/users'), 'Profile')
// const { Users } = lazyImport(() => import('@/features/users'), 'Users')

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

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/app/users', element: <Users /> },
      { path: '/app/profile', element: <Profile /> },
      { path: '/app/discussions/*', element: <DiscussionsRoutes /> },
      { path: '*', element: <Navigate to="." /> }
    ]
  }
]
