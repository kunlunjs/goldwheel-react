import { useRef } from 'react'
import { useDisclosure } from '@/hooks/useDisclosure'
import { rtlRender, screen, userEvent, waitFor } from '@/test/test-utils'
import { Button } from '../../Button'
import { Dialog, DialogTitle } from '../Dialog'

const openButtonText = 'Open Modal'
const cancelButtonText = 'Cancel'
const titleText = 'Modal Title'

const TestDialog = () => {
  const { close, open, isOpen } = useDisclosure()
  const cancelButtonRef = useRef(null)

  return (
    <>
      <Button onClick={open}>{openButtonText}</Button>
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div>
          <DialogTitle as="h3">{titleText}</DialogTitle>

          <Button type="button" onClick={close} ref={cancelButtonRef}>
            {cancelButtonText}
          </Button>
        </div>
      </Dialog>
    </>
  )
}

test('should handle basic dialog flow', async () => {
  await rtlRender(<TestDialog />)
  // @ts-ignore
  expect(screen.queryByText(titleText)).not.toBeInTheDocument()

  await userEvent.click(screen.getByRole('button', { name: openButtonText }))
  // @ts-ignore
  expect(screen.getByText(titleText)).toBeInTheDocument()

  await userEvent.click(screen.getByRole('button', { name: cancelButtonText }))

  await waitFor(() =>
    // @ts-ignore
    expect(screen.queryByText(titleText)).not.toBeInTheDocument()
  )
})
