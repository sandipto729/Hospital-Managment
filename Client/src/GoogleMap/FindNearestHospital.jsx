import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  width: "80vw",
  height: "100vh",
};

const NearbyHospitals = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  // Get the user's current position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => alert("Could not retrieve location")
    );
  }, []);

  // Fetch nearby hospitals once the current position is set
  useEffect(() => {
    if (currentPosition && window.google) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      const request = {
        location: new window.google.maps.LatLng(currentPosition.lat, currentPosition.lng),
        radius: 20000, // Search within a 20km radius
        type: ["hospital", "school"], // Search for both hospitals and schools
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setHospitals(results);
        } else {
          console.error("Places API error:", status);
        }
      });
    }
  }, [currentPosition]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={14}
      center={currentPosition}
    >
      {currentPosition && hospitals.length > 0 && (
        <div>
          {/* Render hospital markers */}
          {hospitals.map((hospital, index) => (
            <div key={index}>
              <p>{hospital.name}</p>
            </div>
          ))}
        </div>
      )}
    </GoogleMap>
  );
};

export default NearbyHospitals;


// AIzaSyAz4i1sQTqFufcnO1mnAZ0gRCwvdn_i0RM