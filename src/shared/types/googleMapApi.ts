// https://developers.google.com/maps/documentation/javascript/style-reference

export type FeatureType =
  | 'all'
  | 'administrative'
  | 'administrative.country'
  | 'administrative.land_parcel'
  | 'administrative.locality'
  | 'administrative.neighborhood'
  | 'administrative.province'
  | 'landscape'
  | 'landscape.man_made'
  | 'landscape.natural'
  | 'landscape.natural.landcover'
  | 'landscape.natural.terrain'
  | 'poi'
  | 'poi.attraction'
  | 'poi.business'
  | 'poi.government'
  | 'poi.medical'
  | 'poi.park'
  | 'poi.place_of_worship'
  | 'poi.school'
  | 'poi.sports_complex'
  | 'road'
  | 'road.arterial'
  | 'road.highway'
  | 'road.highway.controlled_access'
  | 'road.local'
  | 'transit'
  | 'transit.line'
  | 'transit.station'
  | 'transit.station.airport'
  | 'transit.station.bus'
  | 'transit.station.rail'
  | 'water'

export type ElementType =
  | 'all'
  | 'geometry'
  | 'geometry.fill'
  | 'geometry.stroke'
  | 'labels'
  | 'labels.icon'
  | 'labels.text'
  | 'labels.text.fill'
  | 'labels.text.stroke'

export type StylerType =
  | 'hue'
  | 'lightness'
  | 'saturation'
  | 'gamma'
  | 'invert_lightness'
  | 'visibility'
  | 'color'
  | 'weight'

export type StyleOption = {
  featureType: FeatureType
  elementType: ElementType
  stylers: {
    [key in StylerType]?: string
  }[]
}
