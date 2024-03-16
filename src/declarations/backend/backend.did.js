export const idlFactory = ({ IDL }) => {
  const InstitutionId = IDL.Nat;
  const Item = IDL.Record({
    'title' : IDL.Text,
    'password' : IDL.Text,
    'description' : IDL.Text,
    'email' : IDL.Text,
    'image' : IDL.Vec(IDL.Nat8),
  });
  const InstitutionDetails = IDL.Record({ 'item' : Item });
  const InstitutionOverview = IDL.Record({
    'id' : InstitutionId,
    'item' : Item,
  });
  const CertificateInfo = IDL.Record({
    'isued_at' : IDL.Text,
    'description' : IDL.Text,
    'end_date' : IDL.Text,
    'created_by' : IDL.Nat,
    'start_date' : IDL.Text,
    'profile_id' : IDL.Nat64,
  });
  const ExperienceInfo = IDL.Record({
    'end_date' : IDL.Text,
    'created_by' : IDL.Nat,
    'start_date' : IDL.Text,
    'short_note' : IDL.Text,
    'position' : IDL.Text,
    'profile_id' : IDL.Nat64,
  });
  const PersonalProfile = IDL.Record({
    'id' : IDL.Nat64,
    'firstname' : IDL.Text,
    'country' : IDL.Text,
    'created_by' : IDL.Nat,
    'email' : IDL.Text,
    'middlename' : IDL.Text,
    'address' : IDL.Text,
    'gender' : IDL.Text,
    'date_of_birth' : IDL.Text,
    'phone_number' : IDL.Text,
    'lastname' : IDL.Text,
  });
  return IDL.Service({
    'getInstitutionDetails' : IDL.Func(
        [InstitutionId],
        [InstitutionDetails],
        ['query'],
      ),
    'getOverviewList' : IDL.Func([], [IDL.Vec(InstitutionOverview)], ['query']),
    'newCertificate' : IDL.Func([CertificateInfo], [], []),
    'newExperience' : IDL.Func([ExperienceInfo], [], []),
    'newInstitution' : IDL.Func([Item], [], []),
    'newProfile' : IDL.Func([PersonalProfile], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
