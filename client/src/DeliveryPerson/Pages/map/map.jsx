import React, {useRef, useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import NearMeIcon from '@mui/icons-material/NearMe';
import './map.css';
import {useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';

const center = { lat: -1.2884462978770843, lng: 36.8231459108544 }; 
const libraries = ["places"]; 

function RouteCalculator() {

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: "AIzaSyBQxT3xBni2UvXtvfH4nhqKuUVrY5gte1s",
        libraries: libraries,
    })

    const [map, setMap] = useState(/** @type google.maps.Map*/(null))
    const [directionsResponse, setDirectionsResponse] = useState(null)
    const [distance, setDistance] = useState('')
    const [duration, setDuration] = useState('')

    /** @type React.MutableRefObject<HTMLInputElement> */
    const originRef = useRef()

    /** @type React.MutableRefObject<HTMLInputElement> */
    const destinationRef = useRef()
    
    if(!isLoaded){
        return (
        <div className='driverLoader'>
            <img src="https://i.pinimg.com/originals/63/30/4c/63304c0ead674232ee58af3dbc63b464.gif" alt="" className='w-100'/>
        </div>
        )
    }

    async function calculateRoute(){
        if (originRef.current.value === '' || destinationRef.current.value === '') {
            return
        }

        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: originRef.current.value,
            destination: destinationRef.current.value,
            travelMode: google.maps.TravelMode.DRIVING
        })
        setDirectionsResponse(results)
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }
    

  return (
    <div className="route-calculator">
      <div className="map-background-overlay">
        <GoogleMap 
            center={center} 
            zoom={15} 
            mapContainerStyle={{width:'100%', height:'100%'
            
        }}
        onLoad={(map) => setMap(map)}
        >

            <Marker position={center}/>
            {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
            )}
        </GoogleMap>
      </div>
      <div className="map-card">
        <div className="map-input-group">
            <Autocomplete>
                <input type="text" placeholder="Origin" className="map-input" ref={originRef}/>
            </Autocomplete>
            <Autocomplete>
                <input type="text" placeholder="Destination" className="map-input" ref={destinationRef} />
            </Autocomplete>
          <div className="map-button-group">
            <button className="map-button" type="submit" onClick={calculateRoute}>
              Calculate Route
            </button>
            <button className="map-icon-button" aria-label="clear" onClick={clearRoute}>
              <CloseIcon />
            </button>
          </div>
        </div>
        <div className="map-info-group">
          <span>Distance: {distance}</span>
          <span>Duration: {duration}</span>
          <button 
            className="map-icon-button" 
            aria-label="center back" 
            onClick={() => {
              map.panTo(center) 
              map.setZoom(15)
              }}>
            <NearMeIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RouteCalculator;
