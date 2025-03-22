import {Order} from "./order.js";

async function removeSampleOrders(){

    await Order.find({})
        .then( (orders) => {

            if (orders.length === 0) {
                console.log("No orders found for cleanup")
            }

            orders.forEach( async (order) => {

                console.log(`removeSampleOrders: Fetched Order is ${order}`)

                const res = await Order.deleteOne({_id: order._id})
                    .then( (response) => {
                        console.log(`removeSampleOrders: Order with id ${order._id} deleted successfully...`)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
        })
        .catch((error) => {
            console.log("Error loading the Sample-Orders")
            console.log(error);
        })

}


export {removeSampleOrders}