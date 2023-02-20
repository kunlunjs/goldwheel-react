import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import type { EChartsOption, EChartsType } from 'echarts'
import isEmpty from 'lodash/isEmpty'
export const useECharts = (options: EChartsOption, data?: any) => {
  const chart = useRef<EChartsType>()
  const echartsRef = useRef<HTMLDivElement>(null)

  const echartsResize = () => {
    echartsRef.current && chart.current?.resize()
  }

  useEffect(() => {
    if (!isEmpty(data)) {
      chart.current?.setOption(options)
    }
  }, [data])

  useEffect(() => {
    if (echartsRef.current) {
      chart.current = echarts.init(echartsRef.current!)
    }
    chart.current?.setOption(options)
    window.addEventListener('resize', echartsResize)

    return () => {
      window.removeEventListener('resize', echartsResize)
      chart.current?.dispose()
    }
  }, [echartsRef.current, chart.current])

  return [echartsRef]
}
