// package: ticketDiscount
// file: ticketDiscount.proto

import * as jspb from "google-protobuf";

export class EmptyRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyRequest;
  static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
  export type AsObject = {
  }
}

export class GetTicketDiscountsResponse extends jspb.Message {
  clearTicketdiscountList(): void;
  getTicketdiscountList(): Array<TicketDiscountsDetails>;
  setTicketdiscountList(value: Array<TicketDiscountsDetails>): void;
  addTicketdiscount(value?: TicketDiscountsDetails, index?: number): TicketDiscountsDetails;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTicketDiscountsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTicketDiscountsResponse): GetTicketDiscountsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetTicketDiscountsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTicketDiscountsResponse;
  static deserializeBinaryFromReader(message: GetTicketDiscountsResponse, reader: jspb.BinaryReader): GetTicketDiscountsResponse;
}

export namespace GetTicketDiscountsResponse {
  export type AsObject = {
    ticketdiscountList: Array<TicketDiscountsDetails.AsObject>,
  }
}

export class TicketDiscountsDetails extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getName(): string;
  setName(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getDiscountvalue(): string;
  setDiscountvalue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TicketDiscountsDetails.AsObject;
  static toObject(includeInstance: boolean, msg: TicketDiscountsDetails): TicketDiscountsDetails.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TicketDiscountsDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TicketDiscountsDetails;
  static deserializeBinaryFromReader(message: TicketDiscountsDetails, reader: jspb.BinaryReader): TicketDiscountsDetails;
}

export namespace TicketDiscountsDetails {
  export type AsObject = {
    id: number,
    name: string,
    description: string,
    discountvalue: string,
  }
}

