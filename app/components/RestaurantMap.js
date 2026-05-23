'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function RestaurantMap() {
  const mapRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current || !mapRef.current) return;
    initializedRef.current = true;

    const restaurantCoordinates = [40.7191186, -73.9916931];

    const map = L.map(mapRef.current, {
      center: restaurantCoordinates,
      zoom: 16,
      scrollWheelZoom: false,
      dragging: !L.Browser.mobile,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map);

    const customGoldIcon = L.divIcon({
      className: 'custom-map-marker',
      html: `<div style="
          width: 20px; 
          height: 20px; 
          background-color: #d4af37; 
          border: 2px solid #fdfbf7; 
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(212,175,55,0.7);
          animation: pulseMarker 2s infinite ease-in-out;
      "></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    // Add Keyframe styles
    const styleId = 'pulse-marker-keyframes';
    if (!document.getElementById(styleId)) {
      const styleSheet = document.createElement("style");
      styleSheet.id = styleId;
      styleSheet.innerText = `
          @keyframes pulseMarker {
              0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
              70% { transform: scale(1.15); box-shadow: 0 0 0 8px rgba(212, 175, 55, 0); }
              100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
          }
      `;
      document.head.appendChild(styleSheet);
    }

    const marker = L.marker(restaurantCoordinates, { icon: customGoldIcon }).addTo(map);

    marker.bindPopup(`
        <div style="text-align: center; padding: 4px; color: #fdfbf7;">
            <h4 style="margin: 0 0 4px 0; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 1.25rem;">Bistrot Ha</h4>
            <p style="margin: 0 0 4px 0; font-size: 0.85rem; font-family: 'Inter', sans-serif;">137 Eldridge St, New York, NY 10002</p>
            <p style="margin: 5px 0 0 0; font-weight: 500; color: #d4af37; font-size: 0.85rem; font-family: 'Inter', sans-serif;">Tue &ndash; Sat | 5:30 PM &ndash; 10:30 PM</p>
        </div>
    `).openPopup();

    return () => {
      map.remove();
      initializedRef.current = false;
    };
  }, []);

  return <div ref={mapRef} className="interactive-map" style={{ width: '100%', height: '100%', minHeight: '450px' }} />;
}
