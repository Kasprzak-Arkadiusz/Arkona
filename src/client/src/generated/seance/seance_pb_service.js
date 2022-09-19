// package: seance
// file: seance.proto

var seance_pb = require("./seance_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Seance = (function () {
  function Seance() {}
  Seance.serviceName = "seance.Seance";
  return Seance;
}());

Seance.GetClosestSeances = {
  methodName: "GetClosestSeances",
  service: Seance,
  requestStream: false,
  responseStream: false,
  requestType: seance_pb.GetClosestSeancesRequest,
  responseType: seance_pb.GetClosestSeancesResponse
};

Seance.GetSeatsBySeance = {
  methodName: "GetSeatsBySeance",
  service: Seance,
  requestStream: false,
  responseStream: false,
  requestType: seance_pb.GetSeatsBySeanceRequest,
  responseType: seance_pb.GetSeatsBySeanceResponse
};

exports.Seance = Seance;

function SeanceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

SeanceClient.prototype.getClosestSeances = function getClosestSeances(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Seance.GetClosestSeances, {
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

SeanceClient.prototype.getSeatsBySeance = function getSeatsBySeance(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Seance.GetSeatsBySeance, {
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

exports.SeanceClient = SeanceClient;

