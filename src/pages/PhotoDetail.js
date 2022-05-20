import React from "react";  
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../authService/baseUrl";
import {post, get} from "../authService/authService"
import { useNavigate } from "react-router-dom";
import {convertGPS} from "../authService/convertGPS"
import { MapContainer, useMap } from 'react-leaflet'
import { Component, Fragment } from 'react';
import {  TileLayer, Marker, Popup } from 'react-leaflet'
import TheseTags from "../components/TheseTags";
import { Link } from "react-router-dom";
import L from "leaflet"


import Photo from "../components/Photo";


const PhotoDetails = () => {

    let myIcon = L.icon({
        iconUrl: require("../AppStar.png"),
        iconSize: [36, 36],
        iconAnchor: [18, 18]
    })

    const [photo, setPhoto] = useState({});
    const [comment, setComment] = useState({
        comment: ""
    })
    const [map, setMap] = useState({
        lat: "",
        lng: "",
        zoom: 13
    })

    // convertGPS(photo.latitude),
    // convertGPS(photo.longitude),

    // console.log(photo)

    const params = useParams()

    const navigate = useNavigate()

    let id = localStorage.getItem('id')
    console.log("ID???", id)

    useEffect(() => {
        fetchPhoto();
    }, []);
  
    const fetchPhoto = () => {
        get(`/photos/${params.id}/details`)
        
          .then((res) => {
            setPhoto(res.data.result);
            console.log("DATA!!!", res.data)
  
          })
          .catch((err) => console.log(err));
      };

    const deletePhoto = () =>
        {
        post(`/photos/${params.id}/delete`)
        .then((res) => {
            navigate("/profile")

            console.log(res.data)
  
          })
          .catch((err) => console.log(err));
      };

    //   "/review/{{foundRoom._id}}/add-review"

    function update(newComment) {


            post(`/comments/${params.id}/add-comment`, newComment )
            .then ((results)=>{
                fetchPhoto()
                console.log(results.data)
                // setPhoto({...photo, comments: photo.comments.concat(results.data)}) })
            })
            .catch(error => {
              console.error('There was an error!', error);
            })
        // }
    }
    
    const handleChange = (e) => {
        setComment({ ...comment, [e.target.name]: e.target.value });
      };

    const handleSubmit = (e) => {
        // console.log("this");
        e.preventDefault();
        // console.log("falsy", removeFalsy(updatedUser))
        
        update(comment);
        setComment({
            comment: ""
        });
      };
    //   console.log("LAT", photo)

    //   const point = [
    //     convertGPS(photo.latitude),
    //     convertGPS(photo.longitude),
    //   ]

    

console.log("Contributor", photo.contributor)
    return (
      <div className="detailContainer">
        <div className="photoDetailContainer">
          <Photo
            photo={photo}
            className={"detailPhoto"}
            altClassName={"altClassName"}
          />
        </div>

        <div className="detailContent">
          {/* <p>{photo.tags}</p> */}

          <div className="deleteButton">
            {photo.contributor && id === photo.contributor._id && (
              <button onClick={deletePhoto}>Delete Photo</button>
            )}
          </div>

          <br />

          <div className="commentsBlock">
            <p>{photo.description}</p>

            <br />

            <div>
              <form>
                {/* <label>New Comment</label> */}
                <input
                  onChange={handleChange}
                  type="text"
                  name="comment"
                  value={comment.comment}
                ></input>

                <button onClick={handleSubmit} type="button">
                  Add Comment
                </button>
              </form>
            </div>

            <br />

            <h4>Comments: </h4>
            {/* <br/> */}

            {photo.comments &&
              photo.comments.map((comment) => {
                return (
                  <p key={comment._id}>
                    <span style={{ fontWeight: "bold" }}>
                      {comment.user.username}
                    </span>
                    : {comment.comment}{" "}
                  </p>
                );
              })}
          </div>
        </div>

        <div>
          {/* {photo.comments} */}

          {photo.latitude && (
            <div id="mapid">
              <MapContainer
                id={"tagMap"}
                center={[
                  convertGPS(photo.latitude),
                  convertGPS(photo.longitude),
                ]}
                zoom={map.zoom}
                style={{ width: "90%", height: "80vh" }}
                className="mapContainer"
              >
                <TileLayer
                  attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* {photo.map((spot) => {
              const point = [
                convertGPS(spot.latitude),
                convertGPS(spot.longitude),
              ];
              {/* console.log("CONVERTED!!", convertGPS(spot.longitude), gpsConvert(spot.longitude),
                convertGPS(spot.latitude), gpsConvert(spot.latitude))
                console.log("SPOT", spot) */}

                <Marker
                  icon={myIcon}
                  position={[
                    convertGPS(photo.latitude),
                    convertGPS(photo.longitude),
                  ]}
                  key={photo["_id"]}
                >
                  <Popup>
                    <span>
                      <TheseTags photo={photo} />
                      {/* ADDRESS: {incident["address"]}, {incident["city"]} -{" "}
                      {incident["zip_code"]} */}
                    </span>
                    <br />
                    <span>
                      <Link to={`/${photo._id}/details`}>Details</Link>

                      {/* BATTALION: {incident["battalion"]} */}
                    </span>
                    <br />
                    <img
                      src={photo.imageUrl}
                      alt="previewImage"
                      className="previewImage"
                    />
                  </Popup>
                </Marker>
                {/* );
            })} */}
              </MapContainer>
              {/* :
               'Data is loading...' */}
            </div>
          )}
        </div>
      </div>
    );

}

export default PhotoDetails