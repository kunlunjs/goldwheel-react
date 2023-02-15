import type { Meta, Story } from '@storybook/react'
import type { MDPreviewProps } from './MDPreview'
import { MDPreview } from './MDPreview'

const meta: Meta = {
  title: 'Components/Elements/MDPreview',
  component: MDPreview,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const Template: Story<MDPreviewProps> = props => <MDPreview {...props} />

export const Default = Template.bind({})
Default.args = {
  value: `## Hello World`
}
