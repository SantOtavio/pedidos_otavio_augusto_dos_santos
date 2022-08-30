const crud = require("../../crud");
const tableName = "Products";

//1 - Receber data por parâmetro:
//Name
//Price

//2 - Verificar se o Name foi preenchido

//3 - Verificar se o Price foi preenchida

//4 - Retornar um erro caso não atenda alguma das condições

//5 - Realizar o cadastro do Products

//6 - Retornar o sucesso do cadastro do Products

async function productsRegister(data = {
    Name: "",
    Price: 0
}) {
    console.log("handler: ", data);
    if (!data.Name) {
        return { error: "0001", message: "Its necessary fill all requisition parameters right!", necessaryFields: ["Name"] }
    }

    if (data.Price == 0 || data.Price < 0) {
        return { error: "0001", message: "Its necessary fill all requisition parameters right!", necessaryFields: ["Price"] }
    }

    const product = await crud.save(tableName, undefined, data);
    return (product);
}

module.exports = {
    productsRegister
}

