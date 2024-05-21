import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../authService/baseUrl";
import Photo from "../components/Photo";
import L from "leaflet";
import { MapContainer } from "react-leaflet";
import { TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import { convertGPS } from "../authService/convertGPS";
import TheseTags from "../components/TheseTags";

const AllTags = ({ children, allTags }) => {
    let myIcon = L.icon({
        iconUrl: require("../AppStar.png"),
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
    
      const [photos, setPhotos] = useState([]);
      const [map, setMap] = useState({
        lat: 25.80051750601982,
        lng: -80.19831072619859,
        zoom: 13,
      });
    
      const params = useParams();
    
      const fetchPhotos = () => {
        axios
          .get(baseUrl + `/photos/${params.id}/tag`)
          .then((res) => {
            setPhotos(res.data.photos);
          })
          .catch((err) => console.log(err));
      };
    
      useEffect(() => {
        fetchPhotos();
        window.scrollTo(0, 0);
      }, [allTags, params]);
    
      return (
        <div>
          {/* <p>This is TagDetails</p> */}
    
          <h2>#{params.id}</h2>

          {children}
    
          <div id="mapid">
            <MapContainer
              className="mapContainer"
              id={"tagMap"}
              center={[map.lat, map.lng]}
              zoom={map.zoom}
              style={{ width: "90%", height: "80vh" }}
            >
              <TileLayer
                attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
    
              {photos.map((spot) => {
                const point = [
                  convertGPS(spot.latitude),
                  convertGPS(spot.longitude),
                ];
    
                return (
                  point[0] && (
                    <Marker icon={myIcon} position={point} key={spot["_id"]}>
                      <Popup>
                        <span>
                          <TheseTags photo={spot} />
                        </span>
                        <br />
                        <span>
                          <Link to={`/${spot._id}/details`}>Details</Link>
                        </span>
                        <br />
                        <img
                          src={spot.imageUrl}
                          alt="testimage"
                          className="previewImage"
                        />
                      </Popup>
                    </Marker>
                  )
                );
              })}
            </MapContainer>
          </div>
    
          <div>
            <div className="columnated">
              {[...photos].reverse().map((photo) => {
                return (
                  <div className="direction" key={photo._id}>
                    <Photo photo={photo} className={"imageGroup"} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
}

export default AllTags