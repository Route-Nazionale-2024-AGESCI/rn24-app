import axios from "axios";

const apiUrl = "https://rn24-dev.fly.dev/api/v1";

export async function testEvents() {
  const res = await axios(`${apiUrl}/events`);
  console.log(res);
}
