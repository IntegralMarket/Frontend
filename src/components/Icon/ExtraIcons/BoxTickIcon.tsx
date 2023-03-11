export const BoxTickIcon = (active: boolean) => {
  const isActive = active ? '#002366' : '#C5C7CD'

  return (
    <svg
      width='24px'
      height='24px'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M23.0011 17.9091C23.0211 18.6591 22.8211 19.3691 22.4611 19.9791C22.2611 20.3391 21.9912 20.6691 21.6912 20.9391C21.0012 21.5791 20.0911 21.9691 19.0811 21.9991C17.6211 22.0291 16.3311 21.2791 15.6211 20.1291C15.2411 19.5391 15.0111 18.8291 15.0011 18.0791C14.9711 16.8191 15.5311 15.6791 16.4311 14.9291C17.1111 14.3691 17.9712 14.0191 18.9112 13.9991C21.1212 13.9491 22.9511 15.6991 23.0011 17.9091Z'
        stroke={isActive}
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17.4414 18.0288L18.4514 18.9888L20.5414 16.9688'
        stroke={isActive}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <g opacity='0.4'>
        <path
          d='M3.17188 7.43945L12.0019 12.5494L20.7719 7.46942'
          stroke={isActive}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M12 21.6091V12.5391'
          stroke={isActive}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M21.6106 9.17V14.83C21.6106 14.88 21.6106 14.92 21.6006 14.97C20.9006 14.36 20.0006 14 19.0006 14C18.0606 14 17.1906 14.33 16.5006 14.88C15.5806 15.61 15.0006 16.74 15.0006 18C15.0006 18.75 15.2106 19.46 15.5806 20.06C15.6706 20.22 15.7806 20.37 15.9006 20.51L14.0706 21.52C12.9306 22.16 11.0706 22.16 9.9306 21.52L4.59061 18.56C3.38061 17.89 2.39062 16.21 2.39062 14.83V9.17C2.39062 7.79 3.38061 6.11002 4.59061 5.44002L9.9306 2.48C11.0706 1.84 12.9306 1.84 14.0706 2.48L19.4106 5.44002C20.6206 6.11002 21.6106 7.79 21.6106 9.17Z'
          stroke={isActive}
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}
