export const DocIcon = (active: Boolean) => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill='var(--body)'
        d='M18.3333 8.33335V12.5C18.3333 16.6667 16.6667 18.3334 12.5 18.3334H7.49999C3.33332 18.3334 1.66666 16.6667 1.66666 12.5V7.50002C1.66666 3.33335 3.33332 1.66669 7.49999 1.66669H11.6667'
        stroke='var(--border)'
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fill='var(--head)'
        d='M18.3333 8.33335H15C12.5 8.33335 11.6667 7.50002 11.6667 5.00002V1.66669L18.3333 8.33335Z'
        stroke='var(--border)'
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.83334 10.8333H10.8333'
        stroke='#002366'
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.83334 14.1667H9.16668'
        stroke='#002366'
        strokeWidth='1.3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
