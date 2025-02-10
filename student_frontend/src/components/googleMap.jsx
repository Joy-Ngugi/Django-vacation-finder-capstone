import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, InfoWindow} from "@react-google-maps/api";
import TailwindSpinner from "./tailwindspinner";
import { useLocation } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "800px",
};

const infoContainerStyle = {
  padding: "20px",
  backgroundColor: "#f1f1f1",
  borderRadius: "8px",
  marginTop: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const center = {
  lat: -0.4255,
  lng: 36.9519,
};

const kenyaBounds = {
  north: 5.0,
  south: -4.7,
  west: 33.5,
  east: 42.0,
};

const GoogleMapComponent = () => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [distanceInfo, setDistanceInfo] = useState(null);
  const [loading, setLoading] = useState(false);  
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const location = useLocation();
  


  
  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/api/places/") 
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching places:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (location.state && location.state.selectedPlaceId) {
      
      if (places.length > 0) {
        const target = places.find(
          (p) => p.id === location.state.selectedPlaceId
        );
        if (target) {
          setSelectedPlace(target);
        }
      }
    }
  }, [location, places]);

  const handleMarkerClick = (place) => {
    if (!place || !place.id) {
      console.error("Missing place ID for:", place);
      alert("Invalid place data. Please check your backend.");
      return;
    }
    setSelectedPlace(place);
    if (navigator.geolocation) {
      setLoading(true); 
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        if (!place.latitude || !place.longitude) {
          alert("Invalid destination coordinates.");
          setLoading(false);  
          return;
        }

        const getDistanceInfo = () => {
          const travelModes = ["TRANSIT", "DRIVING", "WALKING", "BICYCLING"];
          let results = {}; 
          let requestsCompleted = 0
          
        
          travelModes.forEach((mode) =>  {
            const distanceMatrixService = new window.google.maps.DistanceMatrixService();
        
            distanceMatrixService.getDistanceMatrix(
              {
                origins: [userLocation],
                destinations: [{ lat: place.latitude, lng: place.longitude }],
                travelMode: window.google.maps.TravelMode[mode],
                unitSystem: window.google.maps.UnitSystem.METRIC,
              },
              (response, status) => {
                requestsCompleted++;
                if (status === "OK" && response.rows[0].elements[0].status !== "ZERO_RESULTS") {
                  const element = response.rows[0].elements[0];
                  results[mode] = {
                  
                    distance: element.distance.text,
                    duration: element.duration.text,
                    
                  };
                } else {
                  results[mode]= "No route available"
                 
                }
                if (requestsCompleted === travelModes.length) {
                  setDistanceInfo(results);
                  setLoading(false);
              }
            }
            );
          });
        };
        
        

        getDistanceInfo();

    }, (error) => {
      console.error("Geolocation error:", error);
      alert("Failed to retrieve user location.");
      setLoading(false);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};
      




  useEffect(() => {
    if (mapRef.current) {
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      places.forEach((place) => {
        if (!place.latitude || !place.longitude) return;

        const marker = new window.google.maps.Marker({
          position: { lat: place.latitude, lng: place.longitude },
          map: mapRef.current,
          title: place.name,
          label: {
            text: place.name, 
            color: '#1CA9C9', 
            fontSize: '12px', 
            fontWeight: 'bold', 
            fontFamily: 'Arial, sans-serif',
          
          },
        });

        marker.placeId = place.id;
        marker.addListener("click", () => handleMarkerClick(place));

        markersRef.current.push(marker); 
      });
    }
  }, [places]);

  useEffect(() => {
    if (selectedPlace && mapRef.current) {
      mapRef.current.panTo({
        lat: selectedPlace.latitude,
        lng: selectedPlace.longitude,
      });
    }
    if (selectedPlace) {
      markersRef.current.forEach((marker) => {
        if (marker.placeId === selectedPlace.id) {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        } else {
          marker.setAnimation(null);
        }
      });
    }
  }, [selectedPlace]);

  return (
    <>
   
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={8}
        options={{
          mapId: "your_map_id",
          restriction: { latLngBounds: kenyaBounds, strictBounds: true }
        }}
        onLoad={(map) => {
          mapRef.current = map;
          map.setOptions({ restriction: { latLngBounds: kenyaBounds, strictBounds: true } });
        }}
      >
        {selectedPlace && (
          <InfoWindow
            position={{
              lat: selectedPlace.latitude,
              lng: selectedPlace.longitude,
            }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div>
              <h2>{selectedPlace.name}</h2>
            
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    
      {loading && <div><TailwindSpinner /></div>}

    {distanceInfo && (
      <div className="m-5"style={infoContainerStyle}>
        <h3 className="font-bold text-3xl mb-4 text-blue-500">{selectedPlace.name} Route Information</h3>
        <p><strong>Latitude: </strong>{selectedPlace.latitude}</p>
        <p><strong>Longitude:</strong>{selectedPlace.longitude}</p>
        {/* <p>
          <strong>Distance:</strong> {distanceInfo.distance}
        </p> */}
        <p>
          <strong>Estimated Travel Time and distance:</strong>
        </p>
     
        <ul>
      {Object.entries(distanceInfo).map(([mode, info]) => (
        <li key={mode}>
          <strong>{mode}:</strong>{" "}
          {typeof info === "object"
            ? `${info.distance} (${info.duration})`
            : info}
        </li>
      ))}
    </ul>
      </div>
    )}
    </>
  );
};

export default GoogleMapComponent;


