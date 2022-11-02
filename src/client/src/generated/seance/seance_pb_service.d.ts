// package: seance
// file: seance.proto

import * as seance_pb from "./seance_pb";
import {grpc} from "@improbable-eng/grpc-web";

type SeanceGetClosestSeances = {
  readonly methodName: string;
  readonly service: typeof Seance;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof seance_pb.GetClosestSeancesRequest;
  readonly responseType: typeof seance_pb.GetClosestSeancesResponse;
};

type SeanceGetSeatsBySeance = {
  readonly methodName: string;
  readonly service: typeof Seance;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof seance_pb.GetSeatsBySeanceRequest;
  readonly responseType: typeof seance_pb.GetSeatsBySeanceResponse;
};

type SeanceChooseSeat = {
  readonly methodName: string;
  readonly service: typeof Seance;
  readonly requestStream: true;
  readonly responseStream: true;
  readonly requestType: typeof seance_pb.ChooseSeatRequest;
  readonly responseType: typeof seance_pb.ChooseSeatResponse;
};

type SeanceDisconnect = {
  readonly methodName: string;
  readonly service: typeof Seance;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof seance_pb.DisconnectRequest;
  readonly responseType: typeof seance_pb.DisconnectResponse;
};

type SeanceGetSeanceDetails = {
  readonly methodName: string;
  readonly service: typeof Seance;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof seance_pb.GetSeanceDetailsRequest;
  readonly responseType: typeof seance_pb.GetSeanceDetailsResponse;
};

export class Seance {
  static readonly serviceName: string;
  static readonly GetClosestSeances: SeanceGetClosestSeances;
  static readonly GetSeatsBySeance: SeanceGetSeatsBySeance;
  static readonly ChooseSeat: SeanceChooseSeat;
  static readonly Disconnect: SeanceDisconnect;
  static readonly GetSeanceDetails: SeanceGetSeanceDetails;
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

export class SeanceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getClosestSeances(
    requestMessage: seance_pb.GetClosestSeancesRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: seance_pb.GetClosestSeancesResponse|null) => void
  ): UnaryResponse;
  getClosestSeances(
    requestMessage: seance_pb.GetClosestSeancesRequest,
    callback: (error: ServiceError|null, responseMessage: seance_pb.GetClosestSeancesResponse|null) => void
  ): UnaryResponse;
  getSeatsBySeance(
    requestMessage: seance_pb.GetSeatsBySeanceRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: seance_pb.GetSeatsBySeanceResponse|null) => void
  ): UnaryResponse;
  getSeatsBySeance(
    requestMessage: seance_pb.GetSeatsBySeanceRequest,
    callback: (error: ServiceError|null, responseMessage: seance_pb.GetSeatsBySeanceResponse|null) => void
  ): UnaryResponse;
  chooseSeat(metadata?: grpc.Metadata): BidirectionalStream<seance_pb.ChooseSeatRequest, seance_pb.ChooseSeatResponse>;
  disconnect(
    requestMessage: seance_pb.DisconnectRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: seance_pb.DisconnectResponse|null) => void
  ): UnaryResponse;
  disconnect(
    requestMessage: seance_pb.DisconnectRequest,
    callback: (error: ServiceError|null, responseMessage: seance_pb.DisconnectResponse|null) => void
  ): UnaryResponse;
  getSeanceDetails(
    requestMessage: seance_pb.GetSeanceDetailsRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: seance_pb.GetSeanceDetailsResponse|null) => void
  ): UnaryResponse;
  getSeanceDetails(
    requestMessage: seance_pb.GetSeanceDetailsRequest,
    callback: (error: ServiceError|null, responseMessage: seance_pb.GetSeanceDetailsResponse|null) => void
  ): UnaryResponse;
}

