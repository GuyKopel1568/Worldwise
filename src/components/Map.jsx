import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeolocation";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "./Button";

const flagEmojiToPNG = flag => {
  if (flag === undefined) return;
  var countryCode = Array.from(flag, codeUnit => codeUnit.codePointAt())
    .map(char => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function Map() {
  const { cities } = useCities();
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([
    40.46635901755316,
    -3.7133789062500004
  ]);
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition
  } = useGeolocation();

  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  useEffect(
    function() {
      if (mapLat && mapLng) {
        setMapPosition([mapLat, mapLng]);
      }
    },
    [mapLat, mapLng]
  );

  useEffect(
    function() {
      if (geoLocationPosition) {
        setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
      }
    },
    [geoLocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading...." : "Use your position"}
      </Button>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city =>
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.cityName}
              {flagEmojiToPNG(city.emoji)}
            </Popup>
          </Marker>
        )}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    }
  });
}

export default Map;
