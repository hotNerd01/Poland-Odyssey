import React, { useRef, useEffect } from "react";
import maplibregl from "maplibre-gl";
import placesData from "../../data/places.json";
import appStore from "../../store/appStore";

const MapContainer = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const openSidebar = appStore((state) => state.openSidebar);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/streets-v2/style.json?key=qouYd4hDXkrIIxMJOXH8",
      center: [19.1451, 51.9194],
      zoom: 6,
    });

    map.current.on("load", () => {
      placesData.forEach((place) => {
        const el = document.createElement("div");
        el.className = "marker-container";

        const pin = document.createElement("div");
        pin.className = "map-marker";
        el.appendChild(pin);

        new maplibregl.Marker({
          element: el,
          anchor: "center", // Align the center of the circle to the coordinate
        })
          .setLngLat(place.coordinates)
          .addTo(map.current);

        el.addEventListener("click", () => {
          map.current.flyTo({ center: place.coordinates, zoom: 10 });
          openSidebar(place.id);
        });
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [openSidebar]);

  return <div ref={mapContainer} className="absolute inset-0 w-full h-full" />;
};

export default MapContainer;
