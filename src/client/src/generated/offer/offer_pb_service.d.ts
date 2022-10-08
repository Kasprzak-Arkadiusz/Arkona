// package: offer
// file: offer.proto

import * as offer_pb from "./offer_pb";
import {grpc} from "@improbable-eng/grpc-web";

type OfferGetLatestOffers = {
  readonly methodName: string;
  readonly service: typeof Offer;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof offer_pb.GetLatestOffersRequest;
  readonly responseType: typeof offer_pb.GetLatestOffersResponse;
};

type OfferGetAvailableOffers = {
  readonly methodName: string;
  readonly service: typeof Offer;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof offer_pb.GetAvailableOffersRequest;
  readonly responseType: typeof offer_pb.GetAvailableOffersResponse;
};

type OfferGetOfferById = {
  readonly methodName: string;
  readonly service: typeof Offer;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof offer_pb.GetOfferByIdRequest;
  readonly responseType: typeof offer_pb.GetOfferByIdResponse;
};

export class Offer {
  static readonly serviceName: string;
  static readonly GetLatestOffers: OfferGetLatestOffers;
  static readonly GetAvailableOffers: OfferGetAvailableOffers;
  static readonly GetOfferById: OfferGetOfferById;
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

export class OfferClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getLatestOffers(
    requestMessage: offer_pb.GetLatestOffersRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: offer_pb.GetLatestOffersResponse|null) => void
  ): UnaryResponse;
  getLatestOffers(
    requestMessage: offer_pb.GetLatestOffersRequest,
    callback: (error: ServiceError|null, responseMessage: offer_pb.GetLatestOffersResponse|null) => void
  ): UnaryResponse;
  getAvailableOffers(
    requestMessage: offer_pb.GetAvailableOffersRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: offer_pb.GetAvailableOffersResponse|null) => void
  ): UnaryResponse;
  getAvailableOffers(
    requestMessage: offer_pb.GetAvailableOffersRequest,
    callback: (error: ServiceError|null, responseMessage: offer_pb.GetAvailableOffersResponse|null) => void
  ): UnaryResponse;
  getOfferById(
    requestMessage: offer_pb.GetOfferByIdRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: offer_pb.GetOfferByIdResponse|null) => void
  ): UnaryResponse;
  getOfferById(
    requestMessage: offer_pb.GetOfferByIdRequest,
    callback: (error: ServiceError|null, responseMessage: offer_pb.GetOfferByIdResponse|null) => void
  ): UnaryResponse;
}

