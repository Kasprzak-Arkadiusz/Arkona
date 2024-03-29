// package: movie
// file: movie.proto

import * as movie_pb from "./movie_pb";
import {grpc} from "@improbable-eng/grpc-web";

type MovieGetLatestMovies = {
  readonly methodName: string;
  readonly service: typeof Movie;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof movie_pb.GetLatestMoviesRequest;
  readonly responseType: typeof movie_pb.GetLatestMoviesResponse;
};

type MovieGetMovies = {
  readonly methodName: string;
  readonly service: typeof Movie;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof movie_pb.GetMoviesRequest;
  readonly responseType: typeof movie_pb.GetMoviesResponse;
};

type MovieGetFilteredMovies = {
  readonly methodName: string;
  readonly service: typeof Movie;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof movie_pb.GetFilteredMoviesRequest;
  readonly responseType: typeof movie_pb.GetMoviesResponse;
};

type MovieGetMovieDetails = {
  readonly methodName: string;
  readonly service: typeof Movie;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof movie_pb.GetMovieDetailsRequest;
  readonly responseType: typeof movie_pb.DetailedMovieInfo;
};

type MovieAddMovie = {
  readonly methodName: string;
  readonly service: typeof Movie;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof movie_pb.AddMovieRequest;
  readonly responseType: typeof movie_pb.AddMovieResponse;
};

type MovieUpdateMovie = {
  readonly methodName: string;
  readonly service: typeof Movie;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof movie_pb.UpdateMovieRequest;
  readonly responseType: typeof movie_pb.UpdateMovieResponse;
};

export class Movie {
  static readonly serviceName: string;
  static readonly GetLatestMovies: MovieGetLatestMovies;
  static readonly GetMovies: MovieGetMovies;
  static readonly GetFilteredMovies: MovieGetFilteredMovies;
  static readonly GetMovieDetails: MovieGetMovieDetails;
  static readonly AddMovie: MovieAddMovie;
  static readonly UpdateMovie: MovieUpdateMovie;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class MovieClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getLatestMovies(
    requestMessage: movie_pb.GetLatestMoviesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: movie_pb.GetLatestMoviesResponse|null) => void
  ): UnaryResponse;
  getLatestMovies(
    requestMessage: movie_pb.GetLatestMoviesRequest,
    callback: (error: ServiceError|null, responseMessage: movie_pb.GetLatestMoviesResponse|null) => void
  ): UnaryResponse;
  getMovies(
    requestMessage: movie_pb.GetMoviesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: movie_pb.GetMoviesResponse|null) => void
  ): UnaryResponse;
  getMovies(
    requestMessage: movie_pb.GetMoviesRequest,
    callback: (error: ServiceError|null, responseMessage: movie_pb.GetMoviesResponse|null) => void
  ): UnaryResponse;
  getFilteredMovies(
    requestMessage: movie_pb.GetFilteredMoviesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: movie_pb.GetMoviesResponse|null) => void
  ): UnaryResponse;
  getFilteredMovies(
    requestMessage: movie_pb.GetFilteredMoviesRequest,
    callback: (error: ServiceError|null, responseMessage: movie_pb.GetMoviesResponse|null) => void
  ): UnaryResponse;
  getMovieDetails(
    requestMessage: movie_pb.GetMovieDetailsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: movie_pb.DetailedMovieInfo|null) => void
  ): UnaryResponse;
  getMovieDetails(
    requestMessage: movie_pb.GetMovieDetailsRequest,
    callback: (error: ServiceError|null, responseMessage: movie_pb.DetailedMovieInfo|null) => void
  ): UnaryResponse;
  addMovie(
    requestMessage: movie_pb.AddMovieRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: movie_pb.AddMovieResponse|null) => void
  ): UnaryResponse;
  addMovie(
    requestMessage: movie_pb.AddMovieRequest,
    callback: (error: ServiceError|null, responseMessage: movie_pb.AddMovieResponse|null) => void
  ): UnaryResponse;
  updateMovie(
    requestMessage: movie_pb.UpdateMovieRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: movie_pb.UpdateMovieResponse|null) => void
  ): UnaryResponse;
  updateMovie(
    requestMessage: movie_pb.UpdateMovieRequest,
    callback: (error: ServiceError|null, responseMessage: movie_pb.UpdateMovieResponse|null) => void
  ): UnaryResponse;
}

