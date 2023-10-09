# Gold Wheel

## NOTE

利用 `useMutation` 封装自定义 hook

```tsx
export const useSignUp = <T extends string>() => {
  return useMutation<SuccessResponse, ErrorResponse<T>, Record<T, string>>(...)
}
```

### hook [`useEcharts`](./src/hooks/useECharts.tsx) usage

```tsx
import { useECharts } from '@/hooks/useECharts'
function Example() {
  const [echartRef] = useECharts({
    //options...
  })

  return <div ref={echartRef} className="h-96 w-96" /> // <div ref={echartRef} style={{ width: 400, height: 400 }} />
}
```

## TODO
[ ] fix: `pnpm e2e` and `e2e:headless`