'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Leaflet with Next.js
const fixLeafletIcon = () => {
  // Only run on the client side
  if (typeof window !== 'undefined') {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }
};

interface MapComponentProps {
  latitude: number;
  longitude: number;
  title: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude, title }) => {
  useEffect(() => {
    // Fix the icon issue
    fixLeafletIcon();
  }, []);

  if (typeof window === 'undefined') {
    return <div style={{ height: '400px', width: '100%', background: '#f0f0f0' }}>Loading map...</div>;
  }

  return (
    <MapContainer 
      key={`${latitude}-${longitude}`}
      center={[latitude, longitude]} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          {title}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent; 