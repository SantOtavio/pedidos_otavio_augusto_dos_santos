const crud = require("../../crud");
const tableName = "OrderProducts";

async function orderProductsRegister(data = {
    ProductId: "",
    Quantity: 0,
    OrderId: ""
}) {
    console.log("handler: ", data);
    if (!data.ProductId) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["ProductId"] }
    }

    if (!data.OrderId) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["OrderId"] }
    }

    if (data.Quantity == 0 || data.Quantity < 0 || data.Quantity == undefined || data.Quantity == null) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["Quantity"] }
    }

    if(verifyOrder(data.OrderId) != true){
        return { error: "0005", message: "The order especified don't exist!", necessaryActions: ["Fill with a valid order id!"] }
    }

    const orderProduct = await crud.save(tableName, undefined, data);
    return (orderProduct);
}

async function verifyOrder(OrderId){
    const ordersArr = [];
    ordersArr.push(await crud.get("Orders"));

    for(i = 0; i < ordersArr[0].length; i++){
        if(ordersArr[0][i].id == OrderId){
            return true;
        }
    }

    return false;
}

module.exports = {
    orderProductsRegister
}

