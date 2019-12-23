import axios from "axios";

// Types

type IEndSessionData = {
  sessionId: string,
  finishedAt: Date,
}

const endSessionClick = async (data: IEndSessionData) => {
  const res = await axios.post("http://localhost:8090/gameSession/register/end", data);
  console.log({ sent: data, received: res });
}

export const mountClick = (buttonElement: HTMLElement, sessionId: string) => {
  buttonElement.addEventListener("click", () => {
    const now = new Date();
    endSessionClick({
      sessionId,
      finishedAt: now,
    })
  })
}
