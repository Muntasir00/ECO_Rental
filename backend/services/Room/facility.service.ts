import { Facility } from '../../models/facility.model.js';
import { Room } from '../../models/room.model.js';
import { IFacility } from '../../models/facility.model.js';
import mongoose from 'mongoose';

/**
 * CREATE
 */
export const createFacilityService = async (data: IFacility) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const room = await Room.findById(data.room).session(session);
    if (!room) throw new Error('Room does not exist');

    const facility = await Facility.create([data], { session });

    room.hasFacility = true;
    await room.save({ session });

    await session.commitTransaction();
    session.endSession();

    return facility[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const facility = await Facility.findById(facilityId).session(session);
    if (!facility) {
      throw new Error('Facility not found');
    }

    await Room.findByIdAndUpdate(
      facility.room,
      { hasFacility: false },
      { session }
    );

    await facility.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
