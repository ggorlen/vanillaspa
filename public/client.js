/*
suggestions:
vim mode
throw errors when editor.setFileContents fails
get list of files in workspace

*/

(() => {
  // https://www.qualified.io/embed/api-docs/
  const challengeNode = document.querySelector("#qualified-embed");
  const nextChallengeBtn = document.querySelector("#next-challenge");
  let nextChallengeBtnHandler;
  const challengeIds = [
    "5c8b026ceea25f19d5f2ab55", 
    "5c782e8465dca00007df248f", 
    "5c8b096c4fd26000076c57da"
  ];
  const solutions = {
    "5c8b096c4fd26000076c57da": `const balanced = string => {
  let counts = string.split("")
    .reduce((a, e) => {
      if (!(e in a)) {
        a[e] = 0;
      }
       
      a[e]++;
      return a;
    }, {})
  ;
    
  if ("*" in counts) {
    let wildcards = counts["*"];
    delete counts["*"];
    counts = Object.values(counts);
      
    if (!counts.length) {
      return true;
    }
    
    let maxCount = Math.max(...counts);
      
    for (let i = 0; i < counts.length; i++) {
      wildcards -= maxCount - counts[i];
      counts[i] = maxCount;
        
      if (wildcards < 0) {
        return false;
      }
    }
      
    if (wildcards) {
      while (wildcards > 0) {  
        if (wildcards % counts.length === 0 || 
            wildcards % maxCount === 0 && 
            wildcards / maxCount + counts.length < 53) {
          return true;
        }
         
        maxCount++;
        wildcards -= counts.length;
      }
          
      return false;
    }
  }
  else {
    counts = Object.values(counts);
  }
  
  return !counts.length || 
         counts.every(e => e === counts[0])
  ;
};`
  };
  solutions["5c8b026ceea25f19d5f2ab55"] = 
    solutions["5c782e8465dca00007df248f"] = `const balanced = string => {
const counts = [...string].reduce((a, e) => {
a[e] = ++a[e] || 1;
return a;
}, {});
const freq = Object.values(counts);
return !freq.length || freq.every(e => e === freq[0]);
};`
  let candidateCode = "";
  //let initialFiles = {"src/index.js": candidateCode || undefined}; // for PCC
  let initialFiles = {};
  const editorConfig = {
    node: challengeNode, 
    challengeId: challengeIds[0],
    options: {}
  };
  // use src/index.js if PCC
  
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
      
      if (data.result.completed) {
        nextChallengeBtn.disabled = false;
        
        if (nextChallengeBtnHandler) {
          nextChallengeBtn.removeEventListener("click", nextChallengeBtnHandler);
        }
        
        nextChallengeBtnHandler = e => {
          nextChallengeBtn.disabled = true;
          const nextIdx = (1 + challengeIds.indexOf(challengeId)) % challengeIds.length;
          editorConfig.challengeId = challengeIds[nextIdx];
          initialFiles.code = candidateCode;//data.files.code;
          manager.destroy();
          manager = window.QualifiedEmbed.init(managerConfig);
          editor = manager.createEditor(editorConfig);
        };
        nextChallengeBtn.addEventListener("click", nextChallengeBtnHandler);
        //editor.update({challegeId: challengeId, reload: true}) // FIXME
      }
    }
  };
  let manager = window.QualifiedEmbed.init(managerConfig);
  let editor = manager.createEditor(editorConfig);
  document.querySelector("#get-solution").addEventListener("click", e => {
    console.log("HI")
    editor.setFileContents({"code": "testing 1 2"});
    //const ta = document.createElement("textarea");
    //ta.innerText = editorConfig.challengeId;
    //document.body.appendChild(ta);
    //ta.select();
    //document.execCommand("copy");
    //document.body.removeChild(ta);
  });
})();
