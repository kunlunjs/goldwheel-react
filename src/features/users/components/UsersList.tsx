import { Table, Spinner } from '@/components/Elements'
import { formatDate } from '@/utils/format'
import { useUsers } from '../api/getUsers'
import type { User } from '../types'
import { DeleteUser } from './DeleteUser'

export const UsersList = () => {
  const usersQuery = useUsers()

  if (usersQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    )
  }

  if (!usersQuery.data) return null

  return (
    <Table<User>
      // @ts-ignore
      data={usersQuery.data}
      columns={[
        {
          title: 'First Name',
          field: 'first_name'
        },
        {
          title: 'Last Name',
          field: 'last_name'
        },
        {
          title: 'Email',
          field: 'email'
        },
        {
          title: 'Role',
          field: 'role'
        },
        {
          title: 'Created At',
          field: 'created_at',
          Cell({ entry: { created_at } }) {
            return <span>{formatDate(created_at)}</span>
          }
        },
        {
          title: '',
          field: 'id',
          Cell({ entry: { id } }) {
            return <DeleteUser id={id} />
          }
        }
      ]}
    />
  )
}
