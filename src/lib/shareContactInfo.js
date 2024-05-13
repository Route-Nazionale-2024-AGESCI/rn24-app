const FIRST_NAME_LOCAL_STORAGE_KEY = "firstName";
const LAST_NAME_LOCAL_STORAGE_KEY = "lastName";
const PHONE_LOCAL_STORAGE_KEY = "phone";
const EMAIL_LOCAL_STORAGE_KEY = "email";

const SHARE_FIRST_NAME_LOCAL_STORAGE_KEY = "shareFirstName";
const SHARE_LAST_NAME_LOCAL_STORAGE_KEY = "shareLastName";
const SHARE_PHONE_LOCAL_STORAGE_KEY = "sharePhone";
const SHARE_EMAIL_LOCAL_STORAGE_KEY = "shareEmail";

export function initLocalSharableInfo(userInfo) {
  if (localStorage.getItem(SHARE_FIRST_NAME_LOCAL_STORAGE_KEY) === null) {
    localStorage.setItem(SHARE_FIRST_NAME_LOCAL_STORAGE_KEY, "true");
  }
  if (localStorage.getItem(SHARE_LAST_NAME_LOCAL_STORAGE_KEY) === null) {
    localStorage.setItem(SHARE_LAST_NAME_LOCAL_STORAGE_KEY, "true");
  }
  if (localStorage.getItem(SHARE_PHONE_LOCAL_STORAGE_KEY) === null) {
    localStorage.setItem(SHARE_PHONE_LOCAL_STORAGE_KEY, "true");
  }
  if (localStorage.getItem(SHARE_EMAIL_LOCAL_STORAGE_KEY) === null) {
    localStorage.setItem(SHARE_EMAIL_LOCAL_STORAGE_KEY, "false");
  }
  if (localStorage.getItem(FIRST_NAME_LOCAL_STORAGE_KEY) === null) {
    localStorage.setItem(FIRST_NAME_LOCAL_STORAGE_KEY, userInfo.firstName);
  }
  if (localStorage.getItem(LAST_NAME_LOCAL_STORAGE_KEY) === null) {
    localStorage.setItem(LAST_NAME_LOCAL_STORAGE_KEY, userInfo.lastName);
  }
  if (localStorage.getItem(PHONE_LOCAL_STORAGE_KEY) === null) {
    localStorage.setItem(PHONE_LOCAL_STORAGE_KEY, userInfo.phone);
  }
  if (localStorage.getItem(EMAIL_LOCAL_STORAGE_KEY) === null) {
    localStorage.setItem(EMAIL_LOCAL_STORAGE_KEY, userInfo.email);
  }
}

export function getLocalStorageFirstName() {
  return localStorage.getItem(FIRST_NAME_LOCAL_STORAGE_KEY);
}

export function getLocalStorageLastName() {
  return localStorage.getItem(LAST_NAME_LOCAL_STORAGE_KEY);
}

export function getLocalStoragePhone() {
  return localStorage.getItem(PHONE_LOCAL_STORAGE_KEY);
}

export function getLocalStorageEmail() {
  return localStorage.getItem(EMAIL_LOCAL_STORAGE_KEY);
}

export function setLocalStorageFirstName(firstName) {
  localStorage.setItem(FIRST_NAME_LOCAL_STORAGE_KEY, firstName);
}

export function setLocalStorageLastName(lastName) {
  localStorage.setItem(LAST_NAME_LOCAL_STORAGE_KEY, lastName);
}

export function setLocalStoragePhone(phone) {
  localStorage.setItem(PHONE_LOCAL_STORAGE_KEY, phone);
}

export function setLocalStorageEmail(email) {
  localStorage.setItem(EMAIL_LOCAL_STORAGE_KEY, email);
}

export function getLocalStorageShareFirstName() {
  return localStorage.getItem(SHARE_FIRST_NAME_LOCAL_STORAGE_KEY) === "true";
}

export function getLocalStorageShareLastName() {
  return localStorage.getItem(SHARE_LAST_NAME_LOCAL_STORAGE_KEY) === "true";
}

export function getLocalStorageSharePhone() {
  return localStorage.getItem(SHARE_PHONE_LOCAL_STORAGE_KEY) === "true";
}

export function getLocalStorageShareEmail() {
  return localStorage.getItem(SHARE_EMAIL_LOCAL_STORAGE_KEY) === "true";
}

export function setLocalStorageShareFirstName(newValue) {
  return localStorage.setItem(
    SHARE_FIRST_NAME_LOCAL_STORAGE_KEY,
    newValue.toString()
  );
}

export function setLocalStorageShareLastName(newValue) {
  return localStorage.setItem(
    SHARE_LAST_NAME_LOCAL_STORAGE_KEY,
    newValue.toString()
  );
}

export function setLocalStorageSharePhone(newValue) {
  return localStorage.setItem(
    SHARE_PHONE_LOCAL_STORAGE_KEY,
    newValue.toString()
  );
}

export function setLocalStorageShareEmail(newValue) {
  return localStorage.setItem(
    SHARE_EMAIL_LOCAL_STORAGE_KEY,
    newValue.toString()
  );
}
