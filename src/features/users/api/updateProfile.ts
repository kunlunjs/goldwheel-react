import { useMutation } from '@tanstack/react-query'
import { useUser } from '@/lib/auth'
import { axios } from '@/lib/axios'
import { useNotificationStore } from '@/stores/notifications'

export type UpdateProfileDTO = {
  data: {
    bio: string
    email: string
    first_name: string
    last_name: string
  }
}

export const updateProfile = ({ data }: UpdateProfileDTO) => {
  return axios.patch(`/users/profile`, data)
}

type UseUpdateProfileOptions = {
  config?: Partial<Parameters<typeof useMutation>[0]> // MutationConfig<typeof updateProfile>
}

export const useUpdateProfile = ({ config }: UseUpdateProfileOptions = {}) => {
  const { addNotification } = useNotificationStore()
  const user = useUser()
  return useMutation({
    ...config,
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'User Updated'
      })
      user.refetch()
    },
    mutationFn: updateProfile
  })
}
