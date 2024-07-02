import React from 'react'
import { Link } from 'react-router-dom'
import { Marker, Popup } from 'react-leaflet'
import './pin.scss'

function Pin({item}) {
    let position = [item.latitude, item.longitude]
  return (
    <Marker position={position}>
      <Popup>
        <div className="popupContainer">
            <img src={item.img} alt="" />
            <div className="textContainer">
                <Link to={`/${item.id}`}>{item.title}</Link>
                <span>{item.bedroom} bedroom</span>
                <b>Rs {item.price}</b>
            </div>
        </div>

      </Popup>
    </Marker>
  )
}

export default Pin