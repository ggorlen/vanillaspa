(() => {
  // https://www.qualified.io/embed/api-docs/
  const challengeIds = [];
  let candidateCode = "";
  //let initialFiles = {"solution.js": candidateCode || undefined};
  let initialFiles = {"solution/code.js": candidateCode || undefined};
  // use src/index.js if PCC
  const config = {
    // generate editors by looking through nodes
    autoCreate: true,

    // shared options for new editors
    options: {
      embedClientKey: "g39RsSfAYEkyRG8ZYjxrpT9c/XqnfQpN"
    },

    // challenge-specific options
    challengeOptions: {
      "5c8b026ceea25f19d5f2ab55": {
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
        console.log(candidateCode)
        manager.destroy();
        manager = window.QualifiedEmbed.init(config);
      }
      //editor.update({challegeId: challengeId, reload: true}) // FIXME
    }
  };
  const manager = window.QualifiedEmbed.init(config);

  // This demo uses autoCreate. If you prefer, you can set autoCreate to false, and create editors with code like this:
  //var node = document.querySelector("[data-qualified-embed='5ec2f97e5c19b1000ae24cd2']");
  //var editor = manager.createEditor({ node: node, challengeId: "5ec2f97e5c19b1000ae24cd2", options: { /* per-challenge options */ 
  //  onLoaded({ manager, editor, challengeId, data }) {
  //    // Respond to challenge being loaded
  //    console.log("loaded", editor.setFileContent);
  //    console.log(editor.setFileContents({"./ex.js": "asdfasdasd"}));
  //  },
  //  onChange({ manager, editor, challengeId, data }) {
  //    // save changes made to the solution
  //    //console.log(editor, challengeId, data);
  //    console.log(editor.setFileContents({"./ex.js": "asdfasdasd"}));
  //  },
  //}});
})();