import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
const containerStyle = {
  height: "250px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};
const CountriesMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q&v=3.exp&libraries=geometry,drawing,places",
});
  return (
    <div className="map">
      <div className="map-js-height">
        <div id="gmap-simple" className="map-block">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
            />
          ) : (
            "Loading"
          )}
        </div>
      </div>
    </div>
  );
};

export default CountriesMap;
