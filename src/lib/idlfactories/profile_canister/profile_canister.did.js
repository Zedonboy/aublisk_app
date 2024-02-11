export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Null });
  const Profile = IDL.Record({
    'bio' : IDL.Text,
    'verified' : IDL.Bool,
    'username' : IDL.Text,
    'display_name' : IDL.Text,
    'photo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Vec(Profile), 'Err' : IDL.Null });
  const Result_2 = IDL.Variant({ 'Ok' : Profile, 'Err' : IDL.Null });
  const UpdateProfile = IDL.Record({
    'bio' : IDL.Opt(IDL.Text),
    'display_name' : IDL.Opt(IDL.Text),
  });
  return IDL.Service({
    'export_candid' : IDL.Func([], [IDL.Text], ['query']),
    'follow_user' : IDL.Func([IDL.Text], [Result], []),
    'get_follower_count' : IDL.Func([], [Result], ['query']),
    'get_followers' : IDL.Func([], [Result_1], ['query']),
    'get_following_count' : IDL.Func([], [Result], ['query']),
    'get_followings' : IDL.Func([], [Result_1], ['query']),
    'get_profile' : IDL.Func([], [Result_2], []),
    'unfollow_user' : IDL.Func([IDL.Text], [Result], []),
    'update_profile' : IDL.Func([UpdateProfile], [Result_2], []),
  });
};
export const init = ({ IDL }) => { return []; };
