import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Search, Navigation } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 28.6139,
  lng: 77.2090
};

const MapView = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  const [map, setMap] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [booths, setBooths] = useState([
    { id: 1, name: "St. Stephens School Booth", lat: 28.6200, lng: 77.2100, type: 'booth', address: 'B-Block, Connaught Place' },
    { id: 2, name: "Central Election HQ", lat: 28.6100, lng: 77.2000, type: 'office', address: 'Ashoka Road, New Delhi' },
    { id: 3, name: "Modern Public School Booth", lat: 28.6150, lng: 77.2150, type: 'booth', address: 'Sector 4, New Delhi' },
    { id: 4, name: "Community Center Booth #12", lat: 28.6050, lng: 77.2050, type: 'booth', address: 'Rajpath Area' },
    { id: 5, name: "District Election Office", lat: 28.6250, lng: 77.1950, type: 'office', address: 'Pusa Road, New Delhi' },
    { id: 6, name: "Railway Colony Primary School", lat: 28.6180, lng: 77.2020, type: 'booth', address: 'Railway Colony' },
  ]);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    }
  }, []);

  if (!isLoaded) return <div className="h-[500px] flex items-center justify-center glass-card">Loading Maps...</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search by area or pincode..." 
            className="input-field pl-12"
          />
        </div>
        <button 
          onClick={() => userLocation && map.panTo(userLocation)}
          className="btn-primary flex items-center gap-2 whitespace-nowrap"
        >
          <Navigation className="w-5 h-5" /> My Location
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation || center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {userLocation && (
            <Marker 
              position={userLocation} 
              label="You"
            />
          )}

          {booths.map(booth => (
            <Marker
              key={booth.id}
              position={{ lat: booth.lat, lng: booth.lng }}
              onClick={() => setSelectedBooth(booth)}
              icon={booth.type === 'office' ? "https://maps.google.com/mapfiles/ms/icons/blue-dot.png" : "https://maps.google.com/mapfiles/ms/icons/red-dot.png"}
            />
          ))}

          {selectedBooth && (
            <InfoWindow
              position={{ lat: selectedBooth.lat, lng: selectedBooth.lng }}
              onCloseClick={() => setSelectedBooth(null)}
            >
              <div className="p-2 text-slate-900 max-w-[200px]">
                <h3 className="font-bold text-base border-b border-slate-200 pb-1 mb-2">{selectedBooth.name}</h3>
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider mb-1">
                    Type: {selectedBooth.type === 'office' ? 'Election Office' : 'Polling Booth'}
                </p>
                <p className="text-sm text-slate-800">{selectedBooth.address}</p>
                <button className="w-full mt-3 py-2 bg-primary-600 text-white rounded-lg font-bold text-xs hover:bg-primary-700 transition-colors">
                    Get Directions
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapView;
