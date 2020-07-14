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
};`;
