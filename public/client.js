// TODO only success when submission tests are passed, not candidate tests

/*
suggestions:
- vim mode/soft wrap persistence or being able to set 
- throw error when editor.setFileContents fails
- get list of files in workspace
- have to destroy workspace in order to go to next challenge
- is it possible to programmatically force a submission?
*/

// https://www.qualified.io/embed/api-docs/
(() => {
  const challengeNode = document.querySelector("#qualified-embed");
  const nextChallengeBtn = document.querySelector("#next-challenge");
  nextChallengeBtn.disabled = true;
  const getSolnBtn = document.querySelector("#get-solution");
  let nextChallengeBtnHandler;
  const challengeIds = [
    //"5c8b026ceea25f19d5f2ab55", 
    //"5c782e8465dca00007df248f", 
    //"5c8b096c4fd26000076c57da",
    "5c74a4cdfa4fe30007a71e80",
    "5c8b093e21d0760008f57e55",
    "5c8b0930d13fa3000b0b46c8",
  ];
  const presetCodeForChallenge = {
    "5c8b0930d13fa3000b0b46c8": `

def valid_installation(sequence, package, dependencies):
    pass

`,
  };
  let candidateCode = "";
  //let initialFiles = {"src/index.js": candidateCode || undefined}; // for PCC
  let initialFiles = {};
  const editorConfig = {
    node: challengeNode, 
    challengeId: challengeIds[0],
    options: {}
  };
  
  const managerConfig = {
    // generate editors by looking through nodes
    autoCreate: false,

    // shared options for new editors
    options: {
      embedClientKey: "g39RsSfAYEkyRG8ZYjxrpT9c/XqnfQpN",
      language: "javascript",
      //hideTabs: "instructions,runnerframe",
      theme: "dark",
      autoStart: false,
      initialFiles: initialFiles
    },

    // The following events can also be handled per-challenge
    onLoaded({manager, editor, challengeId, data}) {
      // Respond to challenge being loaded
      //console.log("challenge loaded");
      //editor.setFileContents({"src/index.js": "testing 1 2"});
    },
    onChange({manager, editor, challengeId, data}) {
      // save changes made to the solution
      candidateCode = data.files.code;
    },
    onRun({manager, editor, challengeId, data}) {
      console.log(`challenge ${challengeId} was run with this result:`);
      console.log(data);
      
      if (data.result.completed && data.type === "attempt" /* "test" */) {
        nextChallengeBtn.disabled = false;
        
        if (nextChallengeBtnHandler) {
          nextChallengeBtn.removeEventListener("click", nextChallengeBtnHandler);
        }
        
        nextChallengeBtnHandler = e => {
          nextChallengeBtn.disabled = true;
          const nextIdx = (1 + challengeIds.indexOf(challengeId)) % challengeIds.length;
          editorConfig.challengeId = challengeIds[nextIdx];
          initialFiles.code = candidateCode + 
            (presetCodeForChallenge[challengeIds[nextIdx]] || "");
          context.manager.destroy();
          context.manager = window.QualifiedEmbed.init(managerConfig);
          context.editor = context.manager.createEditor(editorConfig);
          getSolnBtn.removeEventListener("click", getSolnHandler);
          getSolnBtn.addEventListener("click", getSolnHandler);
        };
        nextChallengeBtn.addEventListener("click", nextChallengeBtnHandler);
        //editor.update({challegeId: challengeId, reload: true}) // FIXME
      }
    }
  };
  
  const getSolnHandler = e =>
    context.editor.setFileContents({"code": solutions[editorConfig.challengeId]})
  ;
  getSolnBtn.addEventListener("click", getSolnHandler);
  const context = {manager: window.QualifiedEmbed.init(managerConfig)};
  context.editor = context.manager.createEditor(editorConfig);
})();
