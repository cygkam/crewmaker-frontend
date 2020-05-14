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

function updateUser (userData) {
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
  getAllEvents,
  getComingUserEvents,
  countEventParticipants
};

function countEventParticipants (eventID) {
  return request({
    url: API_BASE_URL + "/counteventsparticipants?eventID=" + eventID,
    method: "GET"
  });
}

function getAllEvents (sportCategoryID, eventDate, eventTime) {
  return request({
    url: API_BASE_URL + "/searchevents?categoryid=" + sportCategoryID + "&eventDate=" + eventDate,
    method: "GET"
  });
}


function getComingUserEvents (username) {
  return request({
    url: API_BASE_URL + "/myevents/" + username,
    method: "GET"
  });
}

const sportCategoryService = {
  getAllSportsCat
};

function getAllSportsCat () {
  return request({
    url: API_BASE_URL + "/sportscategories",
    method: "GET"
  });
}

const participationService = {
  participationExists,
  joinEvent,
};

function joinEvent (eventID) {
  return request({
    url: API_BASE_URL + "/joinevent?eventID=" + eventID,
    method: "GET",
  });
}

function participationExists (eventID) {
  return request({
    url: API_BASE_URL + "/existsparticipation?eventID=" + eventID,
    method: "GET",
  });
}


const eventViewService = {
  getEventInfo,
  getPlaceInfo,
  getParicipants,
};

function getEventInfo (eventID) {
  return request({
    url: API_BASE_URL + "/event?eventId=" + eventID,
    method: "GET",
  });
}

function getPlaceInfo (placeID) {
  return request({
    url: API_BASE_URL + "/placeInfo?placeID=" + placeID,
    method: "GET",
  });
}

function getParicipants (eventID) {
  return request({
    url: API_BASE_URL + "/eventParticipants?eventID=" + eventID,
    method: "GET"
  });
}

const userOpinionService = {
  getOpinions
}

function getOpinions(username) {
  return request({
    url: API_BASE_URL + "/useropinions?username=" + username,
    method: "GET"
  });
}

//Sprawdzic jak exportowac dwa rozne constansy
//export default userService


export { mainProfileService, eventService, sportCategoryService, participationService, eventViewService, userOpinionService };
export default userService;