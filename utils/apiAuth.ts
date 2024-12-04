import axios from "axios";

const apiAuth = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
  },
});

console.log(process.env.NEXT_PUBLIC_API_URL);

export default apiAuth;
