// package: order
// file: order.proto

import * as order_pb from "./order_pb";
import {grpc} from "@improbable-eng/grpc-web";

type OrderGetTotalPrice = {
  readonly methodName: string;
  readonly service: typeof Order;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof order_pb.GetTotalPriceRequest;
  readonly responseType: typeof order_pb.GetTotalPriceResponse;
};

export class Order {
  static readonly serviceName: string;
  static readonly GetTotalPrice: OrderGetTotalPrice;
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

export class OrderClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  getTotalPrice(
    requestMessage: order_pb.GetTotalPriceRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: order_pb.GetTotalPriceResponse|null) => void
  ): UnaryResponse;
  getTotalPrice(
    requestMessage: order_pb.GetTotalPriceRequest,
    callback: (error: ServiceError|null, responseMessage: order_pb.GetTotalPriceResponse|null) => void
  ): UnaryResponse;
}

