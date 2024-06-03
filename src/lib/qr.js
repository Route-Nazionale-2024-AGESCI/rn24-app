import { ec } from "elliptic";
import { createHash } from "crypto";
import isValidUUID from "./uuid";

/*
  There are 4 kinds of QR Code to decode:
    1 - page link: P#{pageUuid}
    2 - contact: {'contact':{'firstName':'Jon', ...}}
    3 - badge: {Base64Encoded}#{sign}
    4 - eventi link E#{eventUuid}


  Output format:
    1 - {type: 'page',url: '/pages/{uuid}}
    2 - json-parsed input
    3 - {firstName: '...', lastName: '...', ..., validSignature: true}
    4 - {type: 'event',url: '/eventi/{uuid}}
*/

export const QRCodeCategories = Object.freeze({
  PageLink: Symbol("page_link"),
  EventLink: Symbol("event_link"),
  Contact: Symbol("contact"),
  Badge: Symbol("badge"),
});

export class QRCodeScanError extends Error {
  constructor(message) {
    super(message);
    this.name = "QRCodeScanError";
  }
}

export class InvalidQRCodeError extends QRCodeScanError {
  constructor(message = "QR code errato") {
    super(message);
    this.name = "InvalidQRCodeError";
  }
}

export class UnknownQRCodeCategory extends QRCodeScanError {
  constructor(message = "QR code non riconosciuto") {
    super(message);
    this.name = "UnknownQRCodeCategory";
  }
}

export class InvalidBadgeError extends QRCodeScanError {
  constructor(message = "Badge non valido") {
    super(message);
    this.name = "InvalidBadgeError";
  }
}

export class InvalidLinkError extends QRCodeScanError {
  constructor(message = "Link non valido") {
    super(message);
    this.name = "InvalidLinkError";
  }
}

export class InvalidContactError extends QRCodeScanError {
  constructor(message = "Informazioni di contatto non valide") {
    super(message);
    this.name = "InvalidContactError";
  }
}

export class InvalidBadgeSignatureError extends InvalidBadgeError {
  constructor(userInfo, message = "Badge non autentico") {
    super(message);
    this.name = "InvalidBadgeSignatureError";
    this.userInfo = userInfo;
  }
}

export const isValidLink = (link) => {
  return link.split("#").length === 2 && isValidUUID(link.split("#")[1]);
};

export const detectQrTypeAndValidate = (data) => {
  if (data.startsWith("P#")) {
    if (!isValidLink(data)) throw new InvalidLinkError();
    return QRCodeCategories.PageLink;
  }
  if (data.startsWith("E#")) {
    if (!isValidLink(data)) throw new InvalidLinkError();
    return QRCodeCategories.EventLink;
  }
  if (data.startsWith("{")) {
    try {
      const contactData = JSON.parse(data);
      if (contactData.contact === undefined) throw new InvalidContactError();
      return QRCodeCategories.Contact;
    } catch (error) {
      throw new InvalidQRCodeError();
    }
  }

  // badge
  const [encodedBadge, signature, ...others] = data.split("#");
  if (others.length !== 0) throw new UnknownQRCodeCategory();
  if (signature === undefined) throw new InvalidBadgeError();
  const buf = Buffer.from(encodedBadge, "base64");
  const badgeInfo = buf.toString().split("#");
  if (
    badgeInfo.length !== 11 ||
    badgeInfo[0] !== "B" ||
    !isValidUUID(badgeInfo[1])
  )
    throw new InvalidBadgeError();
  return QRCodeCategories.Badge;
};

export const decodeContact = (data) => {
  return JSON.parse(data);
};

export const decodePageLink = (data) => {
  const uuid = data.split("#")[1];
  return {
    type: "page",
    url: `/pages/${uuid}`,
  };
};

export const decodeEventLink = (data) => {
  const uuid = data.split("#")[1];
  return {
    type: "event",
    url: `/eventi/${uuid}`,
  };
};

export const decodeAndValidateBadge = (data, publicKey) => {
  const [encodedBadge, signature] = data.split("#");
  const buf = Buffer.from(encodedBadge, "base64");

  const [
    _headerChar,
    uuid,
    firstName,
    lastName,
    email,
    phone,
    scoutGroup,
    region,
    subdistrict,
    district,
    squad,
  ] = buf.toString().split("#");
  const squads = squad.split(",");
  const userInfo = {
    uuid,
    firstName,
    lastName,
    email,
    phone,
    scoutGroup,
    region,
    subdistrict,
    district,
    squad: squads,
  };

  // signature validation

  // const myEc = new ec("secp256k1");
  // /*
  // const pubKeyRecovered = myEc.keyFromPublic(publicKey, "pem");

  // */

  // const pemContents = publicKey
  //   .replace("-----BEGIN PUBLIC KEY-----", "")
  //   .replace("-----END PUBLIC KEY-----", "")
  //   .replace(/\n/g, "");
  // // Decodifica la chiave da base64
  // const derBuffer = Buffer.from(pemContents, "base64");
  // // Importa la chiave in formato elliptic
  // const pubKeyRecovered = myEc.keyFromPublic(derBuffer, "der");

  // const hash = createHash("sha256").update(encodedBadge).digest();
  // const isSignValid = pubKeyRecovered.verify(hash, signature);
  /*


  */

  //const isSignValid = myEc.verify(encodedBadge, signature, pubKeyRecovered);
  // userInfo.validSignature = isSignValid;
  // if (isSignValid) return userInfo;
  // else throw new InvalidBadgeSignatureError(userInfo);
};

export function decodeQr(data, publicKey = "") {
  switch (detectQrTypeAndValidate(data)) {
    case QRCodeCategories.Contact:
      return decodeContact(data);
    case QRCodeCategories.EventLink:
      return decodeEventLink(data);
    case QRCodeCategories.PageLink:
      return decodePageLink(data);
    case QRCodeCategories.Badge(data):
      return decodeAndValidateBadge(data, publicKey);
    default:
      throw new UnknownQRCodeCategory();
  }
}

export function encodeContact(
  uuid,
  firstName,
  lastName,
  phone,
  email,
  note,
  url
) {
  let contact = {};
  contact.uuid = uuid;
  if (firstName !== null && firstName !== "") contact.firstName = firstName;
  if (lastName !== null && lastName !== "") contact.lastName = lastName;
  if (phone !== null && phone !== "") contact.phone = phone;
  if (email !== null && email !== "") contact.email = email;
  if (note !== null && note !== "") contact.note = note;
  if (url !== null && url !== "") contact.url = url;
  return JSON.stringify({ contact });
}
// export function encodeEvent(data) {}
// export function encodePage(data) {}
