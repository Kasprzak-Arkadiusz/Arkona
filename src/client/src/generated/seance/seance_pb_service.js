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

Seance.ChooseSeat = {
  methodName: "ChooseSeat",
  service: Seance,
  requestStream: true,
  responseStream: true,
  requestType: seance_pb.ChooseSeatRequest,
  responseType: seance_pb.ChooseSeatResponse
};

Seance.Disconnect = {
  methodName: "Disconnect",
  service: Seance,
  requestStream: false,
  responseStream: false,
  requestType: seance_pb.DisconnectRequest,
  responseType: seance_pb.DisconnectResponse
};

Seance.GetSeanceDetails = {
  methodName: "GetSeanceDetails",
  service: Seance,
  requestStream: false,
  responseStream: false,
  requestType: seance_pb.GetSeanceDetailsRequest,
  responseType: seance_pb.GetSeanceDetailsResponse
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

SeanceClient.prototype.chooseSeat = function chooseSeat(metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.client(Seance.ChooseSeat, {
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport
  });
  client.onEnd(function (status, statusMessage, trailers) {
    listeners.status.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners.end.forEach(function (handler) {
      handler({ code: status, details: statusMessage, metadata: trailers });
    });
    listeners = null;
  });
  client.onMessage(function (message) {
    listeners.data.forEach(function (handler) {
      handler(message);
    })
  });
  client.start(metadata);
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    write: function (requestMessage) {
      client.send(requestMessage);
      return this;
    },
    end: function () {
      client.finishSend();
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

SeanceClient.prototype.disconnect = function disconnect(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Seance.Disconnect, {
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

SeanceClient.prototype.getSeanceDetails = function getSeanceDetails(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Seance.GetSeanceDetails, {
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

