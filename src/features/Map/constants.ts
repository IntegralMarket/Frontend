import { priceMapStyles, locationMapStyles } from './Map.style'

export const GOOGLE_API_KEY = 'AIzaSyA76U5Z1ObvZ09b_Qsc-nb-Xx-Mpo_7NoU'

export const containerStyle = {
  width: '100%',
  height: '800px',
}

export const center = {
  lat: 43,
  lng: 52,
}

export const libraries = ['places'] as (
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'places'
  | 'visualization'
)[]

export const defaultOptions = {
  price: {
    // should be the same as priceModal
    styles: priceMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  },
  location: {
    styles: locationMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  },
  priceModal: {
    styles: priceMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  },
}
