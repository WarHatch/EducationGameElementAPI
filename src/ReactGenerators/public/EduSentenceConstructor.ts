// Assets need to be imported to be bundled
// import "./assets/question_button.png"
// TODO: temp fix in ./index.ts. Crashes on load: `SyntaxError: Invalid or unexpected token`

import contentOptionButton from "../elements/contentOptionButton";
import storyTextWithSlots from "../elements/storyTextWithSlots";
import hintButton from "../elements/hintButton";
import scCompletedButton from "../elements/scCompletedButton";

import observeSSRElements from "../observer";
import htmlToElement from "../gameScripts/htmlToElement";
import { appendToGame, getHTMLCanvasElement } from "../gameScripts/HTMLCanvasManager";
import { getSessionConfig, ISentenceConstructorDataSet, getCMSDataSentenceConstructor, IContentAnswer } from "../dataHandler";
import { ISession } from "../../database/models/Session";
import cleanup from "../gameScripts/sentenceConstructorGame/cleanup";
import _ from "lodash";
import updateHintCounter from "../gameScripts/sentenceConstructorGame/updateHintCounter";
import timeTracker from "../gameScripts/timeTracker";
import completeSession from "../gameScripts/sentenceConstructorGame/completeSession";
import countdownTimer from "../elements/countdownTimer";

export interface ISCGlobal {
  attemptedAnswer: {
    selected: string;
    correctPlacement: number | null;
    src: string
  } | null
  hintCollector: {
    unreadMessageStack: string[],
  }
}

export const sentenceConstructorGameTypeName = "sentenceConstructor";

export default async (
  sessionData: ISession,
  htmlCanvasConfig: IHTMLCanvasConfig,
  contentSlug?: string,
  gameContentJSON?: string,
) => {
  const { sessionId, lessonId, sentenceConstructorConfigs } = sessionData;
  const { canvasWidth, canvasHeight } = htmlCanvasConfig;

  // Init addon global state
  window.sentenceConstructorParams = {
    attemptedAnswer: null,
    hintCollector: {
      unreadMessageStack: [],
    }
  }

  let sentenceConstructorContentSet: ISentenceConstructorDataSet | null = null;
  // get game content
  if (contentSlug)
    sentenceConstructorContentSet = await getCMSDataSentenceConstructor(contentSlug) as ISentenceConstructorDataSet;
  else if (gameContentJSON)
    sentenceConstructorContentSet = JSON.parse(gameContentJSON) as ISentenceConstructorDataSet
  else
    throw new Error("contentSlug and gameContentJSON are missing - time to panic");

  const { answers, badAnswers, storyChunks, quizTitle } = sentenceConstructorContentSet;
  if (quizTitle === undefined)
    throw new Error("EduSentenceConstructor script did not receive content");
    
  // handle config
  if (sentenceConstructorConfigs === undefined || !Boolean(sentenceConstructorConfigs[0])) {
    console.error(sentenceConstructorConfigs);
    throw new Error("session.sentenceConstructorConfigs array does not have an object");
  }
  let sessionConfig = sentenceConstructorConfigs[0];
  const startGameTimerId = timeTracker.startTimer();

  let currentObserver = observeSSRElements(sessionData, sessionConfig, htmlCanvasConfig, startGameTimerId);
  // --- Single spawn elements
  appendToGame(htmlToElement(countdownTimer()))
  spawnOptionButtons(canvasWidth, answers, badAnswers);
  appendToGame(htmlToElement(hintButton({ hintMessageCount: 0 })))
  appendToGame(htmlToElement(storyTextWithSlots({ textSnippets: storyChunks })))
  appendToGame(htmlToElement(scCompletedButton({})));

  // --- Monitor for config changes
  const configRefreshInterval = setInterval(async () => {
    if (window.gameEnded) {
      // end process
      console.log("Ending sentenceConstructor game...");
      // clearInterval(currentSpawnInterval);
      cleanup(getHTMLCanvasElement());
      clearInterval(configRefreshInterval) // break loop
    }
    else {
      // get new config
      const receivedConfig = await getSessionConfig(lessonId, { sessionId });
      // if received different config than the current
      if (JSON.stringify(sessionConfig) !== JSON.stringify(receivedConfig)) {
        sessionConfig = receivedConfig;

        // extract hint payload from new config
        if (typeof sessionConfig.hintMessage === "string") {
          window.sentenceConstructorParams?.hintCollector.unreadMessageStack.push(sessionConfig.hintMessage)
          updateHintCounter(window.sentenceConstructorParams?.hintCollector.unreadMessageStack.length as number)
        }

        // remove old intervals

        // apply new intervals

        // Disconnect old observer
        currentObserver.disconnect();
        // Connect new observer with new config
        currentObserver = observeSSRElements(sessionData, sessionConfig, htmlCanvasConfig, startGameTimerId)
      }
    }
  }, 1000) // repeat after a second

  const currentSessionId = sessionId;
  setTimeout(() => {
    if (currentSessionId === window.session?.sessionId) // if it's the same session
      completeSession(currentSessionId, lessonId, startGameTimerId, undefined, htmlCanvasConfig)
  },
    10 * 60 * 1000) // 10 minutes

  console.log("EduSentenceConstructor script finished mounting");
}

const spawnOptionButtons = (canvasWidth: number, answers: IContentAnswer[], badAnswers: IContentAnswer[]) => {
  // const betweenButtonsPad = 35; // button size can be determinded by canvasWidth
  let buttonHTMLSet = [
    ...answers.map((ans, index) => {
      return contentOptionButton({ correctPlacement: index, imageRef: ans.picture.asset._ref, ariaLabel: ans.word })
    }),
    ...badAnswers.map((ans) => {
      return contentOptionButton({ correctPlacement: null, imageRef: ans.picture.asset._ref, ariaLabel: ans.word })
    })
  ]
  buttonHTMLSet = _.shuffle(buttonHTMLSet);
  buttonHTMLSet.forEach(buttonHtml => {
    appendToGame(htmlToElement(buttonHtml));
  });
}