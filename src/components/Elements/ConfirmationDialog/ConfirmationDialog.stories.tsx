import type { Meta, StoryFn } from '@storybook/react'
import { Button } from '../Button'
import type { ConfirmationDialogProps } from './ConfirmationDialog'
import { ConfirmationDialog } from './ConfirmationDialog'

const meta: Meta = {
  title: 'Components/Elements/ConfirmationDialog',
  component: ConfirmationDialog,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: StoryFn<ConfirmationDialogProps> = props => (
  <ConfirmationDialog {...props} />
)

export const Danger = Template.bind({})
Danger.args = {
  icon: 'danger',
  title: 'Confirmation',
  body: 'Hello World',
  confirmButton: <Button className="bg-red-500">Confirm</Button>,
  triggerButton: <Button>Open</Button>
}

export const Info = Template.bind({})
Info.args = {
  icon: 'info',
  title: 'Confirmation',
  body: 'Hello World',
  confirmButton: <Button>Confirm</Button>,
  triggerButton: <Button>Open</Button>
}
