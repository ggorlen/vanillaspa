(() => {
  // https://www.qualified.io/embed/api-docs/
  
  const challengeNode = document.querySelector("#qualified-challenge");
  const challengeIds = [];
  const challengeId = "5ec2f97e5c19b1000ae24cd2";
  let candidateCode = "";
  let initialFiles = {"solution.js": candidateCode || undefined}; // FIXME
  // use src/index.js if PCC
  
  const managerConfig = {
    // generate editors by looking through nodes
    autoCreate: false,

    // shared options for new editors
    options: {
      embedClientKey: "g39RsSfAYEkyRG8ZYjxrpT9c/XqnfQpN"
    },

    // challenge-specific options
    challengeOptions: {
      [challengeId]: {
        language: "javascript",
        //hideTabs: "instructions,runnerframe",
        theme: "dark",
        autoStart: false,
        initialFiles: initialFiles
      }
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
      console.log("challenge " + challengeId + " was run with this result:");
      console.log(data);
      
      if (data.result.completed) {
        manager.destroy();
        manager = window.QualifiedEmbed.init(managerConfig);
      }
      //editor.update({challegeId: challengeId, reload: true}) // FIXME
    }
  };
  const manager = window.QualifiedEmbed.init(managerConfig);
  const editorConfig = {
    node: challengeNode, 
    challengeId: challengeId, options: {}
  };
  const editor = manager.createEditor(editorConfig);
})();