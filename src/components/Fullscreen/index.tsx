import { useEffect, useState } from 'react'
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons'
import { message } from 'antd'
import screenfull from 'screenfull'

export const Fullscreen = () => {
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    screenfull.on('change', () => {
      if (screenfull.isFullscreen) {
        setFullscreen(true)
      } else {
        setFullscreen(false)
      }
    })

    return () => {
      screenfull.off('change', () => {})
    }
  }, [])

  const toggleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle()
    } else {
      message.warning('Your browser does not support fullscreen mode!')
    }
  }

  return fullscreen ? (
    <FullscreenExitOutlined onClick={toggleFullscreen} />
  ) : (
    <FullscreenOutlined onClick={toggleFullscreen} />
  )
}
