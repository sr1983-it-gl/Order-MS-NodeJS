

import {PRODUCT_API_BASE_URL, CUSTOMER_API_BASE_URL} from "./config.js"
import {Order} from "./order.js";

import axios from "axios";
import {calculateTotalPrice, calculateProductPrice} from "./utils.js"

const getAllOrders = async (req, res) => {

    Order.find()
        .then((orders) => res.json(orders))
        .catch((err) => res.status(404).json({ msg: "No Orders found" }));
}

const postOrder = async (req, res) => {

    const reqBody = req.body;
    console.log(`Request body without JSON.stringify is ${reqBody}`);
    console.log(`Request body with JSON.stringify  ${JSON.stringify(reqBody)}`);

    const customerId = req.body.customerId;
    const items = req.body.items;
    const date = req.body.date;

    const resultOrderItems = [];

    // For Order-Items
    for (let index = 0; index < items.length; index ++){

        const item = items[index];

        const productId = item.productId;
        const noOfItems = item.noOfItems

        const resultOrderItem = {...item};

        const productGet = `${PRODUCT_API_BASE_URL}/${productId}`;
        const response = await axios.get(productGet);
        const responseData = await response.data;

        resultOrderItem.productName = responseData.name

        resultOrderItems.push(resultOrderItem);
    }

    // For Customer

    const customerGet = `${CUSTOMER_API_BASE_URL}/${customerId}`;
    const response = await axios.get(customerGet);
    const responseData = await response.data;
    const customerName = responseData.name;

    const totalPrice = await calculateTotalPrice(items);

    const newOrderObject = {
        customerName : customerName,
        orderItems : resultOrderItems,
        totalPrice : totalPrice,
        date,
    }

    Order.create(newOrderObject)
        .then((createdOrder) => {

            res.status(201).send(createdOrder)
        })
        .catch((error) => {
            console.log("Error creating Order", error)
        })
}

const getOrder = async (req, res) => {

    console.log("Params -> " + JSON.stringify(req.params));
    const orderID = req.params.id;

    console.log(`Order-ID is ${orderID}`);

    Order.findById(orderID)
        .then((orderObj) => {
            res.send(orderObj);
        })
        .catch((error) => {
            console.log("Error getting Order", error)

            const errorResponse = {
                message: `Order by id ${orderID} not found`,
                technicalMessage: 'Check the request parameter value sent as part of the URL'
            }
            res.status(404).send(errorResponse);
        })
}

export {getOrder, getAllOrders, postOrder}