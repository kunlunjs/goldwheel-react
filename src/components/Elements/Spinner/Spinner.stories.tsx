import type { Meta, StoryFn } from '@storybook/react'
import type { SpinnerProps } from './Spinner'
import { Spinner } from './Spinner'

const meta: Meta = {
  title: 'Components/Elements/Spinner',
  component: Spinner,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: StoryFn<SpinnerProps> = props => <Spinner {...props} />

export const Default = Template.bind({})
Default.args = {}
