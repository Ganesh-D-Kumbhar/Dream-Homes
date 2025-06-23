import React from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import './map.css'
import 'leaflet/dist/leaflet.css'
import Pin from '../pin/Pin'
function Map({items}) {
  return (
    <MapContainer center={[17.4287, 74.9383]} zoom={12} 
    scrollWheelZoom={false} className='map'>
        <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map(item =>(
       <Pin item = {item} key={item.id}/>
    ))}
    </MapContainer>
  )
}
export default Map