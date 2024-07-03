import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Card, CardBody, Col } from 'reactstrap';
import CardHeaderCommon from '../../../../../CommonElements/CardHeaderCommon/CardHeaderCommon';
import { PolygonsTitle } from '../../../../../utils/Constant';
import { polygonCenter, polygonContainerStyle } from '../../../../../Data/Maps/Maps';

const PolygonsComp = () => {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey:
          "https://maps.googleapis.com/maps/api/js?key=AIzaSyAjeJEPREBQFvAIqDSZliF0WjQrCld-Mh0",
      });
      
      return (
        <Col lg="6" md="12">
          <Card>
            <CardHeaderCommon title={PolygonsTitle} />
            <CardBody>
              <div className="map-js-height">
                <div id="gmap-simple" className="map-block">
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={polygonContainerStyle}
                      center={polygonCenter}
                      zoom={10}
                    ></GoogleMap>
                  ) : (
                    "loading"
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      );
}

export default PolygonsComp