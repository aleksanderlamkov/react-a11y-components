import React, { type FC } from 'react'
import Select from '@/shared/ui/Select'

const HomePage: FC = () => {
  return (
    <div>
      <h2>Custom select</h2>

      <select>
        <option value="">Choose variant...</option>
        <option value="1">Option 1</option>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
      </select>

      <Select
        id="select-1"
        label="Select 1"
        options={[
          { id: 'option-1', value: '1', label: 'Option 1' },
          { id: 'option-2', value: '2', label: 'Option 2' },
          { id: 'option-3', value: '3', label: 'Option 3' },
        ]}
      />
      {/*<br/>*/}
      {/*<Select*/}
      {/*  id="select-2"*/}
      {/*  label="Select 2"*/}
      {/*  value="2"*/}
      {/*  options={[*/}
      {/*    { id: 'option-1', value: '1', label: 'Option 1' },*/}
      {/*    { id: 'option-2', value: '2', label: 'Option 2' },*/}
      {/*    { id: 'option-3', value: '3', label: 'Option 3' },*/}
      {/*  ]}*/}
      {/*/>*/}
    </div>
  )
}

export default HomePage
