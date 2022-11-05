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
  getDiscountid(): number;
  setDiscountid(value: number): void;

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
    discountid: number,
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

export class FinalizeOrderRequest extends jspb.Message {
  clearSeatidsList(): void;
  getSeatidsList(): Array<number>;
  setSeatidsList(value: Array<number>): void;
  addSeatids(value: number, index?: number): number;

  clearSelectedticketsList(): void;
  getSelectedticketsList(): Array<SelectedTicket>;
  setSelectedticketsList(value: Array<SelectedTicket>): void;
  addSelectedtickets(value?: SelectedTicket, index?: number): SelectedTicket;

  getUserid(): string;
  setUserid(value: string): void;

  getOfferid(): number;
  setOfferid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FinalizeOrderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FinalizeOrderRequest): FinalizeOrderRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FinalizeOrderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FinalizeOrderRequest;
  static deserializeBinaryFromReader(message: FinalizeOrderRequest, reader: jspb.BinaryReader): FinalizeOrderRequest;
}

export namespace FinalizeOrderRequest {
  export type AsObject = {
    seatidsList: Array<number>,
    selectedticketsList: Array<SelectedTicket.AsObject>,
    userid: string,
    offerid: number,
  }
}

export class FinalizeOrderResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FinalizeOrderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: FinalizeOrderResponse): FinalizeOrderResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FinalizeOrderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FinalizeOrderResponse;
  static deserializeBinaryFromReader(message: FinalizeOrderResponse, reader: jspb.BinaryReader): FinalizeOrderResponse;
}

export namespace FinalizeOrderResponse {
  export type AsObject = {
  }
}

export class GetUserOrdersRequest extends jspb.Message {
  getUserid(): string;
  setUserid(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserOrdersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserOrdersRequest): GetUserOrdersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserOrdersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserOrdersRequest;
  static deserializeBinaryFromReader(message: GetUserOrdersRequest, reader: jspb.BinaryReader): GetUserOrdersRequest;
}

export namespace GetUserOrdersRequest {
  export type AsObject = {
    userid: string,
  }
}

export class GetUserOrdersResponse extends jspb.Message {
  clearOrdersList(): void;
  getOrdersList(): Array<UserOrderDetails>;
  setOrdersList(value: Array<UserOrderDetails>): void;
  addOrders(value?: UserOrderDetails, index?: number): UserOrderDetails;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetUserOrdersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetUserOrdersResponse): GetUserOrdersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetUserOrdersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetUserOrdersResponse;
  static deserializeBinaryFromReader(message: GetUserOrdersResponse, reader: jspb.BinaryReader): GetUserOrdersResponse;
}

export namespace GetUserOrdersResponse {
  export type AsObject = {
    ordersList: Array<UserOrderDetails.AsObject>,
  }
}

export class UserOrderDetails extends jspb.Message {
  getOrdernumber(): string;
  setOrdernumber(value: string): void;

  getDateofpurchase(): string;
  setDateofpurchase(value: string): void;

  getMovietitle(): string;
  setMovietitle(value: string): void;

  getDateofseance(): string;
  setDateofseance(value: string): void;

  getTotalprice(): string;
  setTotalprice(value: string): void;

  getHallnumber(): number;
  setHallnumber(value: number): void;

  clearTicketsList(): void;
  getTicketsList(): Array<TicketDetails>;
  setTicketsList(value: Array<TicketDetails>): void;
  addTickets(value?: TicketDetails, index?: number): TicketDetails;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserOrderDetails.AsObject;
  static toObject(includeInstance: boolean, msg: UserOrderDetails): UserOrderDetails.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserOrderDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserOrderDetails;
  static deserializeBinaryFromReader(message: UserOrderDetails, reader: jspb.BinaryReader): UserOrderDetails;
}

export namespace UserOrderDetails {
  export type AsObject = {
    ordernumber: string,
    dateofpurchase: string,
    movietitle: string,
    dateofseance: string,
    totalprice: string,
    hallnumber: number,
    ticketsList: Array<TicketDetails.AsObject>,
  }
}

export class TicketDetails extends jspb.Message {
  getSeatnumber(): number;
  setSeatnumber(value: number): void;

  getPrice(): string;
  setPrice(value: string): void;

  getDiscountname(): string;
  setDiscountname(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TicketDetails.AsObject;
  static toObject(includeInstance: boolean, msg: TicketDetails): TicketDetails.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TicketDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TicketDetails;
  static deserializeBinaryFromReader(message: TicketDetails, reader: jspb.BinaryReader): TicketDetails;
}

export namespace TicketDetails {
  export type AsObject = {
    seatnumber: number,
    price: string,
    discountname: string,
  }
}

