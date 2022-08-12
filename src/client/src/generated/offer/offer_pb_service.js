// package: offer
// file: offer.proto

var offer_pb = require("./offer_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Offer = (function () {
  function Offer() {}
  Offer.serviceName = "offer.Offer";
  return Offer;
}());

Offer.GetLatestOffers = {
  methodName: "GetLatestOffers",
  service: Offer,
  requestStream: false,
  responseStream: false,
  requestType: offer_pb.GetLatestOffersRequest,
  responseType: offer_pb.GetLatestOffersResponse
};

exports.Offer = Offer;

function OfferClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

OfferClient.prototype.getLatestOffers = function getLatestOffers(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Offer.GetLatestOffers, {
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

exports.OfferClient = OfferClient;
