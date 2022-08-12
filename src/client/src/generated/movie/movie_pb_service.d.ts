// package: movie
// file: movie.proto

import * as movie_pb from "./movie_pb";
import {grpc} from "@improbable-eng/grpc-web";

type MovieGetMovies = {
  readonly methodName: string;
  readonly service: typeof Movie;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof movie_pb.GetMoviesRequest;
  readonly responseType: typeof movie_pb.GetMoviesResponse;
};

export class Movie {
  static readonly serviceName: string;
  static readonly GetMovies: MovieGetMovies;
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
  getMovies(
    requestMessage: movie_pb.GetMoviesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: movie_pb.GetMoviesResponse|null) => void
  ): UnaryResponse;
  getMovies(
    requestMessage: movie_pb.GetMoviesRequest,
    callback: (error: ServiceError|null, responseMessage: movie_pb.GetMoviesResponse|null) => void
  ): UnaryResponse;
}
