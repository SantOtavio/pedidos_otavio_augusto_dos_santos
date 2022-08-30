const crud = require("./crud");



async function userRegister(data = {
    CPF: "",
    name: "",
    surname: ""
}) {
    if (!data.CPF) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["CPF"] }
    }

    if (!data.name) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["Name"] }
    }

    if (!data.surname) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["Surname"] }
    }

    if (await verifyUserRegistered(data.CPF)) {
        return { error: "0002", message: "", situacao: "Algum autor não foi encontrado no sistema!" }
    }

    const user = await crud.save(tableName, undefined, data);
    return (user);
}

async function userRegisterTEST(data = {
    CPF: "",
    name: "",
    surname: ""
}) {
    if (!data.CPF) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["CPF"] }
    }

    if (!data.name) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["Name"] }
    }

    if (!data.surname) {
        return { error: "0001", message: "Its necessary fill all requisition parameters!", necessaryFields: ["Surname"] }
    }

    const user = await crud.save("Users", undefined, data);
    return (user);
}


async function verifyUserRegistered(CPF){
    console.log(await crud.getWithFilter("Users" , CPF,  "=" , Users.cpf));
    return true;
}

async function execute(){
    userRegisterTEST({
        CPF: "123",
        name: "Otavio",
        surname: "Santos"
    })

    userRegister({
        CPF: "123",
        name: "Otavio",
        surname: "Santos"
    })
}

execute();
