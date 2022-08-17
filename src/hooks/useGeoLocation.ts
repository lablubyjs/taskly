import { useState, useEffect } from 'react'

export const useGeoLocation = (): Location.State => {
  const [location, setLocation] = useState<Location.State>({
    loaded: false,
  })

  const onSuccess = (location: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        latitude: `${location.coords.latitude}`,
        longitude: `${location.coords.longitude}`,
      },
    })
  }

  const onError = (error: any) => {
    setLocation({
      loaded: true,
      error: {
        code: error.code,
        message: error.message,
      },
    })
  }

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      })
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  return location
}

namespace Location {
  export type State = {
    loaded: boolean
    coordinates?: {
      latitude: string
      longitude: string
    }
    error?: {
      code: string
      message: string
    }
  }
}
