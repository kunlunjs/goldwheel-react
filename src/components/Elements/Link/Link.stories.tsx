import type { Meta, StoryFn } from '@storybook/react'
import { Link } from './Link'

const meta: Meta = {
  title: 'Components/Elements/Link',
  component: Link,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

// FIXME: Error: useHref() may be used only in the context of a <Router> component.
const Template: StoryFn = props => (
  <Link to="/" {...props}>
    Hello
  </Link>
)

export const Default = Template.bind({})
Default.args = {}
