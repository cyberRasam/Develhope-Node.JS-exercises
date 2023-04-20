const figlet = require('figlet')

figlet.text(
    "Nice Tool",
    {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      }
    , (err,data) => {
    if(err) {
        console.log("something went wrong");
        console.dir(err)
        return
    }
    console.log(data)
})