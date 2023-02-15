import type { ReactNode } from 'react'
import clsx from 'clsx'
import { zodResolver } from '@hookform/resolvers/zod'
import type {
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
  FieldValues
} from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { ZodType } from 'zod'

type FormProps<TFormValues extends FieldValues, Schema> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (methods: UseFormReturn<TFormValues>) => ReactNode
  options?: UseFormProps<TFormValues>
  schema?: Schema
  className?: string
  id?: string
}

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown> = ZodType<unknown>
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema)
  })
  return (
    <form
      className={clsx('space-y-6', className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
  )
}
