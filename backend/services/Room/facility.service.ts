import { Facility } from '../../models/facility.model.js';
import { Room } from '../../models/room.model.js';
import { IFacility } from '../../models/facility.model.js';

/**
 * CREATE
 */
export const createFacilityService = async (data: IFacility) => {
  const roomExists = await Room.findById(data.room);
  if (!roomExists) {
    throw new Error('Room does not exist');
  }

  const existingFacility = await Facility.findOne({ room: data.room });
  if (existingFacility) {
    throw new Error('Facility already exists for this room');
  }

  return Facility.create(data);
};

/**
 * READ BY ROOM
 */
export const getFacilityByRoomService = async (roomId: string) => {
  return Facility.findOne({ room: roomId }).populate('room');
};

/**
 * 
get all facility
 */

export const getAllFacilitiesService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [facilities, total] = await Promise.all([
    Facility.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    Facility.countDocuments(),
  ]);

  return {
    facilities,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * UPDATE
 */
export const updateFacilityService = async (
  facilityId: string,
  data: Partial<IFacility>
) => {
  const facility = await Facility.findById(facilityId);
  if (!facility) {
    throw new Error('Facility not found');
  }

  Object.assign(facility, data);
  await facility.save();

  return facility;
};

/**
 * DELETE
 */
export const deleteFacilityService = async (facilityId: string) => {
  const facility = await Facility.findById(facilityId);
  if (!facility) {
    throw new Error('Facility not found');
  }

  await facility.deleteOne();
};
