import { ACCESS_TOKEN, API_BASE_URL } from '../constants'

const userService = {
  login,
  signup,
  checkUsernameAvailability,
  checkEmailAvailability,
  getCurrentUser,
  getUserProfile,
  getUserProfileImage,
  getUserProfileImageSmall,
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

function getUserProfileImage (username) {
  return request({
    url: API_BASE_URL + "/usersProfileImage/" + username,
    method: "GET",
  });
}

function getUserProfileImageSmall(username) {
  return request({
    url: API_BASE_URL + "/usersProfileImageSmall/" + username,
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

function newEvent (newEventRequest) {
  return request({
    url: API_BASE_URL + "/newEvent",
    method: "POST",
    body: JSON.stringify(newEventRequest),
  });
}

function updateEvent (eventUpdate) {
  console.log(eventUpdate);
  return request({
    url: API_BASE_URL + "/updateEvent",
    method: "POST",
    body: JSON.stringify(eventUpdate),
  });
}

function cancelEvent (eventID) {
  return request({
    url: API_BASE_URL + "/cancelEvent/" + eventID,
    method: "POST",
  });
}

const eventService = {
  getAllEvents,
  getComingUserEvents,
  countEventParticipants,
  newEvent,
  getEventPlaceImage,
  cancelEvent,
  updateEvent
};

function getEventPlaceImage(eventPlaceID) {
  return request({
    url: API_BASE_URL + "/eventPlaceImage/" + eventPlaceID,
    method: "GET",
  });
}

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

function getSportCategoriesForPlace (eventPlaceID) {
  return request({
    url: API_BASE_URL + "/sportscategoriesplaces?eventPlaceID=" + eventPlaceID,
    method: "GET"
  });
}

const sportCategoryService = {
  getAllSportsCat,
  getSportCategoriesForPlace
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
  leaveEvent
};

function joinEvent (eventID) {
  return request({
    url: API_BASE_URL + "/joinevent?eventID=" + eventID,
    method: "GET",
  });
}

function leaveEvent (eventID) {
  return request({
    url: API_BASE_URL + "/leaveevent?eventID=" + eventID,
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
  getOpinions,
  getOpinion,
  newUserOpinion
}

function getOpinion (username, currentUser) {
  return request({
    url: API_BASE_URL + "/useropinion?username=" + username + "&currentUser=" + currentUser,
    method: "GET"
  });
}

function getEventPlaces (sportCategoryId, eventCity) {
  return request({
    url: API_BASE_URL + "/eventPlacesByCategoryAndCity?sportCategoryId=" + sportCategoryId + "&eventCity=" + eventCity,
    method: "GET"
  });
}

function getOpinions (username, currentUser) {
  return request({
    url: API_BASE_URL + "/useropinions?username=" + username + "&currentUser=" + currentUser,
    method: "GET"
  });
}

function getCyclics () {
  return request({
    url: API_BASE_URL + "/cyclics",
    method: "GET"
  });
}

function newUserOpinion (newUserOpinionRequest) {
  return request({
    url: API_BASE_URL + "/newUserOpinion",
    method: "POST",
    body: JSON.stringify(newUserOpinionRequest)
  });
}

const eventPlaceService = {
  newEventPlace,
  getEventPlace,
  acceptEventPlace,
  archiveEventPlace,
  getEventPlaces,
  getCyclics,
  counteventPlaceEventsCount,
  getEventPlaceById
};

function getEventPlaceById (eventPlaceId) {
  return request({
    url: API_BASE_URL + "/eventPlace?eventPlaceID=",
    method: "GET"
  });
}

function newEventPlace (newEventPlaceRequest) {
  return request({
    url: API_BASE_URL + "/newEventPlace",
    method: "POST",
    body: JSON.stringify(newEventPlaceRequest),
  });
}

function counteventPlaceEventsCount(eventPlaceID) {
  return request({
    url: API_BASE_URL + "/countEventPlaceEvents?eventPlaceID=" + eventPlaceID,
    method: "GET",
  });
}


function getEventPlace (activePage, size, filtering, sorting, city) {
  return request({
    url:
      API_BASE_URL +
      "/getEventPlace?activePage=" +
      activePage +
      "&size=" +
      size +
      "&filtering=" +
      filtering +
      "&sorting=" +
      sorting +
      "&city=" +
        city,
    method: "GET",
  });
}

function acceptEventPlace (eventPlaceID) {
  return request({
    url: API_BASE_URL + "/acceptEventPlace?eventPlaceID=" + eventPlaceID,
    method: "GET",
  });
}


function archiveEventPlace (eventPlaceID, currentArchiveStatus) {
  return request({
    url: API_BASE_URL + "/archiveEventPlace?eventPlaceID=" +
      eventPlaceID +
      "&currentArchiveStatus=" +
      currentArchiveStatus,
    method: "GET",
  });
}

const eventPlaceOpinionService = {
  sendEventPlaceOpinion,
  getEventPlaceOpinion,
  getEventPlaceOpinions
}

function getEventPlaceOpinions(eventPlaceID) {
  return request({
    url: API_BASE_URL + "/getEventPlaceOpinions?eventPlaceID=" + eventPlaceID,
    method: "GET",
  });
}

function getEventPlaceOpinion(eventPlaceID, currentUser) {
  return request({
    url:
      API_BASE_URL +
      "/eventOpinion?eventPlaceID=" +
      eventPlaceID +
      "&currentUser=" +
      currentUser,
    method: "GET",
  });
}


function sendEventPlaceOpinion (eventPlaceOpinion) {
  return request({
    url: API_BASE_URL + "/addEventPlaceOpinion",
    method: "POST",
    body: JSON.stringify(eventPlaceOpinion)
  })
}

export {
  mainProfileService,
  eventService,
  sportCategoryService,
  participationService,
  eventViewService,
  eventPlaceService,
  userOpinionService,
  eventPlaceOpinionService,
};

export default userService;