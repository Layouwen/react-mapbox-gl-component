import { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import * as turf from '@turf/turf'
import { CustomMarkerPortal } from './CustomMarker'
import { eventEmitter } from '../utils'

export const Map = () => {
  const [name, setName] = useState('layouwen')
  const mapInstanceRef = useRef<mapboxgl.Map>()
  const markers = useRef<mapboxgl.Marker[]>([])
  const [floor, setFloor] = useState('1')
  const floorRef = useRef('1')
  floorRef.current = floor
  const [renderMarkerList, setRenderMarkerList] = useState<
    {
      id: string
      name: string
      target: Element
      marker: mapboxgl.Marker
    }[]
  >([])
  const counter = useRef<number>(0)

  const onSaveMarker = () => {
    const data = markers.current.map(marker => {
      return marker.getLngLat()
    })
    console.log(JSON.stringify(data))
  }

  const onChangeName = () => {
    let _name = 'avan'
    if (name !== 'layouwen') _name = 'layouwen'

    setName(_name)
    eventEmitter.emit('fuck:updateName', _name)
  }

  useEffect(() => {
    console.log('turf', turf)

    mapboxgl.accessToken = 'pk.eyJ1IjoibGF5b3V3ZW4iLCJhIjoiY2t1bmR0b3M4MmliNjMxdDQweW9yaDJjNyJ9.HuBR7pZ_hqagzwEGOuBROg'

    const mapInstance = new mapboxgl.Map({
      container: 'map',
      // 地图样式 style
      style: 'mapbox://styles/mapbox/streets-v12',
      // 中心点
      center: [113.2580839468693, 23.131364780130795],
      // 放大指数
      zoom: 18,
      // 倾斜角度
      pitch: 0,
      // 旋转方位 0~180
      bearing: 180,
      // 地图缩小后展示效果
      // | "albers"
      // | "equalEarth"
      // | "equirectangular"
      // | "lambertConformalConic"
      // | "mercator"
      // | "naturalEarth"
      // | "winkelTripel"
      // | "globe";
      projection: {
        name: 'mercator',
      },
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.mapInstance = mapInstance

    mapInstance.on('load', () => {
      console.log('layouwen map load')
    })

    mapInstance.on('click', e => {
      const {
        lngLat: { lng, lat },
      } = e

      console.log('layouwen map click', lng, lat)

      const marker = new mapboxgl.Marker({
        element: document.createElement('div'),
      })
        .setLngLat(e.lngLat)
        .addTo(mapInstance)

      ++counter.current

      // CustomMarkerRender({ target: marker.getElement(), name: 'fuck' })
      setRenderMarkerList(pre => [
        ...pre,
        {
          id: `marker-${counter.current}`,
          name,
          floor: floorRef.current,
          target: marker.getElement(),
          marker: marker,
        },
      ])

      markers.current.push(marker)
    })

    mapInstanceRef.current = mapInstance

    return () => {
      mapInstance.remove()
      mapInstanceRef.current = undefined
    }
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col">
      <div>{name}</div>
      <div>
        <button onClick={onSaveMarker}>保存 marker</button>
        <button onClick={onChangeName}>change name</button>
        <button
          onClick={() => {
            setFloor('1')
          }}
        >
          1 floor
        </button>
        <button
          onClick={() => {
            setFloor('2')
          }}
        >
          2 floor
        </button>
      </div>
      <div id="map" className="flex-grow"></div>
      {renderMarkerList.map(marker => (
        <CustomMarkerPortal floor={marker.floor} key={marker.id} target={marker.target} name={name} id={marker.id} />
      ))}
    </div>
  )
}
