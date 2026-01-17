import { Request, Response } from 'express';
import { connectDB } from '../config/db.js';
import {
  createFacilityService,
  getFacilityByRoomService,
  updateFacilityService,
  deleteFacilityService,
  getAllFacilitiesService,
} from '../services/Room/facility.service.js';

/**
 * CREATE
 */
export const createFacility = async (req: Request, res: Response) => {
  await connectDB();

  const facility = await createFacilityService(req.body);

  res.status(201).json({
    success: true,
    message: 'Facility created successfully',
    facility,
  });
};

/**
 * GET ALL FACILITIES
 */
export const getFacilities = async (req: Request, res: Response) => {
  await connectDB();
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);

  const data = await getAllFacilitiesService(page, limit);
  res.json(data);
};

/**
 * GET BY ROOM
 */
export const getFacilityByRoom = async (req: Request, res: Response) => {
  await connectDB();

  const { roomId } = req.params;
  if (!roomId) {
    return res.status(400).json({ message: 'Room ID is required' });
  }

  const facility = await getFacilityByRoomService(roomId);

  res.json(facility);
};

/**
 * UPDATE
 */
export const updateFacility = async (req: Request, res: Response) => {
  await connectDB();

  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Facility ID is required' });
  }

  const facility = await updateFacilityService(id, req.body);

  res.json({
    success: true,
    message: 'Facility updated successfully',
    facility,
  });
};

/**
 * DELETE
 */
export const deleteFacility = async (req: Request, res: Response) => {
  await connectDB();

  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Facility ID is required' });
  }

  await deleteFacilityService(id);

  res.json({
    success: true,
    message: 'Facility deleted successfully',
  });
};
