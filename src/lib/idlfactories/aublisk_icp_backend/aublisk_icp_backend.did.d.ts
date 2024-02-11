import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Extension = { 'PDF' : null } |
  { 'DEFAULT' : null } |
  { 'TEXT' : null };
export type GenericValue = { 'Nat64Content' : bigint } |
  { 'Nat32Content' : number } |
  { 'BoolContent' : boolean } |
  { 'Nat8Content' : number } |
  { 'Int64Content' : bigint } |
  { 'IntContent' : bigint } |
  { 'NatContent' : bigint } |
  { 'Nat16Content' : number } |
  { 'Int32Content' : number } |
  { 'Int8Content' : number } |
  { 'FloatContent' : number } |
  { 'Int16Content' : number } |
  { 'BlobContent' : Uint8Array | number[] } |
  { 'NestedContent' : Array<[string, GenericValue]> } |
  { 'Principal' : Principal } |
  { 'TextContent' : string };
export interface InitArgs {
  'cap' : [] | [Principal],
  'logo' : [] | [string],
  'name' : [] | [string],
  'custodians' : [] | [Array<Principal>],
  'symbol' : [] | [string],
}
export interface ManualReply {
  'logo' : [] | [string],
  'name' : [] | [string],
  'created_at' : bigint,
  'upgraded_at' : bigint,
  'custodians' : Array<Principal>,
  'symbol' : [] | [string],
}
export type ManualReply_1 = { 'Ok' : Array<string> } |
  { 'Err' : NftError };
export type ManualReply_2 = { 'Ok' : Array<TokenMetadata> } |
  { 'Err' : NftError };
export type ManualReply_3 = { 'Ok' : TokenMetadata } |
  { 'Err' : NftError };
export interface NFTData {
  'content' : { 'NftDataVec' : Array<NFTData> } |
    { 'BlobContent' : Uint8Array | number[] },
  'nft_type' : { 'SERIES' : null } |
    { 'COLLECTION' : null } |
    { 'ARTICLE' : null },
  'extension' : { 'PDF' : null } |
    { 'DEFAULT' : null } |
    { 'TEXT' : null },
}
export type NftDataValue = { 'NftDataVec' : Array<NFTData> } |
  { 'BlobContent' : Uint8Array | number[] };
export type NftError = { 'UnauthorizedOperator' : null } |
  { 'SelfTransfer' : null } |
  { 'TokenNotFound' : null } |
  { 'UnauthorizedOwner' : null } |
  { 'UserNotPremium' : null } |
  { 'SelfApprove' : null } |
  { 'OperatorNotFound' : null } |
  { 'ExistedNFT' : null } |
  { 'TokenInvalid' : null } |
  { 'OwnerNotFound' : null } |
  { 'InvalidOperation' : null };
export type NftType = { 'SERIES' : null } |
  { 'COLLECTION' : null } |
  { 'ARTICLE' : null };
export type Result = { 'Ok' : bigint } |
  { 'Err' : NftError };
export type Result_1 = { 'Ok' : boolean } |
  { 'Err' : NftError };
export type Result_2 = { 'Ok' : [] | [Principal] } |
  { 'Err' : NftError };
export interface Stats {
  'cycles' : bigint,
  'total_transactions' : bigint,
  'total_unique_holders' : bigint,
  'total_supply' : bigint,
}
export type SupportedInterface = { 'Burn' : null } |
  { 'Mint' : null } |
  { 'Approval' : null };
