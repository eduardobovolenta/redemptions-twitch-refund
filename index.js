var request = require("request");

// API PARA REFUND


/*
    Datas no formato de "YYYY-MM-DDTHH:MM:SSZ";

    ChannelId pode ser obtido através desta API (_id):
    https://api.streamelements.com/kappa/v2/channels/{NomeDoCanal}

    AuthToken pode ser obtido no dashboard (Show Secrets) da SE pelo link:,
    https://streamelements.com/dashboard/account/channels

*/

var queryParameters = {
  dateFrom: "2020-05-16T00:00:00Z",
  dateUntil: "2020-09-01T00:00:01Z",
  itemName: "teste",
  storeId: "IdDaLojaDoCanal",
  token:
    "Token",
};

// requeste de search de compras, filtrando por datas e nome do item (o 9999 é o tanto que você quer pegar de uma vez)
var options = {
  method: "GET",
  url: `https://api.streamelements.com/kappa/v2/store/${queryParameters.storeId}/redemptions/search?from=${queryParameters.dateFrom}&limit=9999&offset=0&page=1&pending=true&search=${queryParameters.itemName}&searchBy=item.name&sort=%7B"updatedAt":-1%7D&to=${queryParameters.dateUntil}`,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${queryParameters.token}`,
  },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  var jsonParseBoughts = JSON.parse(body);

  var refunds = [];
  for (let index = 0; index < jsonParseBoughts.docs.length; index++) {
    var id = jsonParseBoughts.docs[index]._id;
    refunds.push(id);
    //obtem todos os IDs de compras da busca acima
  }

  for (let index = 0; index < refunds.length; index++) {
    var toRefund = refunds[index];

    var resources = {
      _id: `${toRefund}`,
      channel: queryParameters.storeId,
      completed: true,
      rejected: true,
    };

    //atualiza as compras uma a uma colocando como completada e rejeitada
    var refundRequest = {
      method: "PUT",
      url: `https://api.streamelements.com/kappa/v2/store/${queryParameters.storeId}/redemptions/${toRefund}`,
      headers: {
        accept: "application/json",
        "content-type": "application/json; charset=utf-8",
        Authorization:
          `Bearer ${queryParameters.token}`,
      },
      body: resources,
      json: true,
      mode: "cors",
    };

    request(refundRequest, function (error, response, body) {
      if (error) throw new Error(error);

      console.log("Refund realizado com sucesso! " + index);
    });
  }
});

