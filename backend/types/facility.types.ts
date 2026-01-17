import { Types } from 'mongoose';

export interface IFacilityItem {
  name: string;
  description?: string;
}

export interface IFacility {
  room: Types.ObjectId;
  facilityType: string;
  facilityList: IFacilityItem[];
  facilityDetails?: string;
}
