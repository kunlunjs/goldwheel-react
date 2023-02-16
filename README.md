# Universe

## NOTE

利用 `useMutation` 封装自定义 hook

```tsx
export const useSignUp = <T extends string>() => {
  return useMutation<SuccessResponse, ErrorResponse<T>, Record<T, string>>(...)
}
```

## TODO

-   [x] remove all `@ts-ignore`
-   [x] remove console warning
-   [x] add gitlab-ci.yaml
-   [x] import antd components library
-   [ ] develop AI platform
-   [ ] migrate [DataPortal](http://gitlab.pegasus.tech/pbdata/data_portal_web) code
-   [ ] migrate [AutoBot]() Code
-   [ ] fix some `npm scripts`
-   [ ] perfect test
