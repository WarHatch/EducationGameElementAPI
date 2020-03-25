// Assets need to be imported to be bundled
// ...

import contentOptionButton from "../elements/contentOptionButton";

import observeSSRElements from "../gameScripts/observer";
import htmlToElement from "../gameScripts/htmlToElement";
import { appendToGame, getHTMLCanvasElement } from "../gameScripts/HTMLCanvasManager";
import { mountClick } from "../functionMounters/endSessionFunctions";
import { getSessionConfig, ISentenceConstructorDataSet, getCMSDataSentenceConstructor } from "../dataHandler";
import { ISession } from "../../database/models/Session";
import { ISentenceConstructorConfig } from "../../database/models/SentenceConstructorConfig";

export default async (
  sessionData: ISession,
  contentSlug: string,
  htmlCanvas: IHTMLCanvas
) => {
  const { sessionId, lessonId } = sessionData;
  const { canvasWidth, canvasHeight } = htmlCanvas;

  const sentenceConstructorContentSet: ISentenceConstructorDataSet = await getCMSDataSentenceConstructor(contentSlug);

  // FIXME: Remove if unrequired - Dirty fix for phaser.GameScene loading async after this script is mounted
  setTimeout(() => {
    if (sentenceConstructorContentSet.quizTitle === undefined)
      throw new Error("EduSentenceConstructor script received no content");
    // --- Single spawn elements
    const { answers, badAnswers } = sentenceConstructorContentSet;
    const optionWidth = 100;
    const buttonHTMLSet = [
      ...answers.map((ans, index) => {
        return contentOptionButton({ correctPlacement: index, imageURL: ans.picture.asset._ref, imageWidth: optionWidth, ariaLabel: ans.word })
      }),
      ...badAnswers.map((ans) => {
        return contentOptionButton({ correctPlacement: null, imageURL: ans.picture.asset._ref, imageWidth: optionWidth, ariaLabel: ans.word })
      })
    ]
    buttonHTMLSet.forEach(buttonHtml => {
      // TODO: append to the gameContainer
      appendToGame(htmlToElement(buttonHtml));
    });
    

    // --- TODO: observe for config changes
    /*
        // --- Periodically check for config changes and update spawners
        const configRefreshInterval = setInterval(async () => {
          if (window.gameEnded) {
            clearInterval(currentSpawnInterval);
            cleanup(getHTMLCanvasElement());
            console.log("Ending game");
            clearInterval(configRefreshInterval) // Kill self
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
              // Setup SSR element observer with new config
              currentObserver = observeSSRElements(sessionData, sessionConfig, htmlCanvas)
            }
          }
        }, 1000) // repeat after a second
*/
    console.log("EduSentenceConstructor script finished mounting");
  }, 500)
}
