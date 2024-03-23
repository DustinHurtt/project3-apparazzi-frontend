import { post } from "./authService";

const errorHandler = (err) => {
  throw err;
};

export const uploadProfilePhoto = (file) => {
  
  return post("/users/edit-profile-with-picture", file)
    .then((res) => res.data)

    .catch(errorHandler);
};

export const uploadNewPhoto = (file) => {
  return post("/photos/new-photo", file)
    .then((res) => res.data)
    .catch(errorHandler);
};
