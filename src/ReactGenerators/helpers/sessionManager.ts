import Axios from "axios"
import { ISession } from "../../database/models/Session.d";

export const startSession = async(data: ISession) => {
  const res = await Axios.post("http://localhost:8090/gameSession/register", data);
  console.log({ sent: data, received: res });
}