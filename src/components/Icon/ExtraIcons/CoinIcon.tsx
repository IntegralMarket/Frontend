export const CoinIcon = (active: boolean) => {
  const isActive = active ? '#002366' : '#C5C7CD'

  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g opacity='0.4'>
        <path
          d='M8 11.3992C8 12.1692 8.6 12.7992 9.33 12.7992H10.83C11.47 12.7992 11.99 12.2492 11.99 11.5792C11.99 10.8492 11.67 10.5892 11.2 10.4192L8.8 9.57922C8.32 9.40922 8 9.14922 8 8.41922C8 7.74922 8.52 7.19922 9.16 7.19922H10.66C11.4 7.20922 12 7.82922 12 8.59922'
          stroke={isActive}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M10 12.8496V13.5896'
          stroke={isActive}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M10 6.41016V7.19016'
          stroke={isActive}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <path
        d='M9.99 17.98C14.4028 17.98 17.98 14.4028 17.98 9.99C17.98 5.57724 14.4028 2 9.99 2C5.57724 2 2 5.57724 2 9.99C2 14.4028 5.57724 17.98 9.99 17.98Z'
        stroke={isActive}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        opacity='0.4'
        d='M12.9805 19.88C13.8805 21.15 15.3505 21.98 17.0305 21.98C19.7605 21.98 21.9805 19.76 21.9805 17.03C21.9805 15.37 21.1605 13.9 19.9105 13'
        stroke={isActive}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
