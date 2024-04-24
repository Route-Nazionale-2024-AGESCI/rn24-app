export default function generateVCardBlob(
  firstName,
  lastName,
  phone,
  email = undefined
) {
  const vcardData = `BEGIN:VCARD
VERSION:4.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
TEL:${phone}
${email && `EMAIL:${email}`}
END:VCARD`;
  const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
  return blob;
}
