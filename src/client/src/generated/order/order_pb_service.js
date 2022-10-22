// package: order
// file: order.proto

var order_pb = require("./order_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Order = (function () {
  function Order() {}
  Order.serviceName = "order.Order";
  return Order;
}());

Order.GetTotalPrice = {
  methodName: "GetTotalPrice",
  service: Order,
  requestStream: false,
  responseStream: false,
  requestType: order_pb.GetTotalPriceRequest,
  responseType: order_pb.GetTotalPriceResponse
};

exports.Order = Order;

function OrderClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

OrderClient.prototype.getTotalPrice = function getTotalPrice(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Order.GetTotalPrice, {
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

exports.OrderClient = OrderClient;

