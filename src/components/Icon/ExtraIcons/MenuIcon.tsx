export const MenuIcon = (active: boolean) => {
  const isActive = active ? '#002366' : '#C5C7CD'

  return (
    <svg
      width='19'
      height='19'
      viewBox='0 0 19 19'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g transform='translate(0,3)'>
        <path
          d='M5 1H18'
          stroke={isActive}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <circle cx='1' cy='1' r='1' fill={isActive} />
        <path
          opacity='0.4'
          d='M5 6H18'
          stroke={isActive}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <circle cx='1' cy='6' r='1' fill={isActive} />
        <path
          d='M5 11H18'
          stroke={isActive}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <circle cx='1' cy='11' r='1' fill={isActive} />
      </g>
    </svg>
  )
}
