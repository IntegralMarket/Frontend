import { FeatureType, StyleOption } from 'shared/types/googleMapApi'

const color_location_water = '#f3f5f8'
const color_location_land = '#002366'
const color_price_water = '#BED5DE'
const color_price_land = '#F8F5F3'

const addStyle = ({
  featureType,
  elementType,
  stylers,
}: StyleOption): StyleOption => {
  return {
    featureType,
    elementType,
    stylers,
  }
}

const addFill = (featureType: FeatureType, color: string): StyleOption => {
  return {
    featureType,
    elementType: 'geometry.fill',
    stylers: [
      {
        color,
      },
    ],
  }
}

const hideStroke = (featureType: FeatureType): StyleOption => {
  return {
    featureType,
    elementType: 'geometry.stroke',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  }
}

const hide = (featureType: FeatureType): StyleOption => {
  return {
    featureType,
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  }
}

const hideLabels = (featureType: FeatureType): StyleOption => {
  return {
    featureType,
    elementType: 'labels',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  }
}

export const priceMapStyles = [
  addFill('landscape', color_price_land),
  addFill('water', color_price_water),
  hideLabels('water'),

  hideStroke('administrative.province'),
  hideLabels('administrative.province'),
  hideLabels('administrative.locality'),
  hide('poi'),

  hide('road.highway'),
  hide('road.highway.controlled_access'),
  hide('road.local'),
  hideLabels('road'),

  hide('transit'),
]

export const locationMapStyles = [
  addFill('landscape', color_location_land),
  addFill('water', color_location_water),
  hideLabels('water'),

  hideStroke('administrative.province'),
  hideLabels('administrative'),

  hide('poi'),

  hide('road.highway'),
  hide('road.highway.controlled_access'),
  hide('road.local'),
  hideLabels('road'),

  hide('transit'),
]
