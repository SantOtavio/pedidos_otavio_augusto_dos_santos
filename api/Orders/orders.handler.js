const crud = require("../../crud");
const tableName = "Orders";

async function ordersRegister(data = {
    UserId: "",
    Status: ""
}) {
    console.log("handler: ", data);
    if (!data.UserId) {
        return { error: "0001", message: "Its necessary fill all requisition parameters right!", necessaryFields: ["UserId"] }
    }

    if (!data.Status) {
        return { error: "0001", message: "Its necessary fill all requisition parameters right!", necessaryFields: ["Status"] }
    }

    if (await haveAUser(data.UserId) != true) {
        return { error: "0004", message: "The user is not registered!", necessaryAction: ["Fill with a valid user!"] }
    }

    if (await userHaveOrders(data.UserId) == true) {
        return { error: "0003", message: "User have a open order!", necessaryAction: ["Close the open order!"] }
    }

    const ordersArr = [];
    ordersArr.push(await crud.get("Orders"))

    let Number = 0;

    if (await findNumber(ordersArr, data.UserId) != 0) {
        Number = await findNumber(ordersArr, data.UserId) + 1;
    } else {
        Number = 1;
    }

    data = {
        UserId: data.UserId,
        Status: data.Status,
        Number: Number
    }

    console.log(data);

    const order = await crud.save(tableName, undefined, data);
    return (order);
}

async function findNumber(ordersArr = [], UserId) {
    const numberArr = [];

    for (i = 0; i < ordersArr[0].length; i++) {
        if (ordersArr[0][i].UserId == UserId) {
            numberArr.push({ number: ordersArr[0][i].Number });
        }
    }

    var bigger = 0;

    for (i = 0; i < numberArr.length; i++) {
        if (bigger < numberArr[i].number) {
            bigger = numberArr[i].number
        }
    }

    return bigger;
}

async function userHaveOrders(UserId) {
    const ordersArr = [];
    ordersArr.push(await crud.get("Orders"));

    for (i = 0; i < ordersArr[0].length; i++) {
        if (ordersArr[0][i].UserId == UserId) {
            if (ordersArr[0][i].Status == 'Open') {
                return true;
            }
        }
    }

    return false;
}

async function haveAUser(UserId) {
    const usersArr = [];
    usersArr.push(await crud.get("Users"));

    for (i = 0; i < usersArr[0].length; i++) {
        if (usersArr[0][i].id == UserId) {
            return true;
        }
    }
    return false;
}

module.exports = {
    ordersRegister
}

