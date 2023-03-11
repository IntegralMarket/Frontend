export const FactoryIcon = (active: boolean) => {
  const isActive = active ? '#002366' : '#C5C7CD'

  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <rect width='24' height='24' fill='url(#pattern0)' />
      <defs>
        <pattern
          id='pattern0'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use xlinkHref='#image0_1080_15403' transform='scale(0.0111111)' />
        </pattern>
        <image
          id='image0_1080_15403'
          width='90'
          height='90'
          xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAACSElEQVR4nO3bvU4UYRTG8edsICQ2UnEHXgE2LMZtvAvQVhMrC0Np6EhILOxtiNwHBnaw2CXxKiy1IbpA5lBsxm4z++7OeWbf2edXz56c/DMZ5iMAIiIiIiIiIiLdYRFDh9djTzl+f2+3do9cZs7SW/SHkkahSRSaRKFJFJpEoUkUmkShSRSaRKFJFJpEoUkUmkShSVoP7cDtOsxsLfR0cftSbvqzdZi50dRC83Lg1mBfy83y5OXz3V/rMpMWOocYUTMBQuhcYkQFroSFziVGdOBQV8X4dDj8uZPym6K4GQyvxxe5z5wl5Ct4iqsfoxdw+2TAK2C5L82rPJN+11H5v7hPF+/6THroVY4ROZMWOocYUTMBQuhcYkQFroSFziVGdOBK46FzicEKXGksdC4x2IErS4fOJUZbgSsL38gXxc3AzY8BDBrcBwC+5zAz/IGlOjMcHnVmNB05amaS5NDmdhmxSNe1/ilrXSg0iUKTKDSJQpM09mQ4675y1r+Y5X58Kp3RJApNotAkCk2i0CTJb++a+iucu9S3dzqjSRSaRKFJFJpEoUn0rmPB41PpjCZRaBKFJlFoEoUm0buOBeldx4pSaJK5Tv/RaPRkcm+nAA4API1dKROGP17ivIfJx36//7fu8LmeDP892GcD3i6/XYc4ts3wvrStDQDv6g6vvXS4e88cbxpZroPM8drdazvqGk1SG9rMSjecMZbJkcHPzKysO26ua3SvnHyAbd274RCO7eXX64TfgH+D3x21vYiIiIiIiIiICNsj+LWL9vBZdFgAAAAASUVORK5CYII='
        />
      </defs>
    </svg>
  )
}
