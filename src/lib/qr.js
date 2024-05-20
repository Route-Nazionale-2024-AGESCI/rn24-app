export function decodeQr(data) {
  let qrInfo;
  try {
    qrInfo = JSON.parse(data);
  } catch (err) {
    return {
      error: true,
      errorMsg: "Il codice QR non sembra essere corretto",
    };
  }
  if (qrInfo.contact !== undefined) {
    /*  RETURN FORMAT
      {'contact': {
        'firstName':'...'
        ...
      }}

    */
    //return { ...qrInfo.contact };
    return qrInfo;

    /*  RETURN FORMAT
      {
        'type':'page',
        'url':'/pages/{uuid}
      } ||
      {
        'type':'event',
        'url':'/eventi/{uuid}
      }
    */
  } else if (qrInfo.url !== undefined) {
    let type;
    let url = qrInfo.url;
    if (!url.startsWith("/")) {
      url = `/${url}`;
    }
    if (url.includes("pages") || url.includes("pagine")) {
      type = "page";
    } else if (url.includes("eventi")) {
      type = "event";
    } else
      return {
        error: true,
        errorMsg: "Il codice QR non rappresenta un contatto o un contenuto",
      };
    return { url, type };
  } else
    return {
      error: true,
      errorMsg: "Il codice QR non rappresenta un contatto o un contenuto",
    };
}

export function encodeContact(firstName, lastName, phone, email, note, url) {
  let contact = {};
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
