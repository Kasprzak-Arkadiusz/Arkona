// package: movie
// file: movie.proto

var movie_pb = require("./movie_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Movie = (function () {
  function Movie() {}
  Movie.serviceName = "movie.Movie";
  return Movie;
}());

Movie.GetLatestMovies = {
  methodName: "GetLatestMovies",
  service: Movie,
  requestStream: false,
  responseStream: false,
  requestType: movie_pb.GetLatestMoviesRequest,
  responseType: movie_pb.GetLatestMoviesResponse
};

Movie.GetMovies = {
  methodName: "GetMovies",
  service: Movie,
  requestStream: false,
  responseStream: false,
  requestType: movie_pb.GetMoviesRequest,
  responseType: movie_pb.GetMoviesResponse
};

Movie.GetFilteredMovies = {
  methodName: "GetFilteredMovies",
  service: Movie,
  requestStream: false,
  responseStream: false,
  requestType: movie_pb.GetFilteredMoviesRequest,
  responseType: movie_pb.GetMoviesResponse
};

Movie.GetMovieDetails = {
  methodName: "GetMovieDetails",
  service: Movie,
  requestStream: false,
  responseStream: false,
  requestType: movie_pb.GetMovieDetailsRequest,
  responseType: movie_pb.DetailedMovieInfo
};

Movie.AddMovie = {
  methodName: "AddMovie",
  service: Movie,
  requestStream: false,
  responseStream: false,
  requestType: movie_pb.AddMovieRequest,
  responseType: movie_pb.AddMovieResponse
};

exports.Movie = Movie;

function MovieClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MovieClient.prototype.getLatestMovies = function getLatestMovies(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Movie.GetLatestMovies, {
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

MovieClient.prototype.getMovies = function getMovies(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Movie.GetMovies, {
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

MovieClient.prototype.getFilteredMovies = function getFilteredMovies(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Movie.GetFilteredMovies, {
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

MovieClient.prototype.getMovieDetails = function getMovieDetails(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Movie.GetMovieDetails, {
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

MovieClient.prototype.addMovie = function addMovie(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Movie.AddMovie, {
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

exports.MovieClient = MovieClient;

