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

  luckyDraw("Joe").catch((error) => {
    return error.message;
  })
  .then((result) => {
    console.log(result);
    return luckyDraw("Caroline").catch((err) => {
        return err.message
    })
  })
  .then((result) => {
    console.log(result);
    return luckyDraw("Sabrina").catch((err) => {
        return err.message
    })
  })
