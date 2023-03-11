import { FC, useState } from 'react'
import BaseSelect, {
  components,
  ControlProps,
  DropdownIndicatorProps,
  IndicatorsContainerProps,
  MenuListProps,
  MultiValueProps,
  OptionProps,
  PlaceholderProps,
  SingleValueProps,
  ValueContainerProps,
} from 'react-select'
import cn from 'classnames'

import { Checkbox } from 'components'

import { optionToString } from 'shared/helpers/select'
import { SelectOption, SelectType } from 'shared/types'

import s from './Select.module.scss'

type SelectTypeUnknown<T = SelectOption> = SelectType<T> | unknown
const SelectTypeGuard = (value: SelectTypeUnknown): SelectType => {
  return typeof value === 'object' ? (value as SelectType) : null
}

export interface SelectProps {
  options: SelectOption[]
  value?: SelectType
  placeholder?: string
  onChange?: (value: SelectType<string>, id?: string) => void
  id?: string
  className?: string
  isMulti?: boolean
  isDisabled?: boolean
  isClearable?: boolean
  ref?: HTMLSelectElement | null
  error?: Error
  preselected?: boolean
}

export const Select: FC<SelectProps> = ({
  options,
  value,
  placeholder,
  onChange,
  id,
  className,
  isClearable = true,
  isMulti = false,
  isDisabled = false,
  error,
  preselected = false
}) => {
  const [selectedOptions, setSelectedOptions] =
    useState<SelectTypeUnknown>(value)
  const handleSelect = (value: SelectTypeUnknown) => {
    onChange?.(optionToString(SelectTypeGuard(value)), id)
    setSelectedOptions(value)
  }

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const Control: FC<ControlProps> = props => (
    <components.Control
      {...props}
      className={cn(
        s.control,
        { [s.disabled]: isDisabled },
        { [s.error]: error },
        'CSS_select__control'
      )}
    />
  )

  const IndicatorsContainer: FC<IndicatorsContainerProps> = props => (
    <components.IndicatorsContainer {...props} className={s.container} />
  )
  const DropdownIndicator: FC<DropdownIndicatorProps> = props => (
    <components.DropdownIndicator
      {...props}
      className={cn(s.arrow, { [s.isOpen]: isOpen })}
    />
  )
  const ValueContainer: FC<ValueContainerProps> = props => (
    <components.ValueContainer {...props} className={s.valueContainer} />
  )

  const MenuList: FC<MenuListProps> = props => (
    <components.MenuList {...props} className={s.menuList} />
  )

  const MultiValue: FC<MultiValueProps> = props => (
    <components.MultiValue
      {...props}
      key={props.index}
      className={s.multiValue}
    >
      {/* @ts-ignore */}
      {props.options.find(elem => props.data.value === elem.value)?.label}
    </components.MultiValue>
  )

  const SingleValue: FC<SingleValueProps> = props => (
    <components.SingleValue {...props} className={s.singleValue}>
      {/* @ts-ignore */}
      {props.options.find(elem => props.data.value === elem.value)?.label}
    </components.SingleValue>
  )

  const Placeholder: FC<PlaceholderProps> = props => (
    <components.Placeholder
      {...props}
      className={cn(s.placeholder, 'CSS_select__placeholder')}
    />
  )

  const Option: FC<OptionProps> = props => (
    <components.Option
      {...props}
      className={cn(s.option, 'CSS_select__option', {
        [s.isSelected]: props.isSelected,
      })}
    >
      <Checkbox
        id={'checkbox'}
        isChecked={props.isSelected}
        onChange={() => { }}
      />
      {props.label}
    </components.Option>
  )
  // with preselected, first option is selected by default
  const finalValue = preselected ? selectedOptions ?? options[0] : selectedOptions

  return (
    <BaseSelect
      closeMenuOnSelect={true}
      id={id}
      className={cn(s.select, className)}
      options={options}
      value={finalValue}
      onChange={handleSelect}
      onMenuOpen={handleOpen}
      placeholder={placeholder}
      onMenuClose={handleClose}
      isClearable={isClearable}
      isMulti={isMulti}
      hideSelectedOptions={false}
      isDisabled={isDisabled}
      components={{
        Control,
        DropdownIndicator,
        IndicatorsContainer,
        MenuList,
        MultiValue,
        Option,
        Placeholder,
        SingleValue,
        ValueContainer,
      }}
    />
  )
}
