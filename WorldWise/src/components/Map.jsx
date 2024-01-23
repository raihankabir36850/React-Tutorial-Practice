//import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useGeolocation } from '../hooks/useGeoLocation';
import { useCities } from '../contexts/CitiesContext';
import Button from './Button';
import styles from './Map.module.css';

// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
export default function Map() {
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const { isLoading: isLoadingGeolocation, position: positionGeolocation, init: getPosition } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([40, 0]);

  const mapLat = searchParams.get('lat');
  const mapLng = searchParams.get('lng');

  useEffect(
    function () {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (positionGeolocation) {
        console.log('run');
        setMapPosition([positionGeolocation.lat, positionGeolocation.lng]);
      }
    },
    [positionGeolocation]
  );

  return (
    <div className={styles.mapContainer}>
      {!positionGeolocation && (
        <Button type='position' onClick={getPosition}>
          {isLoadingGeolocation ? 'Loading' : 'Use your position'}
        </Button>
      )}
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.country}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
