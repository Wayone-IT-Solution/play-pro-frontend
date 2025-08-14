import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const Get = async (url: string) => {
  try {
    const response = await axios.get(BASE_URL + url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error))
      console.log("Axios Error:", error.response?.data || error.message);
    else console.log("Unexpected Error:", (error as Error).message || error);
    return null;
  }
};
