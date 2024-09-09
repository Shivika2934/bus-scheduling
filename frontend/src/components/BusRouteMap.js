import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import bus from './bus.png'; // Make sure this path is correct and that 'bus.png' is in the correct folder

// Define a custom bus stop icon
const busStopIcon = L.icon({
    iconUrl: bus, // Use the imported image
    iconSize: [25, 25], // Size of the icon
    iconAnchor: [12, 24], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -20], // Point from which the popup should open relative to the iconAnchor
});

const BusRouteMap = () => {
    const [geojsonData, setGeojsonData] = useState(null);

    useEffect(() => {
        // Fetch the GeoJSON file from the public directory
        fetch('export.geojson')
            .then(response => response.json())
            .then(data => setGeojsonData(data))
            .catch(error => console.error('Error loading GeoJSON data:', error));
    }, []);

    // Function to handle how each point in the GeoJSON is displayed
    const pointToLayer = (feature, latlng) => {
        if (feature.properties.type === 'bus_stop') {
            return L.marker(latlng, { icon: busStopIcon }); // Use custom icon for bus stops
        }
        return L.marker(latlng); // Default marker for other points
    };

    const onEachFeature = (feature, layer) => {
        if (feature.properties.type === 'bus_stop') {
            layer.bindPopup(`<strong>${feature.properties.name}</strong>`);
        }
    };

    return (
        <MapContainer style={{ height: '500px', width: '100%' }} center={[28.5450182, 77.2015313]} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geojsonData && (
                <GeoJSON
                    data={geojsonData}
                    pointToLayer={pointToLayer} // Use pointToLayer to apply custom icons
                    onEachFeature={onEachFeature}
                />
            )}
        </MapContainer>
    );
};

export default BusRouteMap;
