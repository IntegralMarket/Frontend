export const CompareIcon = (active: boolean, isHover?: boolean) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill={active ? (isHover ? '#002366' : 'none') : 'none'}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z'
        stroke={active ? (isHover ? '#fff' : '#002366') : '#C5C7CD'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.15 13.8203L14.11 16.8603'
        stroke={active ? (isHover ? '#fff' : '#002366') : '#C5C7CD'}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.84998 13.8203H17.15'
        stroke={active ? (isHover ? '#fff' : '#002366') : '#C5C7CD'}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.84998 10.1796L9.88998 7.13965'
        stroke={active ? (isHover ? '#fff' : '#002366') : '#C5C7CD'}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.15 10.1797H6.84998'
        stroke={active ? (isHover ? '#fff' : '#002366') : '#C5C7CD'}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
