import * as fs from 'fs'
  
let data = "Hey this text created by file creator module";
  
fs.writeFile("text-file.txt", data, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
    console.log("The written has the following contents:");
    console.log(fs.readFileSync("text-file.txt", "utf8"));
  }
})