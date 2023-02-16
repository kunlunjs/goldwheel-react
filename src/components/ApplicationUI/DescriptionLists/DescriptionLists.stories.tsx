import type { Meta, Story } from '@storybook/react'
import { LeftAlignedDescriptionLists } from './LeftAligned'
import { LeftAlignedInCardDescriptionLists } from './LeftAlignedInCard'
import { LeftAlignedStripedInCardDescriptionLists } from './LeftAlignedStripedInCard'
import { LeftAlignedWithInlineInActionsDescriptionLists } from './LeftAlignedWithInlineActions'
import { TwoColumnInCardDescriptionLists } from './TwoColumnInCard'

const meta: Meta = {
  title: 'Components/ApplicationUI/DescriptionLists',
  component: LeftAlignedInCardDescriptionLists,
  parameters: {
    controls: { expanded: true }
  }
}

export default meta

const LeftAlignedTemplate: Story = () => <LeftAlignedDescriptionLists />
export const LeftAligned = LeftAlignedTemplate.bind({})
LeftAligned.args = {}

const LeftAlignedInCardTemplate: Story = props => (
  <LeftAlignedInCardDescriptionLists />
)
export const LeftAlignedInCard = LeftAlignedInCardTemplate.bind({})
LeftAlignedInCard.args = {}

const TwoColumnInCardTemplate: Story = () => <TwoColumnInCardDescriptionLists />
export const TwoColumnInCard = TwoColumnInCardTemplate.bind({})
TwoColumnInCard.args = {}

const LeftAlignedStripedInCardTemplate: Story = () => (
  <LeftAlignedStripedInCardDescriptionLists />
)

export const LeftAlignedStripedInCard = LeftAlignedStripedInCardTemplate.bind(
  {}
)
LeftAlignedStripedInCard.args = {}

const LeftAlignedWithInlineInActionsTemplate: Story = () => (
  <LeftAlignedWithInlineInActionsDescriptionLists />
)

export const LeftAlignedWithInlineInActions =
  LeftAlignedWithInlineInActionsTemplate.bind({})
LeftAlignedTemplate.args = {}
