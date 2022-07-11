// package: user
// file: user.proto

import * as user_pb from "./user_pb";
import {grpc} from "@improbable-eng/grpc-web";

type UserRegister = {
  readonly methodName: string;
  readonly service: typeof User;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof user_pb.RegisterRequest;
  readonly responseType: typeof user_pb.RegisterResponse;
};

type UserExternalRegister = {
  readonly methodName: string;
  readonly service: typeof User;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof user_pb.ExternalRegisterRequest;
  readonly responseType: typeof user_pb.RegisterResponse;
};

type UserLogin = {
  readonly methodName: string;
  readonly service: typeof User;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof user_pb.LoginRequest;
  readonly responseType: typeof user_pb.LoginResponse;
};

export class User {
  static readonly serviceName: string;
  static readonly Register: UserRegister;
  static readonly ExternalRegister: UserExternalRegister;
  static readonly Login: UserLogin;
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

export class UserClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  register(
    requestMessage: user_pb.RegisterRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: user_pb.RegisterResponse|null) => void
  ): UnaryResponse;
  register(
    requestMessage: user_pb.RegisterRequest,
    callback: (error: ServiceError|null, responseMessage: user_pb.RegisterResponse|null) => void
  ): UnaryResponse;
  externalRegister(
    requestMessage: user_pb.ExternalRegisterRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: user_pb.RegisterResponse|null) => void
  ): UnaryResponse;
  externalRegister(
    requestMessage: user_pb.ExternalRegisterRequest,
    callback: (error: ServiceError|null, responseMessage: user_pb.RegisterResponse|null) => void
  ): UnaryResponse;
  login(
    requestMessage: user_pb.LoginRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: user_pb.LoginResponse|null) => void
  ): UnaryResponse;
  login(
    requestMessage: user_pb.LoginRequest,
    callback: (error: ServiceError|null, responseMessage: user_pb.LoginResponse|null) => void
  ): UnaryResponse;
}

