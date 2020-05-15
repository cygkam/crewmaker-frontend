import {
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  PHONE_ACCEPTED_LENGTH,
  SURNAME_MAX_LENGTH,
  SURNAME_MIN_LENGTH,
  EVENTPLACE_DESCRIPTION_MIN_LENGTH,
  EVENTPLACE_DESCRIPTION_MAX_LENGTH,
  EVENTPLACE_NAME_MIN_LENGTH,
  EVENTPLACE_NAME_MAX_LENGTH,
  EVENTPLACE_CITY_MIN_LENGTH,
  EVENTPLACE_CITY_MAX_LENGTH,
  EVENTPLACE_POSTALCODE_ACCEPTED_LENGTH,
  EVENTPLACE_STREET_MIN_LENGTH,
  EVENTPLACE_STREET_MAX_LENGTH,
  EVENTPLACE_STREETNUMBER_MAX_LENGTH,
} from "../constants";

export const validation = {
    validateName,
    validateEmail,
    validateUsername,
    validateSurname,
    validatePhoneNumber,
    validateEventPlaceDescription,
    validateEventPlaceName,
    validateEventPlacePostalCode,
    validateEventPlaceStreet,
    validateEventPlaceCity,
    validateEventPlaceStreetNumber
};


function validatePhoneNumber(phoneNumber){
  const PHONEPL_REGEX = RegExp(
    "(?:1[2-8]|2[2-69]|3[2-49]|4[1-68]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\\d{7}"
  );

  if (!PHONEPL_REGEX.test(phoneNumber)) {
    return {
      validateStatus: "error",
      errorMsg: "Niepoprawny numer telefonu",
    };
  } else if (phoneNumber.length !== PHONE_ACCEPTED_LENGTH) {
           return {
             validateStatus: "error",
             errorMsg: `Długość numer telefonu jest niepoprawna (Wymagane  to ${PHONE_ACCEPTED_LENGTH} znaki)`,
           };
         } else {
           return {
             validateStatus: "success",
             errorMsg: null,
           };
         }

};


function validateName(name) {
  if (name.length < NAME_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Imię jest za krótkie (Wymagane minimum to ${NAME_MIN_LENGTH} znaki)`,
    };
  } else if (name.length > NAME_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Imię jest za długie (Maksimum to ${NAME_MAX_LENGTH} znaków)`,
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
}

function validateSurname(surname) {
  if (surname.length < SURNAME_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Nazwisko jest za krótkie (Wymagane minimum to ${SURNAME_MIN_LENGTH} znaki)`,
    };
  } else if (surname.length > SURNAME_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Nazwisko jest za długie (Maksimum to ${SURNAME_MAX_LENGTH} znaków)`,
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
}

function validateEmail(email) {
  if (!email) {
    return {
      validateStatus: "error",
      errorMsg: "Pole email nie może być puste",
    };
  }

  const EMAIL_REGEX = RegExp(
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (!EMAIL_REGEX.test(email)) {
    return {
      validateStatus: "error",
      errorMsg: "Niepoprawny email",
    };
  }

  if (email.length > EMAIL_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Email jest za długi (Maksimum to ${EMAIL_MAX_LENGTH} znaków)`,
    };
  }

  return {
    validateStatus: null,
    errorMsg: null,
  };
};

function validateUsername(username) {
  if (username.length < USERNAME_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Nazwa jest za krótka (Wymagane minimum to ${SURNAME_MIN_LENGTH} znaki)`,
    };
  } else if (username.length > USERNAME_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Nazwa jest za długa (Maksimum to ${USERNAME_MAX_LENGTH} znaków)`,
    };
  } else {
    return {
      validateStatus: null,
      errorMsg: null,
    };
  }
};

function validateEventPlaceDescription(name) {
  if (name.length < EVENTPLACE_DESCRIPTION_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Opis miejsca jest za krótki (Wymagane minimum to ${EVENTPLACE_DESCRIPTION_MIN_LENGTH} znaki)`,
    };
  } else if (name.length > EVENTPLACE_DESCRIPTION_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Opis miejsca jest za długi (Maksimum to ${EVENTPLACE_DESCRIPTION_MAX_LENGTH} znaków)`,
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
}

function validateEventPlaceName(name) {
  if (name.length < EVENTPLACE_NAME_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Nazwa miejsca jest za krótka (Wymagane minimum to ${EVENTPLACE_NAME_MIN_LENGTH} znaki)`,
    };
  } else if (name.length > EVENTPLACE_NAME_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Nazwa miejsca jest za długa (Maksimum to ${EVENTPLACE_NAME_MAX_LENGTH} znaków)`,
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
}

function validateEventPlaceCity(city) {
  if (city.length < EVENTPLACE_CITY_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Nazwa miejscowości jest za krótka (Wymagane minimum to ${EVENTPLACE_CITY_MIN_LENGTH} znaki)`,
    };
  } else if (city.length > EVENTPLACE_CITY_MAX_LENGTH) {
           return {
             validateStatus: "error",
             errorMsg: `Nazwa miejscowości jest za długa (Maksimum to ${EVENTPLACE_CITY_MAX_LENGTH} znaków)`,
           };
         } else {
           return {
             validateStatus: "success",
             errorMsg: null,
           };
         }
}


function validateEventPlacePostalCode(postalCode) {
  if (!postalCode) {
    return {
      validateStatus: "error",
      errorMsg: "Pole kod pocztowy nie może być puste",
    };
  }

  const POSTALCODE_REGEX = RegExp(
    "^\\d{2}[- ]{0,1}\\d{3}$"
  );
  if (!POSTALCODE_REGEX.test(postalCode)) {
    return {
      validateStatus: "error",
      errorMsg: "Niepoprawny kod pocztowy",
    };
  }

  if (postalCode.length > EVENTPLACE_POSTALCODE_ACCEPTED_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Kod pocztowy jest za długi (Maksimum to ${EVENTPLACE_POSTALCODE_ACCEPTED_LENGTH} znaków)`,
    };
  }

  return {
    validateStatus: "success",
    errorMsg: null,
  };
};


function validateEventPlaceStreet(street) {
  if (street.length < EVENTPLACE_STREET_MIN_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Nazwa ulicy jest za krótka (Wymagane minimum to ${EVENTPLACE_STREET_MIN_LENGTH} znaki)`,
    };
  } else if (street.length > EVENTPLACE_STREET_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Nazwa ulicy jest za długa (Maksimum to ${EVENTPLACE_STREET_MAX_LENGTH} znaków)`,
    };
  } else {
    return {
      validateStatus: "success",
      errorMsg: null,
    };
  }
}

function validateEventPlaceStreetNumber(streetNumber) {
if (!streetNumber) {
  return {
    validateStatus: "error",
    errorMsg: "NUmer budynku lub lokalu nie może być pusty",
  };
}

  const STREETNUMBER_REGEX = RegExp("^\\d*[A-Z]?\\/?\\d+[A-Z]?$");
  if (!STREETNUMBER_REGEX.test(streetNumber)) {
    return {
      validateStatus: "error",
      errorMsg: "Niepoprawny numer",
    };
  }

  if (streetNumber.length > EVENTPLACE_STREETNUMBER_MAX_LENGTH) {
    return {
      validateStatus: "error",
      errorMsg: `Numer jest za długi (Maksimum to ${EVENTPLACE_STREETNUMBER_MAX_LENGTH} znaków)`,
    };
  }

  return {
    validateStatus: "success",
    errorMsg: null,
  };
}


export default validation;