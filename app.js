import express from "express";


import {getAllOrders, getOrder, postOrder} from "./order_controller.js"
import {connectToDB} from "./db.js"

const app = express();
app.use(express.json());


app.get("/orders", getAllOrders)
app.post("/orders", postOrder)
app.get("/orders/:id", getOrder)


const PORT = process.env.PORT || 80;
const server = app.listen(PORT, () => {

  const initHandler = async () => {

    connectToDB();
  }

  initHandler()
      .then((response) => {
        console.log(`Server started and running at port ${PORT}`);
      })
      .catch((error) => {
        console.log(error)
      })
})