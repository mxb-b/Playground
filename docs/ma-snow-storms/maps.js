/**
 * Massachusetts Snow Storm Explorer - Interactive Maps
 * Leaflet-based snowfall visualization maps
 */

class SnowfallMap {
    constructor() {
        this.map = null;
        this.markers = [];
        this.heatmapLayer = null;
        this.currentStorm = '1978';
        this.showStations = true;
        this.showHeatmap = true;

        this.init();
    }

    init() {
        this.cacheElements();
        this.initMap();
        this.bindEvents();
        this.loadStormData(this.currentStorm);
    }

    cacheElements() {
        this.mapContainer = document.getElementById('snowfall-map');
        this.stormSelect = document.getElementById('map-storm');
        this.stationsToggle = document.getElementById('show-stations');
        this.heatmapToggle = document.getElementById('show-heatmap');
    }

    initMap() {
        if (!this.mapContainer) return;

        // Initialize Leaflet map centered on Massachusetts
        this.map = L.map('snowfall-map', {
            center: [42.2, -71.5],
            zoom: 8,
            scrollWheelZoom: true,
            zoomControl: true
        });

        // Add dark tile layer for winter aesthetic
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(this.map);

        // Add Massachusetts state boundary (simplified polygon)
        const maBoundary = [
            [42.8867, -73.4308], [42.8613, -72.5580], [42.7371, -72.4583],
            [42.7469, -71.2958], [42.6967, -71.1287], [42.8127, -70.8282],
            [42.5639, -70.6477], [42.2488, -70.8862], [41.9855, -70.6477],
            [41.6764, -69.9282], [41.5122, -69.9282], [41.2430, -70.0034],
            [41.3049, -70.2417], [41.4815, -70.7566], [41.4815, -71.1309],
            [41.8987, -71.3804], [42.0170, -71.8042], [42.0269, -72.8127],
            [42.0369, -73.4308], [42.5125, -73.3467], [42.8867, -73.4308]
        ];

        L.polygon(maBoundary, {
            color: '#a8d5e5',
            weight: 2,
            fillColor: '#1a2744',
            fillOpacity: 0.3
        }).addTo(this.map);
    }

    bindEvents() {
        // Storm selection
        this.stormSelect?.addEventListener('change', (e) => {
            this.currentStorm = e.target.value;
            this.loadStormData(this.currentStorm);
        });

        // Layer toggles
        this.stationsToggle?.addEventListener('change', (e) => {
            this.showStations = e.target.checked;
            this.updateLayers();
        });

        this.heatmapToggle?.addEventListener('change', (e) => {
            this.showHeatmap = e.target.checked;
            this.updateLayers();
        });
    }

    loadStormData(year) {
        const data = StormsDatabase.getMapData(year);
        if (!data) return;

        this.clearLayers();
        this.renderStations(data.stations);
        this.renderHeatmap(data.stations);
    }

    clearLayers() {
        // Remove existing markers
        this.markers.forEach(marker => {
            this.map.removeLayer(marker);
        });
        this.markers = [];

        // Remove heatmap circles
        if (this.heatmapLayer) {
            this.map.removeLayer(this.heatmapLayer);
            this.heatmapLayer = null;
        }
    }

    renderStations(stations) {
        if (!this.showStations) return;

        stations.forEach(station => {
            const color = this.getSnowfallColor(station.snowfall);

            // Create custom marker
            const markerHtml = `
                <div class="snowfall-marker" style="background: ${color}; border-color: ${color};">
                    <span class="marker-value">${station.snowfall}"</span>
                </div>
            `;

            const icon = L.divIcon({
                html: markerHtml,
                className: 'custom-snowfall-marker',
                iconSize: [50, 30],
                iconAnchor: [25, 15]
            });

            const marker = L.marker([station.lat, station.lng], { icon })
                .addTo(this.map)
                .bindPopup(`
                    <div class="map-popup">
                        <strong>${station.name}</strong><br>
                        Snowfall: <span style="color: ${color}; font-weight: bold;">${station.snowfall} inches</span>
                    </div>
                `);

            this.markers.push(marker);
        });

        // Add custom marker styles
        this.injectMarkerStyles();
    }

    renderHeatmap(stations) {
        if (!this.showHeatmap) return;

        // Create circle markers for heatmap effect
        this.heatmapLayer = L.layerGroup();

        stations.forEach(station => {
            const color = this.getSnowfallColor(station.snowfall);
            const radius = this.getRadius(station.snowfall);

            // Inner circle
            L.circle([station.lat, station.lng], {
                radius: radius,
                fillColor: color,
                fillOpacity: 0.4,
                color: color,
                weight: 1,
                opacity: 0.6
            }).addTo(this.heatmapLayer);

            // Outer glow
            L.circle([station.lat, station.lng], {
                radius: radius * 1.5,
                fillColor: color,
                fillOpacity: 0.1,
                color: 'transparent',
                weight: 0
            }).addTo(this.heatmapLayer);
        });

        this.heatmapLayer.addTo(this.map);
    }

    getSnowfallColor(inches) {
        if (inches >= 30) return '#0d47a1';
        if (inches >= 24) return '#1565c0';
        if (inches >= 18) return '#1e88e5';
        if (inches >= 12) return '#42a5f5';
        if (inches >= 6) return '#90caf9';
        return '#e3f2fd';
    }

    getRadius(inches) {
        // Radius in meters
        const baseRadius = 8000;
        const scale = Math.min(inches / 20, 2);
        return baseRadius * scale;
    }

    updateLayers() {
        this.clearLayers();
        const data = StormsDatabase.getMapData(this.currentStorm);
        if (!data) return;

        if (this.showHeatmap) {
            this.renderHeatmap(data.stations);
        }
        if (this.showStations) {
            this.renderStations(data.stations);
        }
    }

    injectMarkerStyles() {
        // Check if styles already exist
        if (document.getElementById('map-marker-styles')) return;

        const style = document.createElement('style');
        style.id = 'map-marker-styles';
        style.textContent = `
            .custom-snowfall-marker {
                background: transparent !important;
                border: none !important;
            }

            .snowfall-marker {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 4px 8px;
                border-radius: 4px;
                border: 2px solid;
                font-size: 12px;
                font-weight: 700;
                color: white;
                text-shadow: 0 1px 2px rgba(0,0,0,0.5);
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                white-space: nowrap;
            }

            .map-popup {
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                line-height: 1.5;
            }

            .leaflet-popup-content-wrapper {
                background: #1a2744;
                color: #f8fafc;
                border-radius: 8px;
            }

            .leaflet-popup-tip {
                background: #1a2744;
            }

            .leaflet-popup-close-button {
                color: #a8d5e5 !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Method to programmatically select a storm
    selectStorm(year) {
        this.currentStorm = year.toString();
        if (this.stormSelect) {
            this.stormSelect.value = this.currentStorm;
        }
        this.loadStormData(this.currentStorm);
    }

    // Fit map to show all stations
    fitToStations() {
        const data = StormsDatabase.getMapData(this.currentStorm);
        if (!data || data.stations.length === 0) return;

        const bounds = L.latLngBounds(
            data.stations.map(s => [s.lat, s.lng])
        );

        this.map.fitBounds(bounds, { padding: [50, 50] });
    }
}

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the map container to be properly sized
    setTimeout(() => {
        window.snowfallMap = new SnowfallMap();
    }, 100);
});
