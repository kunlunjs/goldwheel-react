import { useRoutes } from 'react-router-dom'
import { Landing } from '@/features/misc'
import { useUser } from '@/lib/auth'
import { lazyImport } from '@/utils/lazyImport'
import { protectedRoutes } from './protected'
import { publicRoutes } from './public'

const { CoreLayout } = lazyImport(
  () => import('@/components/Layout/CoreLayout'),
  'CoreLayout'
)

export const AppRoutes = () => {
  const user = useUser()

  const commonRoutes = [
    { path: '/', element: <Landing /> },
    { path: '/layout', element: <CoreLayout /> }
  ]

  const routes = user.data ? protectedRoutes : publicRoutes

  const element = useRoutes([...routes, ...commonRoutes])

  return <>{element}</>
}
