// Used this 
// https://blog.logrocket.com/a-practical-guide-to-integrating-google-maps-in-react/


import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'
import googleMapsSecret from './../../secrets/googleMaps';

import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )


// const location = {
//     address: '1600 Amphitheatre Parkway, Mountain View, california.',
//     lat: 37.42216,
//     lng: -122.08427,
//   }

  const Map = ({ location, zoomLevel }) => (
    <div className="map">
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleMapsSecret.key }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.text}
          />
        </GoogleMapReact>
      </div>
    </div>
  )


  export default Map