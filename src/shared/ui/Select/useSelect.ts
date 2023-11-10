import type { TSelect, TSelectOption } from './types'
import { useEffect, useRef, useState } from 'react'

type TUseSelect = Pick<TSelect, 'id' | 'options' | 'value'>

const useSelect = ({ id, options, value }: TUseSelect) => {
  const comboBoxRef = useRef(null)
  const getSelectedOption = (option: TSelectOption) => option.value === value
  const selectedOptionIndex = options.findIndex(getSelectedOption)
  const [selectedOption, setSelectedOption] =
    useState<TSelectOption | undefined>(options.find(getSelectedOption))
  const [highlightedOptionIndex, setHighlightedOptionIndex] =
    useState<number | undefined>(selectedOptionIndex >= 0 ? selectedOptionIndex : undefined)
  const [isExpanded, setIsExpanded] = useState(false)

  const labelId = `${id}-label`
  const listBoxId = `${id}-listbox`

  const labelAria = {
    id: labelId,
  }

  const comboBoxAria = {
    id,
    'role': 'combobox',
    'aria-haspopup': 'listbox',
    'aria-labelledby': labelId,
    'aria-controls': listBoxId,
    'aria-owns': listBoxId,
    'aria-expanded': isExpanded,
    'aria-activedescendant': isExpanded ? options[highlightedOptionIndex]?.id : '',
  }

  const listBoxAria = {
    id: listBoxId,
    'role': 'listbox',
    'aria-labelledby': labelId,
    'aria-hidden': !isExpanded,
  }

  const placeholderOptionAria = {
    id: `${id}-placeholder`,
    'role': 'option',
    'aria-selected': selectedOption === undefined,
  }

  const expand = () => {
    setIsExpanded(true)

    if (highlightedOptionIndex === undefined) {
      setHighlightedOptionIndex(0)
    }
  }

  const collapse = () => {
    setIsExpanded(false)
  }

  const expandIfComboBoxFocused = (focusedElement) => {
    const isComboBoxFocused = focusedElement === comboBoxRef.current

    if (isComboBoxFocused) {
      setIsExpanded((prevState) => {
        return prevState ? prevState : !prevState
      })
    }
  }

  const highlightPrevOption = ({ target }: KeyboardEvent) => {
    expandIfComboBoxFocused(target)

    setHighlightedOptionIndex((index) => {
      if (index === undefined) {
        return 0
      }

      const isInRange = index > 0

      return isInRange ? index - 1 : index
    })
  }

  const highlightNextOption = ({ target }: KeyboardEvent) => {
    expandIfComboBoxFocused(target)

    setHighlightedOptionIndex((index) => {
      if (index === undefined) {
        return 0
      }

      const isInRange = index < options.length - 1

      return isInRange ? index + 1 : index
    })
  }

  const selectHighlightedOption = () => {
    if (!isExpanded) {
      return
    }

    const hasHighlightedOption = typeof highlightedOptionIndex !== 'undefined'
    if (!hasHighlightedOption) {
      return
    }

    setSelectedOption(options[highlightedOptionIndex])
  }

  const KEY_ACTIONS = {
    'ArrowUp': highlightPrevOption,
    'ArrowDown': highlightNextOption,
    'Escape': collapse,
    'Enter': selectHighlightedOption,
  }

  const onComboBoxClick = (event) => {
    if (isExpanded) {
      const isEnterKeyPressed = event.nativeEvent.pointerType !== 'mouse'
      if (isEnterKeyPressed) {
        selectHighlightedOption()
      }

      collapse()
    } else {
      expand()
    }
  }

  const onOptionClick = (option: TSelectOption, index: number) => {
    setSelectedOption(option)
    setHighlightedOptionIndex(index)
    collapse()
  }

  const onKeyDown = (event) => {
    const { code } = event
    const action = KEY_ACTIONS[code]

    action?.(event)
  }

  const onFocusOut = () => {
    collapse()
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusout', onFocusOut)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [])

  return {
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
  }
}

export default useSelect
