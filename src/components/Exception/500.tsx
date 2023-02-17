import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export const InternalError = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/app')
  }
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  )
}
