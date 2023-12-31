import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

export const NotAuth = () => {
  const navigate = useNavigate()
  const goHome = () => {
    navigate('/app')
  }
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={goHome}>
          Back Home
        </Button>
      }
    />
  )
}
