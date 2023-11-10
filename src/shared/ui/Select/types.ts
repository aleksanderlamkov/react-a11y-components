import type { SelectHTMLAttributes, ReactElement } from 'react'

type TNativeSelect = SelectHTMLAttributes<HTMLSelectElement>

export type TSelectOptionValue = string

export type TSelectOption = {
  id: string
  value: TSelectOptionValue
  label: ReactElement | string
}

export type TSelectId = string

export type TSelect = TNativeSelect & {
  id: TSelectId
  label: string
  placeholder?: string
  options: TSelectOption[]
  value?: TSelectOptionValue
}
