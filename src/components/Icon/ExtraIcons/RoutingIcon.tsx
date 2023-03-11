export const RoutingIcon = (active: boolean) => {
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
        d='M2.07006 4.60086C2.87006 1.14086 8.08006 1.14086 8.87006 4.60086C9.34006 6.63086 8.05006 8.35086 6.93006 9.42086C6.11006 10.2009 4.82006 10.1909 4.00006 9.42086C2.89006 8.35086 1.60006 6.63086 2.07006 4.60086Z'
        stroke={isActive}
        strokeWidth='1.5'
      />
      <path
        d='M15.07 16.6009C15.87 13.1409 21.11 13.1409 21.91 16.6009C22.38 18.6309 21.09 20.3509 19.96 21.4209C19.14 22.2009 17.84 22.1909 17.02 21.4209C15.89 20.3509 14.6 18.6309 15.07 16.6009Z'
        stroke={isActive}
        strokeWidth='1.5'
      />
      <path
        d='M11.9997 5H14.6797C16.5297 5 17.3897 7.29 15.9997 8.51L8.0097 15.5C6.6197 16.71 7.4797 19 9.3197 19H11.9997'
        stroke={isActive}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.48573 5.5H5.49728'
        stroke={isActive}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M18.4857 17.5H18.4973'
        stroke={isActive}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
