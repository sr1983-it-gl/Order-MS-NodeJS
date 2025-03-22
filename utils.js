
import {PRODUCT_API_BASE_URL} from "./config.js"
import axios from "axios";

const calculateTotalPrice = async (items) => {

    let totalPrice = 0;

    for (let index = 0; index < items.length; index ++){

        const item = items[index];

        const productId = item.productId
        const noOfItems = item.noOfItems;

        const productPrice = await calculateProductPrice(productId);
        totalPrice = totalPrice + (productPrice * noOfItems);

    }
    return totalPrice;
}

const calculateProductPrice = async (productId) => {

    // let productPrice = -1;

    const productGet = `${PRODUCT_API_BASE_URL}/${productId}`;
    console.log(`Product API Get URL -> ${productGet}`);

    const response = await axios.get(productGet);

    const responseData = await response.data;

    console.log(`Product Price in then block ${responseData.cost}`)

    return responseData.cost;

}

export {calculateProductPrice, calculateTotalPrice}