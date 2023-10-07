import type { ReactNode } from 'react'
import { useParams as useMockParams } from 'react-router-dom'

import {
  renderApp,
  screen,
  userEvent,
  waitFor,
  createDiscussion,
  createUser,
  within
} from '@/test/test-utils'
import { DiscussionPage } from '../Discussion'

vi.mock('react-router-dom', async () => {
  return {
    ...vi.importActual('react-router-dom'),
    useParams: vi.fn(),
    BrowserRouter: ({ children }: { children: ReactNode }) => children
  }
})

const renderDiscussion = async () => {
  const fakeUser = await createUser()
  const fakeDiscussion = await createDiscussion({ team_id: fakeUser.team_id })

  ;(useMockParams as any).mockImplementation(() => ({
    discussionId: fakeDiscussion.id
  }))

  const utils = await renderApp(<DiscussionPage />, {
    user: fakeUser
  })

  await screen.findByText(fakeDiscussion.title)

  return {
    ...utils,
    fakeUser,
    fakeDiscussion
  }
}

test('should render discussion', async () => {
  const { fakeDiscussion } = await renderDiscussion()
  expect(screen.getByText(fakeDiscussion.body)).toBeInTheDocument()
})

test('should update discussion', async () => {
  const { fakeDiscussion } = await renderDiscussion()

  const titleUpdate = '-Updated'
  const bodyUpdate = '-Updated'

  await userEvent.click(
    screen.getByRole('button', { name: /update discussion/i })
  )

  const drawer = screen.getByRole('dialog', {
    name: /update discussion/i
  })

  const titleField = within(drawer).getByText(/title/i)
  const bodyField = within(drawer).getByText(/body/i)

  await userEvent.type(titleField, titleUpdate)
  await userEvent.type(bodyField, bodyUpdate)

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i
  })

  await userEvent.click(submitButton)

  await waitFor(() => expect(drawer).not.toBeInTheDocument())

  const newTitle = `${fakeDiscussion.title}${titleUpdate}`
  const newBody = `${fakeDiscussion.body}${bodyUpdate}`

  await screen.findByText(newTitle)
  expect(screen.getByText(newBody)).toBeInTheDocument()
})

test('should create and delete a comment on the discussion', async () => {
  await renderDiscussion()

  const comment = 'Hello World'

  await userEvent.click(screen.getByRole('button', { name: /create comment/i }))

  const drawer = screen.getByRole('dialog', {
    name: /create comment/i
  })

  const bodyField = within(drawer).getByText(/body/i)

  await userEvent.type(bodyField, comment)

  const submitButton = within(drawer).getByRole('button', {
    name: /submit/i
  })

  await userEvent.click(submitButton)

  await waitFor(() => expect(drawer).not.toBeInTheDocument())

  const commentsList = screen.getByRole('list', {
    name: 'comments'
  })

  const commentElements = within(commentsList).getAllByRole('listitem')

  const commentElement = commentElements[0]

  expect(commentElement).toBeInTheDocument()

  const deleteCommentButton = within(commentElement).getByRole('button', {
    name: /delete comment/i
  })

  await userEvent.click(deleteCommentButton)

  const confirmationDialog = screen.getByRole('dialog', {
    name: /delete comment/i
  })

  const confirmationDeleteButton = within(confirmationDialog).getByRole(
    'button',
    {
      name: /delete/i
    }
  )

  await userEvent.click(confirmationDeleteButton)

  await screen.findByText(/comment deleted/i)

  expect(within(commentsList).queryByText(comment)).not.toBeInTheDocument()
})
