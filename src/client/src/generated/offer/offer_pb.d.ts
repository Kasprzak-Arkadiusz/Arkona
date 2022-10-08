// package: offer
// file: offer.proto

import * as jspb from "google-protobuf";

export class GetLatestOffersRequest extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLatestOffersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLatestOffersRequest): GetLatestOffersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLatestOffersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLatestOffersRequest;
  static deserializeBinaryFromReader(message: GetLatestOffersRequest, reader: jspb.BinaryReader): GetLatestOffersRequest;
}

export namespace GetLatestOffersRequest {
  export type AsObject = {
    count: number,
  }
}

export class GetLatestOffersResponse extends jspb.Message {
  clearOffersList(): void;
  getOffersList(): Array<GeneralOfferInfo>;
  setOffersList(value: Array<GeneralOfferInfo>): void;
  addOffers(value?: GeneralOfferInfo, index?: number): GeneralOfferInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLatestOffersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLatestOffersResponse): GetLatestOffersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLatestOffersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLatestOffersResponse;
  static deserializeBinaryFromReader(message: GetLatestOffersResponse, reader: jspb.BinaryReader): GetLatestOffersResponse;
}

export namespace GetLatestOffersResponse {
  export type AsObject = {
    offersList: Array<GeneralOfferInfo.AsObject>,
  }
}

export class GeneralOfferInfo extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getImage(): Uint8Array | string;
  getImage_asU8(): Uint8Array;
  getImage_asB64(): string;
  setImage(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeneralOfferInfo.AsObject;
  static toObject(includeInstance: boolean, msg: GeneralOfferInfo): GeneralOfferInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GeneralOfferInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeneralOfferInfo;
  static deserializeBinaryFromReader(message: GeneralOfferInfo, reader: jspb.BinaryReader): GeneralOfferInfo;
}

export namespace GeneralOfferInfo {
  export type AsObject = {
    id: number,
    name: string,
    image: Uint8Array | string,
  }
}

export class GetAvailableOffersRequest extends jspb.Message {
  getSeanceid(): number;
  setSeanceid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAvailableOffersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetAvailableOffersRequest): GetAvailableOffersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAvailableOffersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAvailableOffersRequest;
  static deserializeBinaryFromReader(message: GetAvailableOffersRequest, reader: jspb.BinaryReader): GetAvailableOffersRequest;
}

export namespace GetAvailableOffersRequest {
  export type AsObject = {
    seanceid: number,
  }
}

export class GetAvailableOffersResponse extends jspb.Message {
  clearOffersList(): void;
  getOffersList(): Array<AvailableOfferInfo>;
  setOffersList(value: Array<AvailableOfferInfo>): void;
  addOffers(value?: AvailableOfferInfo, index?: number): AvailableOfferInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAvailableOffersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetAvailableOffersResponse): GetAvailableOffersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetAvailableOffersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetAvailableOffersResponse;
  static deserializeBinaryFromReader(message: GetAvailableOffersResponse, reader: jspb.BinaryReader): GetAvailableOffersResponse;
}

export namespace GetAvailableOffersResponse {
  export type AsObject = {
    offersList: Array<AvailableOfferInfo.AsObject>,
  }
}

export class AvailableOfferInfo extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getMintickets(): number;
  setMintickets(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AvailableOfferInfo.AsObject;
  static toObject(includeInstance: boolean, msg: AvailableOfferInfo): AvailableOfferInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: AvailableOfferInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AvailableOfferInfo;
  static deserializeBinaryFromReader(message: AvailableOfferInfo, reader: jspb.BinaryReader): AvailableOfferInfo;
}

export namespace AvailableOfferInfo {
  export type AsObject = {
    id: number,
    name: string,
    description: string,
    mintickets: number,
  }
}

export class GetOfferByIdRequest extends jspb.Message {
  getOfferid(): number;
  setOfferid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOfferByIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetOfferByIdRequest): GetOfferByIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetOfferByIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOfferByIdRequest;
  static deserializeBinaryFromReader(message: GetOfferByIdRequest, reader: jspb.BinaryReader): GetOfferByIdRequest;
}

export namespace GetOfferByIdRequest {
  export type AsObject = {
    offerid: number,
  }
}

export class GetOfferByIdResponse extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOfferByIdResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetOfferByIdResponse): GetOfferByIdResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetOfferByIdResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOfferByIdResponse;
  static deserializeBinaryFromReader(message: GetOfferByIdResponse, reader: jspb.BinaryReader): GetOfferByIdResponse;
}

export namespace GetOfferByIdResponse {
  export type AsObject = {
    id: number,
    name: string,
  }
}

