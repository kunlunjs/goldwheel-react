# Gold Wheel React

Showcasing Best Practices For Building React Applications

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
- [ ] fix: `pnpm e2e` and `e2e:headless`
- [ ] vitest intersection observer polyfill

## Reference Link

- [msw 1.x -> 2.x](https://mswjs.io/docs/migrations/1.x-to-2.x/))
- [Migration guild for Storybook 7.0](https://storybook.js.org/docs/react/migration-guide)
- [@tanstack/react-query migrating to v5](https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5)