import Map from 'react-map-gl'

export const ReactMapGlDemo = () => {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoibGF5b3V3ZW4iLCJhIjoiY2t1bmR0b3M4MmliNjMxdDQweW9yaDJjNyJ9.HuBR7pZ_hqagzwEGOuBROg"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  )
}
