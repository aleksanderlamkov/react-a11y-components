import React, { type FC } from 'react'
import classNames from 'classnames'
import useSelect from './useSelect'
import type { TSelect } from './types'
import './styles.pcss'

const Select: FC<TSelect> = (props) => {
  const {
    id,
    label,
    placeholder = 'Choose variant...',
    options,
    value,
  } = props

  const {
    comboBoxRef,
    isExpanded,
    selectedOption,
    highlightedOptionIndex,
    labelAria,
    comboBoxAria,
    listBoxAria,
    placeholderOptionAria,
    onComboBoxClick,
    onOptionClick,
  } = useSelect({ id, options, value })

  return (
    <div className={classNames('select', { 'is-expanded': isExpanded })}>
      <label className="select__label" {...labelAria}>{label}</label>
      <button
        className="select__combo-box"
        ref={comboBoxRef}
        onClick={onComboBoxClick}
        {...comboBoxAria}
      >
        <span className="select__combo-box-text">
          {selectedOption?.label ?? placeholder}
        </span>
        <span className="select__combo-box-icon">▽</span>
      </button>
      <div className="select__list-box" {...listBoxAria}>
        <button className="visually-hidden" {...placeholderOptionAria}>
          {placeholder}
        </button>

        {options.map((option, index) => {
          const { value, label } = option
          const isSelected = option.id === selectedOption?.id
          const idFormatted = `select-${id}-${option.id}`

          return (
            <button
              className={classNames('select__option', {
                'is-selected': isSelected,
                'is-highlighted': highlightedOptionIndex === index,
              })}
              key={idFormatted}
              id={idFormatted}
              tabIndex="-1"
              role="option"
              value={value}
              aria-selected={isSelected}
              onClick={() => onOptionClick(option, index)}
        >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Select
