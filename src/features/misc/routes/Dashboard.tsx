import { ContentLayout } from '@/components/Layout'
// import { useECharts } from '@/hooks/useECharts'
import { useUser } from '@/lib/auth'
import { ROLES } from '@/lib/authorization'

export const Dashboard = () => {
  const user = useUser()

  return (
    <ContentLayout title="Dashboard">
      <h1 className="mt-2 text-xl">
        Welcome <b>{`${user.data?.first_name} ${user.data?.last_name}`}</b>
      </h1>
      <h4 className="my-3">
        Your role is : <b>{user.data?.role}</b>
      </h4>
      <p className="font-medium">In this application you can:</p>
      {user.data?.role === ROLES.USER && (
        <ul className="my-4 list-inside list-disc">
          <li>Create comments in discussions</li>
          <li>Delete own comments</li>
        </ul>
      )}
      {user.data?.role === ROLES.ADMIN && (
        <ul className="my-4 list-inside list-disc">
          <li>Create discussions</li>
          <li>Edit discussions</li>
          <li>Delete discussions</li>
          <li>Comment on discussions</li>
          <li>Delete all comments</li>
        </ul>
      )}
    </ContentLayout>
  )
}