export interface TokenMetadata {
  'transferred_at' : [] | [bigint],
  'transferred_by' : [] | [Principal],
  'owner' : [] | [Principal],
  'operator' : [] | [Principal],
  'approved_at' : [] | [bigint],
  'approved_by' : [] | [Principal],
  'properties' : Array<[string, GenericValue]>,
  'is_burned' : boolean,
  'token_identifier' : string,
  'burned_at' : [] | [bigint],
  'burned_by' : [] | [Principal],
  'minted_at' : bigint,
  'minted_by' : Principal,
}
export interface _SERVICE {
  'add_to_series' : ActorMethod<[string, NFTData], Result>,
  'approve' : ActorMethod<[Principal, string], Result>,
  'balanceOf' : ActorMethod<[Principal], Result>,
  'burn' : ActorMethod<[string], Result>,
  'check_account_id_for_ownership' : ActorMethod<[string, string], boolean>,
  'custodians' : ActorMethod<[], Array<Principal>>,
  'cycles' : ActorMethod<[], bigint>,
  'dfx_info' : ActorMethod<[], string>,
  'dip721_approve' : ActorMethod<[Principal, string], Result>,
  'dip721_balance_of' : ActorMethod<[Principal], Result>,
  'dip721_burn' : ActorMethod<[string], Result>,
  'dip721_custodians' : ActorMethod<[], Array<Principal>>,
  'dip721_cycles' : ActorMethod<[], bigint>,
  'dip721_is_approved_for_all' : ActorMethod<[Principal, Principal], Result_1>,
  'dip721_logo' : ActorMethod<[], [] | [string]>,
  'dip721_metadata' : ActorMethod<[], ManualReply>,
  'dip721_mint' : ActorMethod<
    [Principal, string, Array<[string, GenericValue]>, [] | [NFTData]],
    Result
  >,
  'dip721_name' : ActorMethod<[], [] | [string]>,
  'dip721_operator_of' : ActorMethod<[string], Result_2>,
  'dip721_operator_token_identifiers' : ActorMethod<[Principal], ManualReply_1>,
  'dip721_operator_token_metadata' : ActorMethod<[Principal], ManualReply_2>,
  'dip721_owner_of' : ActorMethod<[string], Result_2>,
  'dip721_owner_token_identifiers' : ActorMethod<[Principal], ManualReply_1>,
  'dip721_owner_token_metadata' : ActorMethod<[Principal], ManualReply_2>,
  'dip721_set_approval_for_all' : ActorMethod<[Principal, boolean], Result>,
  'dip721_set_custodians' : ActorMethod<[Array<Principal>], undefined>,
  'dip721_set_logo' : ActorMethod<[string], undefined>,
  'dip721_set_name' : ActorMethod<[string], undefined>,
  'dip721_set_symbol' : ActorMethod<[string], undefined>,
  'dip721_stats' : ActorMethod<[], Stats>,
  'dip721_supported_interfaces' : ActorMethod<[], Array<SupportedInterface>>,
  'dip721_symbol' : ActorMethod<[], [] | [string]>,
  'dip721_token_metadata' : ActorMethod<[string], ManualReply_3>,
  'dip721_total_supply' : ActorMethod<[], bigint>,
  'dip721_total_transactions' : ActorMethod<[], bigint>,
  'dip721_total_unique_holders' : ActorMethod<[], bigint>,
  'dip721_transfer' : ActorMethod<[Principal, string], Result>,
  'dip721_transfer_from' : ActorMethod<[Principal, Principal, string], Result>,
  'export_candid' : ActorMethod<[], string>,
  'get_nfts' : ActorMethod<[string], Array<TokenMetadata>>,
  'git_commit_hash' : ActorMethod<[], string>,
  'isApprovedForAll' : ActorMethod<[Principal, Principal], Result_1>,
  'logo' : ActorMethod<[], [] | [string]>,
  'metadata' : ActorMethod<[], ManualReply>,
  'mint' : ActorMethod<
    [Principal, string, Array<[string, GenericValue]>],
    Result
  >,
  'name' : ActorMethod<[], [] | [string]>,
  'operatorOf' : ActorMethod<[string], Result_2>,
  'operatorTokenIdentifiers' : ActorMethod<[Principal], ManualReply_1>,
  'operatorTokenMetadata' : ActorMethod<[Principal], ManualReply_2>,
  'ownerOf' : ActorMethod<[string], Result_2>,
  'ownerTokenIdentifiers' : ActorMethod<[Principal], ManualReply_1>,
  'ownerTokenMetadata' : ActorMethod<[Principal], ManualReply_2>,
  'owner_nftdata' : ActorMethod<[], Array<NFTData>>,
  'rust_toolchain_info' : ActorMethod<[], string>,
  'setApprovalForAll' : ActorMethod<[Principal, boolean], Result>,
  'setCustodians' : ActorMethod<[Array<Principal>], undefined>,
  'setLogo' : ActorMethod<[string], undefined>,
  'setName' : ActorMethod<[string], undefined>,
  'setSymbol' : ActorMethod<[string], undefined>,
  'stats' : ActorMethod<[], Stats>,
  'supportedInterfaces' : ActorMethod<[], Array<SupportedInterface>>,
  'symbol' : ActorMethod<[], [] | [string]>,
  'tokenMetadata' : ActorMethod<[string], ManualReply_3>,
  'totalSupply' : ActorMethod<[], bigint>,
  'totalTransactions' : ActorMethod<[], bigint>,
  'totalUniqueHolders' : ActorMethod<[], bigint>,
  'transfer' : ActorMethod<[Principal, string], Result>,
  'transferFrom' : ActorMethod<[Principal, Principal, string], Result>,
  'transfer_to_account_id' : ActorMethod<[Principal, string, string], Result>,
}
