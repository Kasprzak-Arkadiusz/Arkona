// package: movie
// file: movie.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

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

  clearItemsList(): void;
  getItemsList(): Array<MovieInfo>;
  setItemsList(value: Array<MovieInfo>): void;
  addItems(value?: MovieInfo, index?: number): MovieInfo;

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
    itemsList: Array<MovieInfo.AsObject>,
    hasnextpage: boolean,
  }
}

export class MovieInfo extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getTitle(): string;
  setTitle(value: string): void;

  getImage(): Uint8Array | string;
  getImage_asU8(): Uint8Array;
  getImage_asB64(): string;
  setImage(value: Uint8Array | string): void;

  hasReleasedate(): boolean;
  clearReleasedate(): void;
  getReleasedate(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setReleasedate(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getDuration(): number;
  setDuration(value: number): void;

  clearGenresList(): void;
  getGenresList(): Array<string>;
  setGenresList(value: Array<string>): void;
  addGenres(value: string, index?: number): string;

  getAgerestriction(): string;
  setAgerestriction(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MovieInfo.AsObject;
  static toObject(includeInstance: boolean, msg: MovieInfo): MovieInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MovieInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MovieInfo;
  static deserializeBinaryFromReader(message: MovieInfo, reader: jspb.BinaryReader): MovieInfo;
}

export namespace MovieInfo {
  export type AsObject = {
    id: number,
    title: string,
    image: Uint8Array | string,
    releasedate?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    duration: number,
    genresList: Array<string>,
    agerestriction: string,
  }
}

export class GetLatestMoviesRequest extends jspb.Message {
  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLatestMoviesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetLatestMoviesRequest): GetLatestMoviesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLatestMoviesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLatestMoviesRequest;
  static deserializeBinaryFromReader(message: GetLatestMoviesRequest, reader: jspb.BinaryReader): GetLatestMoviesRequest;
}

export namespace GetLatestMoviesRequest {
  export type AsObject = {
    count: number,
  }
}

export class GetLatestMoviesResponse extends jspb.Message {
  clearItemsList(): void;
  getItemsList(): Array<GeneralMovieInfo>;
  setItemsList(value: Array<GeneralMovieInfo>): void;
  addItems(value?: GeneralMovieInfo, index?: number): GeneralMovieInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLatestMoviesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLatestMoviesResponse): GetLatestMoviesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLatestMoviesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLatestMoviesResponse;
  static deserializeBinaryFromReader(message: GetLatestMoviesResponse, reader: jspb.BinaryReader): GetLatestMoviesResponse;
}

export namespace GetLatestMoviesResponse {
  export type AsObject = {
    itemsList: Array<GeneralMovieInfo.AsObject>,
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

