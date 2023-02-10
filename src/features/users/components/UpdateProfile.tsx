import { PencilIcon } from '@heroicons/react/24/solid'
import * as z from 'zod'
import { Button } from '@/components/Elements'
import { Form, FormDrawer, InputField, TextAreaField } from '@/components/Form'
import { useUser } from '@/lib/auth'
import type { UpdateProfileDTO } from '../api/updateProfile'
import { useUpdateProfile } from '../api/updateProfile'

const schema = z.object({
  email: z.string().min(1, 'Required'),
  first_name: z.string().min(1, 'Required'),
  last_name: z.string().min(1, 'Required'),
  bio: z.string()
})

export const UpdateProfile = () => {
  const user = useUser()
  const updateProfileMutation = useUpdateProfile()

  return (
    <FormDrawer
      isDone={updateProfileMutation.isSuccess}
      triggerButton={
        <Button startIcon={<PencilIcon className="h-4 w-4" />} size="sm">
          Update Profile
        </Button>
      }
      title="Update Profile"
      submitButton={
        <Button
          form="update-profile"
          type="submit"
          size="sm"
          isLoading={updateProfileMutation.isLoading}
        >
          Submit
        </Button>
      }
    >
      <Form<UpdateProfileDTO['data'], typeof schema>
        id="update-profile"
        onSubmit={async values => {
          await updateProfileMutation.mutateAsync({ data: values })
        }}
        options={{
          defaultValues: {
            first_name: user.data?.first_name,
            last_name: user.data?.last_name,
            email: user.data?.email,
            bio: user.data?.bio
          }
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              label="First Name"
              error={formState.errors['first_name']}
              registration={register('first_name')}
            />
            <InputField
              label="Last Name"
              error={formState.errors['last_name']}
              registration={register('last_name')}
            />
            <InputField
              label="Email Address"
              type="email"
              error={formState.errors['email']}
              registration={register('email')}
            />

            <TextAreaField
              label="Bio"
              error={formState.errors['bio']}
              registration={register('bio')}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  )
}
