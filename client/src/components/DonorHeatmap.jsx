import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function DonorHeatmap({
  locations,
}) {
  return (
    <MapContainer
      center={[
        13.0827,
        80.2707,
      ]}
      zoom={10}
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {locations?.map(
        (location) => (
          <Marker
            key={
              location.location
            }
            position={[
              location.lat,
              location.lng,
            ]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">
                  📍{" "}
                  {
                    location.location
                  }
                </h3>

                <p>
                  Donors:
                  {" "}
                  {
                    location.count
                  }
                </p>
              </div>
            </Popup>
          </Marker>
        )
      )}
    </MapContainer>
  );
}

export default DonorHeatmap;