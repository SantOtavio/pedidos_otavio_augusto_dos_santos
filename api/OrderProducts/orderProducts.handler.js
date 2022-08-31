const crud = require("../../crud");
const tableName = "OrderProducts";

async function orderProductsRegister(data = {
    ProductId: "",
    Quantity: 0,
    OrderId: ""
}) {
    let id_IfIsEqualAnother = 0;
    if (!data.ProductId) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["ProductId"] }
    }

    if (!data.OrderId) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["OrderId"] }
    }

    if (data.Quantity == 0 || data.Quantity < 0 || data.Quantity == undefined || data.Quantity == null) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["Quantity"] }
    }

    if (await verifyOrder(data.OrderId) != true) {
        return { error: "0005", message: "The order especified don't exist!", necessaryActions: ["Fill with a valid order id!"] }
    }

    if (await verifyIfOrderIsOpen(data.OrderId) != true) {
        return { error: "0006", message: "The order especified is closed!", necessaryActions: ["Fill with a open order!"] }
    }

    if (await verifyIfHaveAnEqualProduct(data.ProductId) != false) {
        let testObjet = await verifyIfHaveAnEqualProduct(data.ProductId);
        data.Quantity = testObjet.quantity + data.Quantity
        id_IfIsEqualAnother = testObjet.id;
    }

    if (id_IfIsEqualAnother > 0) {
        const orderProduct = await crud.save(tableName, id_IfIsEqualAnother, data);
        return (orderProduct);
    } else {
        const orderProduct = await crud.save(tableName, undefined, data);
        return (orderProduct);
    }
}

async function verifyOrder(OrderId) {
    const ordersArr = [];
    ordersArr.push(await crud.get("Orders"));

    for (i = 0; i < ordersArr[0].length; i++) {
        if (ordersArr[0][i].id == OrderId) {
            return true;
        }
    }

    return false;
}

async function verifyIfOrderIsOpen(OrderId) {
    const ordersArr = [];
    ordersArr.push(await crud.get("Orders"));

    for (i = 0; i < ordersArr[0].length; i++) {
        if (ordersArr[0][i].id == OrderId) {
            if (ordersArr[0][i].Status == "Open") {
                return true;
            }
        }
    }

    return false;
}

async function verifyIfHaveAnEqualProduct(ProductId) {
    const orderProductsArr = [];
    orderProductsArr.push(await crud.get("OrderProducts"));

    for (i = 0; i < orderProductsArr[0].length; i++) {
        if (orderProductsArr[0][i].ProductId == ProductId) {
            return { quantity: orderProductsArr[0][i].Quantity, id: orderProductsArr[0][i].id }
        }
    }

    return false
}

module.exports = {
    orderProductsRegister
}

