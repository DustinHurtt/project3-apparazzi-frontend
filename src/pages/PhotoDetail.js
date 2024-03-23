import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { post, get } from "../authService/authService";
import { useNavigate } from "react-router-dom";
import { convertGPS } from "../authService/convertGPS";
import { MapContainer } from "react-leaflet";
import { TileLayer, Marker, Popup } from "react-leaflet";
import TheseTags from "../components/TheseTags";
import { Link } from "react-router-dom";
import L from "leaflet";

import Photo from "../components/Photo";

const PhotoDetails = () => {
  let myIcon = L.icon({
    iconUrl: require("../AppStar.png"),
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  const [photo, setPhoto] = useState({});
  const [comment, setComment] = useState({
    comment: "",
  });
  const [map, setMap] = useState({
    lat: "",
    lng: "",
    zoom: 13,
  });

  const params = useParams();

  const navigate = useNavigate();

  let id = localStorage.getItem("id");

  useEffect(() => {
    fetchPhoto();
  }, []);

  const fetchPhoto = () => {
    get(`/photos/${params.id}/details`)
      .then((res) => {
        console.log("This is the photo", res.data)
        setPhoto(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const deletePhoto = () => {
    post(`/photos/${params.id}/delete`)
      .then((res) => {
        navigate("/profile");
      })
      .catch((err) => console.log(err));
  };

  function update(newComment) {
    post(`/comments/${params.id}/add-comment`, newComment)
      .then((results) => {
        fetchPhoto();
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const handleChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(comment);
    setComment({
      comment: "",
    });
  };

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
        {photo.latitude && (
          <div id="mapid">
            <MapContainer
              id={"tagMap"}
              center={[convertGPS(photo.latitude), convertGPS(photo.longitude)]}
              zoom={map.zoom}
              style={{ width: "90%", height: "80vh" }}
              className="mapContainer"
            >
              <TileLayer
                attribution='&copy <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

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
                  </span>
                  <br />
                  <span>
                    <Link to={`/${photo._id}/details`}>Details</Link>
                  </span>
                  <br />
                  <img
                    src={photo.imageUrl}
                    alt="previewImage"
                    className="previewImage"
                  />
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoDetails;
