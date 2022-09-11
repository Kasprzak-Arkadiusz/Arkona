// package: ticketDiscount
// file: ticketDiscount.proto

var ticketDiscount_pb = require("./ticketDiscount_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var TicketDiscount = (function () {
  function TicketDiscount() {}
  TicketDiscount.serviceName = "ticketDiscount.TicketDiscount";
  return TicketDiscount;
}());

TicketDiscount.GetTicketDiscounts = {
  methodName: "GetTicketDiscounts",
  service: TicketDiscount,
  requestStream: false,
  responseStream: false,
  requestType: ticketDiscount_pb.EmptyRequest,
  responseType: ticketDiscount_pb.GetTicketDiscountsResponse
};

exports.TicketDiscount = TicketDiscount;

function TicketDiscountClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

TicketDiscountClient.prototype.getTicketDiscounts = function getTicketDiscounts(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(TicketDiscount.GetTicketDiscounts, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.TicketDiscountClient = TicketDiscountClient;

