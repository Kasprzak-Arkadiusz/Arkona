// package: seance
// file: seance.proto

import * as jspb from "google-protobuf";

export class GetClosestSeancesRequest extends jspb.Message {
  getMovieid(): number;
  setMovieid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetClosestSeancesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetClosestSeancesRequest): GetClosestSeancesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetClosestSeancesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetClosestSeancesRequest;
  static deserializeBinaryFromReader(message: GetClosestSeancesRequest, reader: jspb.BinaryReader): GetClosestSeancesRequest;
}

export namespace GetClosestSeancesRequest {
  export type AsObject = {
    movieid: number,
  }
}

export class GetClosestSeancesResponse extends jspb.Message {
  clearValuesList(): void;
  getValuesList(): Array<SeanceInfoArray>;
  setValuesList(value: Array<SeanceInfoArray>): void;
  addValues(value?: SeanceInfoArray, index?: number): SeanceInfoArray;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetClosestSeancesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetClosestSeancesResponse): GetClosestSeancesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetClosestSeancesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetClosestSeancesResponse;
  static deserializeBinaryFromReader(message: GetClosestSeancesResponse, reader: jspb.BinaryReader): GetClosestSeancesResponse;
}

export namespace GetClosestSeancesResponse {
  export type AsObject = {
    valuesList: Array<SeanceInfoArray.AsObject>,
  }
}

export class SeanceInfoArray extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  clearSeancesList(): void;
  getSeancesList(): Array<SeanceInfo>;
  setSeancesList(value: Array<SeanceInfo>): void;
  addSeances(value?: SeanceInfo, index?: number): SeanceInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SeanceInfoArray.AsObject;
  static toObject(includeInstance: boolean, msg: SeanceInfoArray): SeanceInfoArray.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SeanceInfoArray, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SeanceInfoArray;
  static deserializeBinaryFromReader(message: SeanceInfoArray, reader: jspb.BinaryReader): SeanceInfoArray;
}

export namespace SeanceInfoArray {
  export type AsObject = {
    key: string,
    seancesList: Array<SeanceInfo.AsObject>,
  }
}

export class SeanceInfo extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTime(): string;
  setTime(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SeanceInfo.AsObject;
  static toObject(includeInstance: boolean, msg: SeanceInfo): SeanceInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SeanceInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SeanceInfo;
  static deserializeBinaryFromReader(message: SeanceInfo, reader: jspb.BinaryReader): SeanceInfo;
}

export namespace SeanceInfo {
  export type AsObject = {
    id: number,
    time: string,
  }
}

export class GetSeatsBySeanceRequest extends jspb.Message {
  getSeanceid(): number;
  setSeanceid(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSeatsBySeanceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSeatsBySeanceRequest): GetSeatsBySeanceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSeatsBySeanceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSeatsBySeanceRequest;
  static deserializeBinaryFromReader(message: GetSeatsBySeanceRequest, reader: jspb.BinaryReader): GetSeatsBySeanceRequest;
}

export namespace GetSeatsBySeanceRequest {
  export type AsObject = {
    seanceid: number,
  }
}

export class GetSeatsBySeanceResponse extends jspb.Message {
  getNumberofrows(): number;
  setNumberofrows(value: number): void;

  clearSectionsList(): void;
  getSectionsList(): Array<SeanceSeatSection>;
  setSectionsList(value: Array<SeanceSeatSection>): void;
  addSections(value?: SeanceSeatSection, index?: number): SeanceSeatSection;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSeatsBySeanceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSeatsBySeanceResponse): GetSeatsBySeanceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetSeatsBySeanceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSeatsBySeanceResponse;
  static deserializeBinaryFromReader(message: GetSeatsBySeanceResponse, reader: jspb.BinaryReader): GetSeatsBySeanceResponse;
}

export namespace GetSeatsBySeanceResponse {
  export type AsObject = {
    numberofrows: number,
    sectionsList: Array<SeanceSeatSection.AsObject>,
  }
}

export class SeanceSeatSection extends jspb.Message {
  getSection(): CinemaHallSectionMap[keyof CinemaHallSectionMap];
  setSection(value: CinemaHallSectionMap[keyof CinemaHallSectionMap]): void;

  getWidth(): number;
  setWidth(value: number): void;

  clearSeatsList(): void;
  getSeatsList(): Array<SeanceSeatInfo>;
  setSeatsList(value: Array<SeanceSeatInfo>): void;
  addSeats(value?: SeanceSeatInfo, index?: number): SeanceSeatInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SeanceSeatSection.AsObject;
  static toObject(includeInstance: boolean, msg: SeanceSeatSection): SeanceSeatSection.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SeanceSeatSection, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SeanceSeatSection;
  static deserializeBinaryFromReader(message: SeanceSeatSection, reader: jspb.BinaryReader): SeanceSeatSection;
}

export namespace SeanceSeatSection {
  export type AsObject = {
    section: CinemaHallSectionMap[keyof CinemaHallSectionMap],
    width: number,
    seatsList: Array<SeanceSeatInfo.AsObject>,
  }
}

export class SeanceSeatInfo extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getRow(): string;
  setRow(value: string): void;

  getNumber(): number;
  setNumber(value: number): void;

  getIsfree(): boolean;
  setIsfree(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SeanceSeatInfo.AsObject;
  static toObject(includeInstance: boolean, msg: SeanceSeatInfo): SeanceSeatInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SeanceSeatInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SeanceSeatInfo;
  static deserializeBinaryFromReader(message: SeanceSeatInfo, reader: jspb.BinaryReader): SeanceSeatInfo;
}

export namespace SeanceSeatInfo {
  export type AsObject = {
    id: number,
    row: string,
    number: number,
    isfree: boolean,
  }
}

export class ChooseSeatRequest extends jspb.Message {
  getSeanceid(): number;
  setSeanceid(value: number): void;

  getSeatid(): number;
  setSeatid(value: number): void;

  getUserid(): string;
  setUserid(value: string): void;

  getIschosen(): boolean;
  setIschosen(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChooseSeatRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChooseSeatRequest): ChooseSeatRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChooseSeatRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChooseSeatRequest;
  static deserializeBinaryFromReader(message: ChooseSeatRequest, reader: jspb.BinaryReader): ChooseSeatRequest;
}

export namespace ChooseSeatRequest {
  export type AsObject = {
    seanceid: number,
    seatid: number,
    userid: string,
    ischosen: boolean,
  }
}

export class ChooseSeatResponse extends jspb.Message {
  getSeatid(): number;
  setSeatid(value: number): void;

  getIsfree(): boolean;
  setIsfree(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChooseSeatResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChooseSeatResponse): ChooseSeatResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChooseSeatResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChooseSeatResponse;
  static deserializeBinaryFromReader(message: ChooseSeatResponse, reader: jspb.BinaryReader): ChooseSeatResponse;
}

export namespace ChooseSeatResponse {
  export type AsObject = {
    seatid: number,
    isfree: boolean,
  }
}

export interface CinemaHallSectionMap {
  LEFT: 0;
  MIDDLE: 1;
  RIGHT: 2;
}

export const CinemaHallSection: CinemaHallSectionMap;

