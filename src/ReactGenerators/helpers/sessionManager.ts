import Axios, { AxiosResponse } from "axios"
import { ISession } from "../../database/models/Session.d";

export const startSession = async(data: ISession) => {
  const res: AxiosResponse<ISession> = await Axios.post("http://localhost:8090/gameSession/register", data);
  console.log({ sent: data, received: res });
  return res.data;
}