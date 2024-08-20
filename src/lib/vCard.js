export default function generateVCardBlob(
  firstName,
  lastName,
  phone,
  email = undefined,
  note,
  url
) {
  const vcardData = `BEGIN:VCARD
VERSION:3.0
N:${lastName ? `${lastName};` : ""}${firstName ? firstName : ""}
FN:${firstName ?? `${firstName} `}${lastName ?? ""}
${phone ? `TEL:${phone}` : ""}
${email ? `EMAIL:${email}` : ""}
${note ? `NOTE:${note.replace(/\r?\n/g, '\\n')}` : ""}
${url ? `URL:${url}` : ""}
END:VCARD`
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
  const blob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
  return blob;
}
