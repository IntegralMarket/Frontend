export const MapIcon = (active: boolean) => {
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
        d='M22 8.99953V14.9995C22 17.4995 21.5 19.2495 20.38 20.3795L14 13.9995L21.73 6.26953C21.91 7.05953 22 7.95953 22 8.99953Z'
        stroke={isActive}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21.73 6.27L6.26999 21.73C3.25999 21.04 2 18.96 2 15V9C2 4 4 2 9 2H15C18.96 2 21.04 3.26 21.73 6.27Z'
        stroke={isActive}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.3795 20.38C19.2495 21.5 17.4995 22 14.9995 22H8.99954C7.95954 22 7.05953 21.91 6.26953 21.73L13.9995 14L20.3795 20.38Z'
        stroke={isActive}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.24124 7.9807C6.92124 5.0507 11.3212 5.0507 12.0012 7.9807C12.3912 9.7007 11.3112 11.1607 10.3612 12.0607C9.67123 12.7207 8.58125 12.7207 7.88125 12.0607C6.93125 11.1607 5.84124 9.7007 6.24124 7.9807Z'
        stroke={isActive}
        strokeOpacity='0.4'
        strokeWidth='1.5'
      />
      <path
        d='M9.09375 8.69922H9.10273'
        stroke={isActive}
        strokeOpacity='0.4'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
