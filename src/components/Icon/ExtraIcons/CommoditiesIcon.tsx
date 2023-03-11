export const CommoditiesIcon = (active: boolean) => {
  const isActive = active ? '#002366' : '#C5C7CD'

  return (
    <svg
      width='25'
      height='24'
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.5 12C11.8686 12 11.2372 11.888 10.745 11.6639L3.8075 8.50031C3.49016 8.35594 2.75 7.93359 2.75 7.13625C2.75 6.33891 3.49016 5.9175 3.80844 5.77125L10.8059 2.58047C11.7702 2.13984 13.2252 2.13984 14.1898 2.58047L21.1916 5.77125C21.5098 5.91609 22.25 6.33844 22.25 7.13625C22.25 7.93406 21.5098 8.355 21.1916 8.50078L14.2541 11.6639C13.7628 11.888 13.1314 12 12.5 12Z'
        fill={isActive}
        fillOpacity='0.4'
      />
      <path
        d='M21.1887 10.6317L20.4814 10.3125L18.6641 11.1441L14.2578 13.1597C13.7656 13.3847 13.1328 13.4967 12.5028 13.4967C11.8728 13.4967 11.2405 13.3847 10.7487 13.1597L6.33922 11.1441L4.52141 10.3125L3.80797 10.6331C3.49016 10.778 2.75 11.2031 2.75 12C2.75 12.7969 3.49016 13.2225 3.8075 13.3673L10.745 16.5375C11.2344 16.7625 11.8667 16.875 12.5 16.875C13.1333 16.875 13.7628 16.7625 14.255 16.538L21.1864 13.3688C21.5056 13.2239 22.25 12.8011 22.25 12C22.25 11.1989 21.5108 10.778 21.1887 10.6317Z'
        fill={isActive}
        fillOpacity='0.7'
      />
      <path
        d='M21.1887 15.5062L20.4814 15.1875L18.6641 16.0186L14.2578 18.0319C13.7656 18.2559 13.1328 18.3684 12.5028 18.3684C11.8728 18.3684 11.2405 18.2564 10.7487 18.0319L6.33922 16.0162L4.52141 15.1875L3.80797 15.5081C3.49016 15.653 2.75 16.0781 2.75 16.875C2.75 17.6719 3.49016 18.097 3.8075 18.2414L10.745 21.4097C11.2344 21.6337 11.8691 21.75 12.5 21.75C13.1309 21.75 13.76 21.6338 14.2522 21.4092L21.1859 18.2419C21.5056 18.0975 22.25 17.6747 22.25 16.875C22.25 16.0753 21.5108 15.653 21.1887 15.5062Z'
        fill={isActive}
      />
    </svg>
  )
}