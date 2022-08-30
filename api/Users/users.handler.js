const crud = require("../../crud");
const tableName = "Users";

//1 - Receber data por parâmetro:
//CPF
//Name
//Surname

//2 - Verificar se o CPF foi preenchido

//3 - Verificar se o Name foi preenchida

//4 - Verificar se o Surname foi preenchida

//5 - Retornar um erro caso não atenda alguma das condições

//6 - Realizar o cadastro do User

//7 - Retornar o sucesso do cadastro do User

async function userRegister(data = {
    CPF: "",
    Name: "",
    Surname: ""
}) {
    console.log("handler: ", data);
    if (!data.CPF) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["CPF"] }
    }

    if (!data.Name) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["Name"] }
    }

    if (!data.Surname) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["Surname"] }
    }

    const user = await crud.save(tableName, undefined, data);
    return (user);
}

async function getUsers(){
    return await crud.get("Users");
}

module.exports = {
    userRegister,
    getUsers
}

