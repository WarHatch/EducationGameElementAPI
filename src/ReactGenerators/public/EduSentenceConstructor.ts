// Assets need to be imported to be bundled
// ...

import contentOptionButton from "../elements/contentOptionButton";
import storyTextWithSlots from "../elements/storyTextWithSlots";

import observeSSRElements from "../gameScripts/observer";
import htmlToElement from "../gameScripts/htmlToElement";
import { appendToGame, getHTMLCanvasElement } from "../gameScripts/HTMLCanvasManager";
// import { mountClick } from "../functionMounters/endSessionFunctions";
import { getSessionConfig, ISentenceConstructorDataSet, getCMSDataSentenceConstructor, IContentAnswer } from "../dataHandler";
import { ISession } from "../../database/models/Session";
import { ISentenceConstructorConfig } from "../../database/models/SentenceConstructorConfig";
import cleanup from "../gameScripts/sentenceConstructorGame/cleanup";
import _ from "lodash";

export interface ISCGlobal {
  attemptedAnswer: {
    selected: string | null;
    correctPlacement: number | null;
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

  // Init additional global state
  window.sentenceConstructorParams = {
    attemptedAnswer: {
      selected: null,
      correctPlacement: null,
    }
  }

  // FIXME: Remove if not required - Dirty fix for phaser.GameScene loading async after this script is mounted
  setTimeout(() => {
    if (sentenceConstructorContentSet.quizTitle === undefined)
      throw new Error("EduSentenceConstructor script did not receive content");
    if (sentenceConstructorConfigs === undefined || !Boolean(sentenceConstructorConfigs[0])){
      console.error(sentenceConstructorConfigs);
      throw new Error("session.sentenceConstructorConfigs array does not have an object");
    }
    let sessionConfig = sentenceConstructorConfigs[0];

    // --- Single spawn elements
    const { answers, badAnswers, storyChunks } = sentenceConstructorContentSet;
    spawnOptionButtons(canvasWidth, answers, badAnswers);
    appendToGame(htmlToElement(storyTextWithSlots({ selectedAnswers: [], textSnippets: storyChunks })))

    let currentObserver = observeSSRElements(sessionData, sessionConfig, htmlCanvas)
    // --- Observe for config changes
        // --- Periodically check for config changes and update spawners
        const configRefreshInterval = setInterval(async () => {
          if (window.gameEnded) {
            // end process
            console.log("Ending sentenceConstructor game");
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
              // remove old intervals

              // apply new intervals

              // Disconnect old observer
              currentObserver.disconnect();
              // Connect new observer with new config
              currentObserver = observeSSRElements(sessionData, sessionConfig, htmlCanvas)
            }
          } 
        }, 1000) // repeat after a second
    console.log("EduSentenceConstructor script finished mounting");
  }, 500)
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