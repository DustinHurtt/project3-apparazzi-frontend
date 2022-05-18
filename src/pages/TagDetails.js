import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../authService/baseUrl";  
import Photo from "../components/Photo";
// import { LatLng } from "leaflet";
import L from "leaflet"
import { MapContainer, useMap } from 'react-leaflet'
import { Component, Fragment } from 'react';
import {  TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Link } from "react-router-dom";
// import Map from './components/Map'

let gpsConvert = (gpsStr) => {
    var gpsToLonLatRegex = /[-]{0,1}[\d.]*[\d]|([NSEW])+/g;
    var gpsParsed = gpsStr.match(gpsToLonLatRegex);
    // console.log(gpsStr.match(gpsToLonLatRegex));

    var gpsParsedObj = {
      coordinate: {
        degree: gpsParsed[0],
        minute: gpsParsed[1],
        second: gpsParsed[2],
        direction: gpsParsed[3],
      },
    };

    var gpsToLonLat = function (o) {
      var n = NaN;
      if (o) {
        var t = Number(o.degree),
          d = "undefined" != typeof o.minute ? Number(o.minute) / 60 : 0,
          l = "undefined" != typeof o.second ? Number(o.second) / 3600 : 0,
          r = o.direction || null;
        null !== r && /[SW]/i.test(r) && (t = -1 * Math.abs(t));
        
         n = 0 > t ? t - d - l : t + d + l;
      }
      return n;
    };

    let integer = Number([gpsToLonLat(gpsParsedObj.coordinate)])

    return integer;
  };

const TagDetails = () => {

    const [photos, setPhotos] = useState([]);
    // const [spot, setSpots] = useState([])
    const [map, setMap] = useState({
        lat: 37.7749,
        lng: -122.4194,
        zoom: 13
    })
    const params = useParams()

    useEffect(() => {
        fetchPhotos();
    }, []);
  
    const fetchPhotos = () => {
        axios
          .get(
              baseUrl +
            `/photos/${params.id}/tag`
  
          )
          .then((res) => {
            setPhotos(res.data.photos);
            // console.log("resData", res.data.photos)
  
          })
          .catch((err) => console.log(err));
      };



    //   let gpsConvert = (gpsStr) => {
    //     var gpsToLonLatRegex = /[-]{0,1}[\d.]*[\d]|([NSEW])+/g;
    //     var gpsParsed = gpsStr.match(gpsToLonLatRegex);
    //     console.log(gpsStr.match(gpsToLonLatRegex));

    //     var gpsParsedObj = {
    //       coordinate: {
    //         degree: gpsParsed[0],
    //         minute: gpsParsed[1],
    //         second: gpsParsed[2],
    //         direction: gpsParsed[3],
    //       },
    //     };

    //     var gpsToLonLat = function (o) {
    //       var n = NaN;
    //       if (o) {
    //         var t = Number(o.degree),
    //           d = "undefined" != typeof o.minute ? Number(o.minute) / 60 : 0,
    //           l = "undefined" != typeof o.second ? Number(o.second) / 3600 : 0,
    //           r = o.direction || null;
    //         null !== r && /[SW]/i.test(r) && (t = -1 * Math.abs(t)), (n = 0 > t ? t - d - l : t + d + l);
    //       }
    //       return n;
    //     };

    //     return Number([gpsToLonLat(gpsParsedObj.coordinate)]);
    //   };

    //   console.log(gpsConvert(`40 deg 21' 21.60" N`));
    

    // const myMap = L.map('mapid', {
    //     center: [37.7749, -122.4194],
    //      zoom: 13
    //    })
    
    //    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', { 
    //     attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 18, 
    //     id: 'mapbox/streets-v11', 
    //     accessToken: 'your.mapbox.access.token' }).addTo(myMap);
        

    // const myMap = L.map('map').setView([37.7749, -122.4194], 13);   

    //   console.log(photos)

    return (
      <div>
        <h1>This is TagDetails</h1>

        {/* <div id="mapid"></div> */}
        <div id="mapid">
          <MapContainer
            center={[map.lat, map.lng]}
            zoom={map.zoom}
            style={{ width: "100%", height: "80vh" }}
          >
            <TileLayer
              attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {photos.map((spot) => {
              const point = [
                gpsConvert(spot.latitude),
                gpsConvert(spot.longitude),
              ];
              {/* console.log(                gpsConvert(spot.longitude),
                gpsConvert(spot.latitude)) */}

              return (
                <Marker position={point} key={spot["_id"]}>
                  <Popup>
                    <span>
                    spot
                      {/* ADDRESS: {incident["address"]}, {incident["city"]} -{" "}
                      {incident["zip_code"]} */}
                    </span>
                    <br />
                    <span>
                    <Link to ={`/${spot._id}/details`}>Details</Link>
                    spot
                    {/* BATTALION: {incident["battalion"]} */}
                    </span>
                    <br />
                    <img src={spot.imageUrl} alt="testimage"/>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
          {/* :
               'Data is loading...' */}
        </div>

        <div>
          {photos.map((photo) => {
            return (
              <div key={photo._id}>
                <Photo photo={photo} />
              </div>
            );
          })}
        </div>
      </div>
    );

}

export default TagDetails