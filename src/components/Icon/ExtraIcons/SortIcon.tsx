export const SortIcon = (active: boolean) => {
  const isActive = active ? '#002366' : '#C5C7CD'

  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3 7H21'
        stroke={isActive}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        opacity='0.34'
        d='M3 12H15'
        stroke={isActive}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
      <path
        d='M3 17H7'
        stroke={isActive}
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  )
}
