import { useMutation } from '@tanstack/react-query'
import { axios } from '@/lib/axios'
import type { MutationConfig } from '@/lib/react-query'
import { queryClient } from '@/lib/react-query'
import { useNotificationStore } from '@/stores/notifications'

export type DeleteUserDTO = {
  userId: string
}

export const deleteUser = ({ userId }: DeleteUserDTO) => {
  return axios.delete(`/users/${userId}`)
}

type UseDeleteUserOptions = {
  config?: MutationConfig<typeof deleteUser>
}

export const useDeleteUser = ({ config }: UseDeleteUserOptions = {}) => {
  const { addNotification } = useNotificationStore()

  return useMutation({
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      addNotification({
        type: 'success',
        title: 'User Deleted'
      })
    },
    mutationFn: deleteUser
  })
}
