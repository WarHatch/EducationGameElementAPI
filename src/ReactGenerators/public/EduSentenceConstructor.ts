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
  contentSlug: string,
  htmlCanvas: IHTMLCanvas
) => {
  const { sessionId, lessonId, sentenceConstructorConfigs } = sessionData;
  const { canvasWidth, canvasHeight } = htmlCanvas;

  const sentenceConstructorContentSet: ISentenceConstructorDataSet = await getCMSDataSentenceConstructor(contentSlug);

  // Init addon global state
  window.sentenceConstructorParams = {
    attemptedAnswer: null,
    hintCollector: {
      unreadMessageStack: [],
    }
  }

  if (sentenceConstructorContentSet.quizTitle === undefined)
    throw new Error("EduSentenceConstructor script did not receive content");
  if (sentenceConstructorConfigs === undefined || !Boolean(sentenceConstructorConfigs[0])) {
    console.error(sentenceConstructorConfigs);
    throw new Error("session.sentenceConstructorConfigs array does not have an object");
  }
  let sessionConfig = sentenceConstructorConfigs[0];
  const startGameTimerId = timeTracker.startTimer();

  let currentObserver = observeSSRElements(sessionData, sessionConfig, htmlCanvas, startGameTimerId);
  // --- Single spawn elements
  const { answers, badAnswers, storyChunks } = sentenceConstructorContentSet;
  spawnOptionButtons(canvasWidth, answers, badAnswers);
  appendToGame(htmlToElement(hintButton({hintMessageCount: 0})))
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
        currentObserver = observeSSRElements(sessionData, sessionConfig, htmlCanvas, startGameTimerId)
      }
    }
  }, 1000) // repeat after a second
  console.log("EduSentenceConstructor script finished mounting");
}

// TODO: Deteremine button size by canvasWidth and spread buttons around
const spawnOptionButtons = (canvasWidth: number, answers: IContentAnswer[], badAnswers: IContentAnswer[]) => {
  const horizontalContainerPad = 50;
  // const betweenButtonsPad = 35;

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
    // TODO: append to the gameContainer
    appendToGame(htmlToElement(buttonHtml));
  });
}