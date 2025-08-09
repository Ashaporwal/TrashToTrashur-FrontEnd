const BASE_URL = "https://trashtotrashur-backend.onrender.com";

export default {
  SIGN_UP: BASE_URL + "/user/signup",
  SIGN_IN: BASE_URL + "/user/login",
  CREATE_TUTORIAL:BASE_URL + "/tutorial/create",
    // UPLOAD_FILE: BASE_URL+"/user/profile",
  GET_TUTORIALS :BASE_URL+"/user/tutorial",
  //  UPLOAD_FILE: "http://localhost:3000/api/uploadFile"
    UPLOAD_FILE: `${BASE_URL}/user/uploadFile`
};