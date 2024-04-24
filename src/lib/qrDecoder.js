export default function decodeQr(data) {
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
    return { ...qrInfo.contact };
  } else if (qrInfo.url !== undefined) {
    return { url: qrInfo.url };
  } else
    return {
      error: true,
      errorMsg: "Il codice QR non rappresenta un contatto o un URL",
    };
}
