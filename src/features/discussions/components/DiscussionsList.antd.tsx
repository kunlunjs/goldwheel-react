import { DeleteOutlined } from '@ant-design/icons'
import { Table, Tooltip } from 'antd'
import { Link } from '@/components/Elements'
import { Loading } from '@/components/Loading'
import { formatDate } from '@/utils/format'
import { useDiscussions } from '../api/getDiscussions'
import type { Discussion } from '../types'

export const DiscussionsList = () => {
  const discussionsQuery = useDiscussions()

  if (discussionsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        {/* <Spinner size="lg" /> */}
        <Loading />
      </div>
    )
  }

  if (!discussionsQuery.data) return null

  return (
    <Table<Discussion>
      rowKey="id"
      // size="small"
      dataSource={discussionsQuery.data}
      columns={[
        {
          title: 'Title',
          dataIndex: 'title'
        },
        {
          title: 'Created At',
          dataIndex: 'created_at',
          render(val) {
            return <span>{formatDate(val)}</span>
          }
        },
        {
          title: '',
          dataIndex: 'id',
          render(val) {
            return <Link to={`./${val}`}>View</Link>
          }
        },
        {
          title: '',
          dataIndex: 'id',
          render(val) {
            // return <DeleteDiscussion id={val} />
            return (
              <Tooltip title="delete discussion">
                <DeleteOutlined color="red" />
              </Tooltip>
            )
          }
        }
      ]}
    />
  )
}
