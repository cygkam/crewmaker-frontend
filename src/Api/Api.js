import { ACCESS_TOKEN, API_BASE_URL } from '../constants'

const userService = {
  login,
  signup,
  checkUsernameAvailability,
  checkEmailAvailability,
  getCurrentUser,
  getUserProfile,
};

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000"
  });

  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

function login (loginRequest) {
  return request({
    url: API_BASE_URL + "/auth/signin",
    method: "POST",
    body: JSON.stringify(loginRequest),
  });
}

function signup (signupRequest) {
  return request({
    url: API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest),
  });
}

function checkUsernameAvailability (username) {
  return request({
    url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
    method: "GET",
  });
}

function checkEmailAvailability (email) {
  return request({
    url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
    method: "GET",
  });
}

function getCurrentUser () {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: API_BASE_URL + "/user/me",
    method: "GET",
  });
}

function getUserProfile (username) {
  return request({
    url: API_BASE_URL + "/users/" + username,
    method: "GET",
  });
}

function updateUser(userData) {
  return request({
    url: API_BASE_URL + "/updateUser",
    method: "POST",
    body: JSON.stringify(userData)
  })
}

const mainProfileService = {
  getUserProfileInfo,
  updateUser
};

function getUserProfileInfo (username) {
  return request({
    url: API_BASE_URL + "/userProfile/" + username,
    method: "GET"
  });
}

const eventService = {
  getAllEvents
};

function getAllEvents (sportCategoryID) {
  return request({
    url:API_BASE_URL + "/searchevents?categoryid=" + sportCategoryID,
    method:"GET"
  });
}

const sportCategoryService = {
  getAllSportsCat
};

function getAllSportsCat() {
  return request({
    url:API_BASE_URL + "/sportscategories",
    method:"GET"
  });
}

//Sprawdzic jak exportowac dwa rozne constansy
//export default userService

export { mainProfileService, eventService, sportCategoryService };
export default userService;