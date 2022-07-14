// package: user
// file: user.proto

import * as jspb from "google-protobuf";

export class RegisterRequest extends jspb.Message {
  getFirstname(): string;
  setFirstname(value: string): void;

  getLastname(): string;
  setLastname(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterRequest): RegisterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterRequest;
  static deserializeBinaryFromReader(message: RegisterRequest, reader: jspb.BinaryReader): RegisterRequest;
}

export namespace RegisterRequest {
  export type AsObject = {
    firstname: string,
    lastname: string,
    email: string,
    password: string,
  }
}

export class ExternalRegisterRequest extends jspb.Message {
  getAccesstoken(): string;
  setAccesstoken(value: string): void;

  getProvider(): ExternalRegisterRequest.ProviderMap[keyof ExternalRegisterRequest.ProviderMap];
  setProvider(value: ExternalRegisterRequest.ProviderMap[keyof ExternalRegisterRequest.ProviderMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExternalRegisterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ExternalRegisterRequest): ExternalRegisterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExternalRegisterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExternalRegisterRequest;
  static deserializeBinaryFromReader(message: ExternalRegisterRequest, reader: jspb.BinaryReader): ExternalRegisterRequest;
}

export namespace ExternalRegisterRequest {
  export type AsObject = {
    accesstoken: string,
    provider: ExternalRegisterRequest.ProviderMap[keyof ExternalRegisterRequest.ProviderMap],
  }

  export interface ProviderMap {
    FACEBOOK: 0;
    GOOGLE: 1;
  }

  export const Provider: ProviderMap;
}

export class AuthenticationResponse extends jspb.Message {
  getAccesstoken(): string;
  setAccesstoken(value: string): void;

  getId(): string;
  setId(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getRole(): string;
  setRole(value: string): void;

  getFirstname(): string;
  setFirstname(value: string): void;

  getLastname(): string;
  setLastname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AuthenticationResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AuthenticationResponse): AuthenticationResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AuthenticationResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AuthenticationResponse;
  static deserializeBinaryFromReader(message: AuthenticationResponse, reader: jspb.BinaryReader): AuthenticationResponse;
}

export namespace AuthenticationResponse {
  export type AsObject = {
    accesstoken: string,
    id: string,
    email: string,
    role: string,
    firstname: string,
    lastname: string,
  }
}

export class LoginRequest extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  getPassword(): string;
  setPassword(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoginRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LoginRequest): LoginRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoginRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoginRequest;
  static deserializeBinaryFromReader(message: LoginRequest, reader: jspb.BinaryReader): LoginRequest;
}

export namespace LoginRequest {
  export type AsObject = {
    email: string,
    password: string,
  }
}

