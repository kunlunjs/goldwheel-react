import { useMutation } from '@tanstack/react-query'

import { useUser } from '@/lib/auth'
import { axios } from '@/lib/axios'
import type { MutationConfig } from '@/lib/react-query'
import { useNotificationStore } from '@/stores/notifications'

export type UpdateProfileDTO = {
  data: {
    email: string
    first_name: string
    last_name: string
    bio: string
  }
}

export const updateProfile = ({ data }: UpdateProfileDTO) => {
  return axios.patch(`/users/profile`, data)
}

type UseUpdateProfileOptions = {
  config?: MutationConfig<typeof updateProfile>
}

export const useUpdateProfile = ({ config }: UseUpdateProfileOptions = {}) => {
  const { addNotification } = useNotificationStore()
  const user = useUser()
  return useMutation({
    onSuccess: () => {
      addNotification({
        type: 'success',
        title: 'User Updated'
      })
      user.refetch()
    },
    ...config,
    // @ts-ignore
    mutationFn: updateProfile
  })
}
