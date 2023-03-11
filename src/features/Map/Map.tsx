import { FC, ReactNode, useState, useCallback, useEffect } from 'react'
import { GoogleMap, OverlayView, useLoadScript } from '@react-google-maps/api'

import PriceGroup from 'components/PriceGroup/PriceGroup'

import { GOOGLE_API_KEY, libraries, defaultOptions } from './constants'

const containerStyle = {
  price: {
    width: '100%',
    height: '783px',
  },
  location: {
    width: '100%',
    height: '543px',
  },
  priceModal: {
    width: '1000px',
    height: '606px',
  },
}

export type MapCoordinates = google.maps.LatLngLiteral

export const toLatLng = (props: MapCoordinates): google.maps.LatLng =>
  new google.maps.LatLng(props)

export interface MarkerProps {
  position: MapCoordinates
  component: ReactNode
}

interface MapProps {
  type?: 'price' | 'location' | 'priceModal'
  zoom?: number
  markers?: MarkerProps[]
  center?: MapCoordinates
  className?: string
}

const defaultCenter: MapCoordinates = {
  lat: 45.755,
  lng: 8.523,
}

export const Map: FC<MapProps> = ({
  type = 'location',
  markers,
  center,
  className,
  zoom,
}) => {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  })

  useEffect(() => {
    window.google = window.google || {}
  }, [])

  const [mapReact, setMapReact] = useState<any>(null) // TODO Isn't it unused? fix 'any' on page
  const onLoad = useCallback((currentMap: any) => {
    setMapReact(currentMap)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMapReact(null)
  }, [])

  return (
    <div className={className}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle[type]}
          center={center || defaultCenter}
          options={defaultOptions[type]}
          zoom={zoom || 1.5}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {markers?.map((item, index) => {
            return (
              <OverlayView
                key={index}
                position={toLatLng(item.position)}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >
                <>
                  {item.component}
                </>
              </OverlayView>
            )
          })}
        </GoogleMap>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  )
}
