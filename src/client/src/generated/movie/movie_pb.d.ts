// package: movie
// file: movie.proto

import * as jspb from "google-protobuf";

export class GetMoviesRequest extends jspb.Message {
  getPagenumber(): number;
  setPagenumber(value: number): void;

  getPagesize(): number;
  setPagesize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMoviesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetMoviesRequest): GetMoviesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMoviesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMoviesRequest;
  static deserializeBinaryFromReader(message: GetMoviesRequest, reader: jspb.BinaryReader): GetMoviesRequest;
}

export namespace GetMoviesRequest {
  export type AsObject = {
    pagenumber: number,
    pagesize: number,
  }
}

export class GetMoviesResponse extends jspb.Message {
  getPagenumber(): number;
  setPagenumber(value: number): void;

  getTotalpages(): number;
  setTotalpages(value: number): void;

  getTotalcount(): number;
  setTotalcount(value: number): void;

  clearItemsList(): void;
  getItemsList(): Array<GeneralMovieInfo>;
  setItemsList(value: Array<GeneralMovieInfo>): void;
  addItems(value?: GeneralMovieInfo, index?: number): GeneralMovieInfo;

  getHaspreviouspage(): boolean;
  setHaspreviouspage(value: boolean): void;

  getHasnextpage(): boolean;
  setHasnextpage(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetMoviesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetMoviesResponse): GetMoviesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetMoviesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetMoviesResponse;
  static deserializeBinaryFromReader(message: GetMoviesResponse, reader: jspb.BinaryReader): GetMoviesResponse;
}

export namespace GetMoviesResponse {
  export type AsObject = {
    pagenumber: number,
    totalpages: number,
    totalcount: number,
    itemsList: Array<GeneralMovieInfo.AsObject>,
    haspreviouspage: boolean,
    hasnextpage: boolean,
  }
}

export class GeneralMovieInfo extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getImage(): Uint8Array | string;
  getImage_asU8(): Uint8Array;
  getImage_asB64(): string;
  setImage(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GeneralMovieInfo.AsObject;
  static toObject(includeInstance: boolean, msg: GeneralMovieInfo): GeneralMovieInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GeneralMovieInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GeneralMovieInfo;
  static deserializeBinaryFromReader(message: GeneralMovieInfo, reader: jspb.BinaryReader): GeneralMovieInfo;
}

export namespace GeneralMovieInfo {
  export type AsObject = {
    id: number,
    title: string,
    image: Uint8Array | string,
  }
}

