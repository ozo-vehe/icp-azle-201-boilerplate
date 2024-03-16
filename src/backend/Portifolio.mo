/// Import the necessary libraries:

import Principal "mo:base/Principal";
import Timer "mo:base/Timer";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Text "mo:base/Text";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";


/// Next, define the actor fort he institution platform:

actor {
  /// Define an item for the Institution: 
  type Item = {
    title : Text;
    description : Text;
    email:Text;
    password:Text;
    image : Blob;
  };

  type PersonalProfile = {
  id : Nat64;
  firstname : Text;
  middlename : Text;
  lastname : Text;
  email : Text;
  phone_number : Text;
  date_of_birth : Text;
  gender : Text;
  country : Text;
  address : Text;
  image : Blob;
  created_by : Nat;
  created_at:Text;
  };

// certificate
 type CertificateInfo = {
  // id:Nat;
  description: Text;
  start_date: Text;
  end_date: Text;
  created_by:Nat;
  isued_at:Text;
  profile_id: Nat64;
 };

//  experience
type ExperienceInfo = {
  // id:Nat;
  position:Text;
  start_date: Text;
  end_date : Text;
  created_by: Nat;
  profile_id: Nat64;
  short_note: Text;
};
// Education
type EducationInfo = {
  // int:Nat;
  academic_level: Text;
  school_name:Text;
  start_date: Text;
  end_date:Text;
  created_by: Nat;
  profile_id: Nat64;
  short_note: Text;
};

  /// Define an institution ID to uniquely identify the institution:
  type InstitutionId = Nat;
  type InstitutionEmail = Text;
  type Institutionpwd = Text;
  type ProfileId = Nat64;
  type Certificate_Id = Nat;
  type ExperienceId = Nat;
  type EducationId = Nat;
  // 18446744073709551615

  /// Define an institution overview:
  type InstitutionOverview = {
    id : InstitutionId;
    item : Item;
  };

  /// Define the details of the institution:
  type InstitutionDetails = {
    item : Item;
  };

  type ProfileDetails = {
    id:ProfileId;
    profile:PersonalProfile;
  };

  /// Define an internal, non-shared type for storing info about the institution:
  type Institution = {
    id : InstitutionId;
    item : Item;
  };

  type ProfileType = {
    profile:PersonalProfile;
  };

  type CertificateType = {
    certificate_data:CertificateInfo;
  };
    type ExperienceType = {
    experience_data:ExperienceInfo;
  };
    type EducationType = {
    education_data:EducationInfo;
  };

  /// Create a stable variable to store the institutions:
  stable var Institutions = List.nil<Institution>();
  stable var Profiles = List.nil<ProfileType>();
  stable var Certificates = List.nil<CertificateType>();
  stable var Experiences = List.nil<ExperienceType>();
  stable var Educations = List.nil<EducationType>();
  /// Define a counter for generating new institution IDs.
  stable var idCounter = 1;
  stable var idcercounter = 1;
  stable var idexpcounter = 1;
  stable var ideducounter = 1;
  stable var proileId = 00000000000000000000;


  /// Define a function to generating a new Institution:
  func newInstitutionId() : InstitutionId {
    let id = idCounter;
    idCounter += 1;
    id;
  };

  func newProfileId() : ProfileId {
    let pid = idCounter;
    idCounter += 1;
    Nat64.fromNat(pid);
  };

  func newCertificateId() : Certificate_Id {
        let cid = idcercounter;
        idcercounter += 1;
        cid;
  };

    func newExperienceId() : ExperienceId {
        let eid = idexpcounter;
        idexpcounter += 1;
        eid;
  };

    func newEducationId() : EducationId {
        let edid = ideducounter;
        ideducounter += 1;
        edid;
  };
// function to register experinces
// Experiences
//  Educations
// CertificateInfo
// ExperienceInfo
// EducationInfo
// experience_data
// education_data
  public func newExperience(experience : ExperienceInfo) : async () {
    let id = newExperienceId();
    let nwExperience = { id; experience_data = experience; };
    Experiences := List.push(nwExperience, Experiences);
  };
  /// Define a function to register a new institution that is open for the defined duration:
  public func newInstitution(item : Item) : async () {
    let id = newInstitutionId();
 
    let newInstitution = { id; item; };
    Institutions := List.push(newInstitution, Institutions);
  };
// record certificates
  // define function to register profile
  public func newCertificate(certificate : CertificateInfo) : async () {
    let id = newCertificateId();
    let nwCertificate = { id; certificate_data = certificate; };
    Certificates := List.push(nwCertificate, Certificates);
  };

  // define function to register profile
  public func newProfile(profile : PersonalProfile) : async () {
    let id = newProfileId();
     
    let newProfile = { id; profile = profile;}; // Create a ProfileType object
    Profiles := List.push(newProfile, Profiles); // Push the ProfileType object into the Profiles list
};


  /// Define a function to retrieve all institutions: 
  /// Specific institutions can be separately retrieved by `getinstitutionDetail`:
 public query func getOverviewList() : async [InstitutionOverview] {
  func getOverview(institution : Institution) : InstitutionOverview = {
    id = institution.id;
    item = institution.item;
  };
  let overviewList = List.map<Institution, InstitutionOverview>(Institutions, getOverview); // Use Institutions instead of institution
  List.toArray(overviewList); // No need to reverse the list here
};


  /// Define an internal helper function to retrieve institutions by ID: 
func findInstitution(institutionId : InstitutionId) : Institution {
  let result = List.find<Institution>(Institutions, func(inst : Institution) { inst.id == institutionId });
  switch (result) {
    case null { Debug.trap("Inexistent id"); };
    case (?institution) { institution };
  }
};

  /// Define a function to retrieve detailed info about an institution using its ID: 
public query func getInstitutionDetails(institutionId : InstitutionId) : async InstitutionDetails {
  let institution = findInstitution(institutionId);
  { item = institution.item };
};
//  ProfileDetails
// public query func getProfiles(profileId : ProfileId) : async ProfileDetails {
//   let profile = List.find<ProfileDetails>(Profiles, func(prof: ProfileDetails){ prof.id == profileId});
//   {profile}

// };
// InstitutionEmail
// Institutionpwd
//  check with email and password
// func findInstututionByEmail(email:InstitutionEmail, password:Institutionpwd ) : InstitutionDetails{

// let result  = List.find<Institution>(Institutions, func(inst : InstitutionDetails) { inst.email== email && inst.password == password });
//   switch (result) {
//     case null { Debug.trap("Inexistent id"); };
//     case (?institution) { institution };
//   }
// };

// public query func getInstitutionByEmailAndPassword( email:InstitutionEmail, password:Institutionpwd ) : async InstitutionDetails{
//   let institution = findInstututionByEmail(email,password);
//   { institution } 
// }
// get profiles



};
