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

