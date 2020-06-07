var request = require("request");

//API PARA GERAR CARGAS DE COMPRAS PARA TESTE

/*
    itemId pode ser obtido através da API https://api.streamelements.com/kappa/v2/store/{idDoCanal}/items
    procurando pelo nome do item. A propriedade a ser capturada é "_id"
*/

var queryParameters = {
  storeId: "5d477e675566932bdf329882",
  itemId: "5edc6487eec8529854b78e22",
  token:
    "Token",
};

var options = {
  method: "POST",
  url: `https://api.streamelements.com/kappa/v2/store/${queryParameters.storeId}/redemptions/${queryParameters.itemId}`,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization:
      `Bearer ${queryParameters.token}`,
  },
};

for (let i = 0; i < 25; i++) {
  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    
    console.log(response.statusCode);
    sleep(2);
  });
}


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
