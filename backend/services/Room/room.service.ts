import cloudinary from '../../config/cloudinary.js';
import { Booking } from '../../models/booking.model.js';
import { Room } from '../../models/room.model.js';
import { IRoomImage } from '../../types/room.types.js';
export const createRoomService = async (
  data: any,
  files: Express.Multer.File[] = []
) => {
  if (!files.length) {
    throw new Error('Room images are required');
  }
  if (
    !data.name ||
    !data.location ||
    !data.size ||
    !data.bedroom ||
    !data.bathroom ||
    !data.availableRooms ||
    !data.pricePerNight ||
    !data.guest
  ) {
    throw new Error('All room details are required');
  }

  const uploads = await Promise.all(
    files.map(file =>
      cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
        { folder: 'rooms' }
      )
    )
  );

  const images = uploads.map(upload => ({
    url: upload.secure_url,
    publicId: upload.public_id,
  }));

  return Room.create({
    ...data,
    images,
  });
};

export const getAvailableRoomsService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [rooms, total] = await Promise.all([
    Room.find({ available: true })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Room.countDocuments({ available: true }),
  ]);

  return {
    rooms,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getRoomByIdService = (id: string) => {
  return Room.findById(id);
};

export const searchRoomsService = async (query: any) => {
  const { location, bedroom, checkIn, checkOut, page = 1, limit = 10 } = query;

  const filter: any = {};
  if (location) filter.location = new RegExp(location, 'i');
  if (bedroom) {
    filter.bedroom = { $gte: Number(bedroom) };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const rooms = await Room.find(filter).skip(skip).limit(Number(limit));

  // Filter rooms by availability between dates
  if (checkIn && checkOut) {
    const unavailableRoomIds = await Booking.distinct('room', {
      status: 'ongoing',
      $or: [
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gt: new Date(checkIn) },
        },
      ],
    });

    return rooms.filter(room => !unavailableRoomIds.includes(room._id));
  }

  return rooms;
};

export const updateRoomService = async (
  roomId: string,
  data: any,
  files: Express.Multer.File[] = []
) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  if (data.removeImages?.length) {
    const removeImages: string[] = Array.isArray(data.removeImages)
      ? data.removeImages
      : [data.removeImages];

    await Promise.all(
      removeImages.map(publicId => cloudinary.uploader.destroy(publicId))
    );

    room.images = room.images.filter(
      (img: IRoomImage) => !removeImages.includes(img.publicId)
    );
  }

  if (files.length) {
    const uploads = await Promise.all(
      files.map(file =>
        cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
          { folder: 'rooms' }
        )
      )
    );

    const newImages: IRoomImage[] = uploads.map(upload => ({
      url: upload.secure_url,
      publicId: upload.public_id,
    }));

    room.images.push(...newImages);
  }

  Object.assign(room, data);

  await room.save();
  return room;
};

export const deleteRoomService = async (roomId: string) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new Error('Room not found');
  }

  if (room.images?.length) {
    await Promise.all(
      room.images.map((img: IRoomImage) =>
        cloudinary.uploader.destroy(img.publicId)
      )
    );
  }

  await room.deleteOne();
};
