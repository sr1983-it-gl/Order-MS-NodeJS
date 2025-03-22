
import {connectToDB} from "./db.js"

const main = async () => {

  connectToDB();
  console.log("No sample data available for Orders")

}

await main();