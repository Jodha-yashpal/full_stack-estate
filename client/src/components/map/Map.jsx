import React from 'react'
import { MapContainer, TileLayer} from 'react-leaflet'
import Pin from '../pin/Pin';
import './map.scss'
import 'leaflet/dist/leaflet.css';


function Map({items}) {
    const position = [items[0].latitude, items[0].longitude]
    const Citycenter = [26.903245, 75.789572]
    console.log(items[0].latitude)
  return (
    <MapContainer center={items.length === 1 ? position : Citycenter} zoom={7} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
        items.map(item => (
            <Pin item={item} key={item.id} />
        ))
    }    
  </MapContainer>
  )
}

export default Map