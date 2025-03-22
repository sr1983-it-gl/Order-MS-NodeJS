



import {connectToDB} from "./db.js"
import {removeSampleOrders} from "./sample_orders_manager.js"

await connectToDB();
await removeSampleOrders()

process.exit()