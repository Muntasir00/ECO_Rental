export interface profilesTypes {
  fullName: string;
  phoneNumber: string;
  address: string;
  identityType: 'NID' | 'PASSPORT';
  identityFile: string;
  profileImage: string;
  emergencyContact: string;
}
