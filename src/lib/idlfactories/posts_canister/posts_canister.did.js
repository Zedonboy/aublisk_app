export const idlFactory = ({ IDL }) => {
  const PostType = IDL.Variant({
    'COMMENT' : IDL.Null,
    'NORMAL_POST' : IDL.Null,
    'REPOST' : IDL.Null,
    'REQUOTE' : IDL.Null,
  });
  const CreatePostSchema = IDL.Record({
    'content' : IDL.Opt(IDL.Text),
    'post_type' : PostType,
    'photos' : IDL.Opt(IDL.Vec(IDL.Text)),
  });
  const ServiceError = IDL.Variant({
    'PostTooLong' : IDL.Null,
    'PostNotFound' : IDL.Null,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : ServiceError });
  const PostMetadata = IDL.Record({
    'links' : IDL.Vec(IDL.Text),
    'hash_tags' : IDL.Vec(IDL.Text),
    'mentions' : IDL.Vec(IDL.Text),
    'photos' : IDL.Vec(IDL.Text),
  });
  const Post = IDL.Record({
    'id' : IDL.Text,
    'creator' : IDL.Text,
    'content' : IDL.Text,
    'post_type' : PostType,
    'metadata' : IDL.Opt(PostMetadata),
    'time' : IDL.Nat64,
  });
  const Result_1 = IDL.Variant({ 'Ok' : Post, 'Err' : ServiceError });
  return IDL.Service({
    'create_post' : IDL.Func([CreatePostSchema], [Result], []),
    'export_candid' : IDL.Func([], [IDL.Text], ['query']),
    'get_post' : IDL.Func([IDL.Text], [Result_1], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
