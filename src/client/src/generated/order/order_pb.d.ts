// package: order
// file: order.proto

import * as jspb from "google-protobuf";

export class GetTotalPriceRequest extends jspb.Message {
  clearSelectedticketsList(): void;
  getSelectedticketsList(): Array<SelectedTicket>;
  setSelectedticketsList(value: Array<SelectedTicket>): void;
  addSelectedtickets(value?: SelectedTicket, index?: number): SelectedTicket;

  getOfferid(): number;
  setOfferid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTotalPriceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTotalPriceRequest): GetTotalPriceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTotalPriceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTotalPriceRequest;
  static deserializeBinaryFromReader(message: GetTotalPriceRequest, reader: jspb.BinaryReader): GetTotalPriceRequest;
}

export namespace GetTotalPriceRequest {
  export type AsObject = {
    selectedticketsList: Array<SelectedTicket.AsObject>,
    offerid: number,
  }
}

export class SelectedTicket extends jspb.Message {
  getDiscountvalue(): number;
  setDiscountvalue(value: number): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SelectedTicket.AsObject;
  static toObject(includeInstance: boolean, msg: SelectedTicket): SelectedTicket.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SelectedTicket, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SelectedTicket;
  static deserializeBinaryFromReader(message: SelectedTicket, reader: jspb.BinaryReader): SelectedTicket;
}

export namespace SelectedTicket {
  export type AsObject = {
    discountvalue: number,
    count: number,
  }
}

export class GetTotalPriceResponse extends jspb.Message {
  getPrice(): number;
  setPrice(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTotalPriceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTotalPriceResponse): GetTotalPriceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTotalPriceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTotalPriceResponse;
  static deserializeBinaryFromReader(message: GetTotalPriceResponse, reader: jspb.BinaryReader): GetTotalPriceResponse;
}

export namespace GetTotalPriceResponse {
  export type AsObject = {
    price: number,
  }
}

