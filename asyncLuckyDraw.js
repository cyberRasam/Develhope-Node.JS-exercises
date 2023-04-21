function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

async function getResults () {
    try {
        const results = await Promise.allSettled([
            luckyDraw('Tina'),
            luckyDraw('Jorge'),
            luckyDraw('Julien')
        ])
        
        results.forEach((result) => {
            if(result.status === "fulfilled") {
                console.log(result.value)
            } else {
                console.log(result.reason.message)
            }
        })
    } catch (error) {
        console.error(error.message)
    }
}  

getResults()