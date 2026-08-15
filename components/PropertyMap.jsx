"use client";
import { useEffect, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map, { Marker } from "react-map-gl/maplibre";
import Image from "next/image";
import pin from "@/assets/images/pin.svg";
import Spinner from "./Spinner";

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  const LOCATIONIQ_TOKEN = process.env.NEXT_PUBLIC_LOCATIONIQ_TOKEN;
 

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const address = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`;
        const encodedAddress = encodeURIComponent(address);

        // LocationIQ geocoding endpoint
        const url = `https://us1.locationiq.com/v1/search?key=${LOCATIONIQ_TOKEN}&q=${encodedAddress}&format=json`;
        const res = await fetch(url);
        const data = await res.json();

        if (!data || data.length === 0) {
          setGeocodeError(true);
          setLoading(false);
          return;
        }

        const { lat, lon } = data[0];
        setLat(parseFloat(lat));
        setLng(parseFloat(lon));
        setLoading(false);
      } catch (error) {
        console.error("Geocoding error:", error);
        setGeocodeError(true);
        setLoading(false);
      }
    };

    fetchCoords();
  }, [property]);

  if (loading) return <Spinner loading={loading} />;
  if (geocodeError)
    return <div className="text-xl">No location data found</div>;

  return (
    !loading && (
      <Map
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{ width: "100%", height: 500 }}
        mapStyle={`https://api.maptiler.com/maps/streets-v4/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
