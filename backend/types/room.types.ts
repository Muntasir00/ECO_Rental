export interface IRoomImage {
  url: string;
  publicId: string;
}

export interface IRoom {
  name: string;
  location: string;
  size: number;
  bedroom: number;
  bathroom: number;
  balcony: boolean;
  availableRooms: number;
  pricePerNight: number;
  guest: number;
  available: boolean;
  images: IRoomImage[];
}
