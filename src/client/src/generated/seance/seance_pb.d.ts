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

