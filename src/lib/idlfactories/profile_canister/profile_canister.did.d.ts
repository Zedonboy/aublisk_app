import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Profile {
  'bio' : string,
  'verified' : boolean,
  'username' : string,
  'display_name' : string,
  'photo' : [] | [Uint8Array | number[]],
}
export type Result = { 'Ok' : bigint } |
  { 'Err' : null };
export type Result_1 = { 'Ok' : Array<Profile> } |
  { 'Err' : null };
export type Result_2 = { 'Ok' : Profile } |
  { 'Err' : null };
export interface UpdateProfile {
  'bio' : [] | [string],
  'display_name' : [] | [string],
}
export interface _SERVICE {
  'export_candid' : ActorMethod<[], string>,
  'follow_user' : ActorMethod<[string], Result>,
  'get_follower_count' : ActorMethod<[], Result>,
  'get_followers' : ActorMethod<[], Result_1>,
  'get_following_count' : ActorMethod<[], Result>,
  'get_followings' : ActorMethod<[], Result_1>,
  'get_profile' : ActorMethod<[], Result_2>,
  'unfollow_user' : ActorMethod<[string], Result>,
  'update_profile' : ActorMethod<[UpdateProfile], Result_2>,
}
