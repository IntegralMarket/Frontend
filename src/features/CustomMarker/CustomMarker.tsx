import { FC } from 'react'
import cn from 'classnames'

import s from './CustomMarker.module.scss'

interface CustomMarkerProps {
  id: number
  onClick: (id: number) => void
  active?: boolean
}

export const CustomMarker: FC<CustomMarkerProps> = ({
  id,
  onClick,
  active = false,
}) => {
  const handleClick = () => onClick(id)

  return (
    <div className={s.point} onClick={handleClick}>
      <div className={cn(s.marker, { [s.active]: active })}>
        <svg
          width={active ? '36' : '24'}
          height={active ? '48' : '32'}
          viewBox='0 0 23 32'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M 11.25 13.75 C 12.49 13.75 13.5 12.74 13.5 11.5 C 13.5 10.26 12.49 9.25 11.25 9.25 C 10.01 9.25 9 10.26 9 11.5 C 9 12.74 10.01 13.75 11.25 13.75 Z'
            fill={active ? '#ef2b23' : '#29baf0'}
          />
          <path
            d='M 11.25 0.25 C 5.05 0.25 0 5.08 0 11.01 C 0 13.83 1.29 17.59 3.83 22.17 C 5.87 25.85 8.22 29.18 9.45 30.84 C 9.66 31.12 9.93 31.35 10.24 31.51 C 10.55 31.67 10.9 31.75 11.25 31.75 C 11.6 31.75 11.95 31.67 12.26 31.51 C 12.57 31.35 12.85 31.12 13.05 30.84 C 14.28 29.18 16.64 25.85 18.68 22.17 C 21.21 17.59 22.5 13.83 22.5 11.01 C 22.5 5.08 17.45 0.25 11.25 0.25 Z M 11.25 16 C 10.36 16 9.49 15.74 8.75 15.24 C 8.01 14.75 7.43 14.04 7.09 13.22 C 6.75 12.4 6.66 11.49 6.84 10.62 C 7.01 9.75 7.44 8.95 8.07 8.32 C 8.7 7.69 9.5 7.26 10.37 7.09 C 11.24 6.91 12.15 7 12.97 7.34 C 13.79 7.68 14.5 8.26 14.99 9 C 15.49 9.74 15.75 10.61 15.75 11.5 C 15.75 12.69 15.27 13.84 14.43 14.68 C 13.59 15.52 12.44 16 11.25 16 Z'
            fill={active ? '#ef2b23' : '#29baf0'}
          />
        </svg>
      </div>
    </div>
  )
}
