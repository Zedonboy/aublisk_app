import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CreatePostSchema {
  'content' : [] | [string],
  'post_type' : PostType,
  'photos' : [] | [Array<string>],
}
export interface Post {
  'id' : string,
  'creator' : string,
  'content' : string,
  'post_type' : PostType,
  'metadata' : [] | [PostMetadata],
  'time' : bigint,
}
export interface PostMetadata {
  'links' : Array<string>,
  'hash_tags' : Array<string>,
  'mentions' : Array<string>,
  'photos' : Array<string>,
}
export type PostType = { 'COMMENT' : null } |
  { 'NORMAL_POST' : null } |
  { 'REPOST' : null } |
  { 'REQUOTE' : null };
export type Result = { 'Ok' : bigint } |
  { 'Err' : ServiceError };
export type Result_1 = { 'Ok' : Post } |
  { 'Err' : ServiceError };
export type ServiceError = { 'PostTooLong' : null } |
  { 'PostNotFound' : null };
export interface _SERVICE {
  'create_post' : ActorMethod<[CreatePostSchema], Result>,
  'export_candid' : ActorMethod<[], string>,
  'get_post' : ActorMethod<[string], Result_1>,
}
