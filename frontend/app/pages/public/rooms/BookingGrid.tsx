import { Link } from 'react-router';

const BookingGrid = ({ data }: { data: any }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
      {data.map((room: any) => (
        <Link to={`/room/${room.id}`} key={room.id}>
          <div className='group cursor-pointer flex flex-col'>
            {/* Image Container */}
            <div className='w-full h-64 overflow-hidden mb-5 bg-gray-100 rounded-sm'>
              <img
                src={room.image}
                alt={room.title}
                className='w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105'
              />
            </div>

            {/* Text Content */}
            <div className='flex flex-col'>
              <h3 className='text-xl font-serif text-[#1A1A1A] font-medium mb-2 group-hover:text-[#B83E25] transition-colors'>
                {room.title}
              </h3>

              {/* Details Row with Red Dots */}
              <div className='flex items-center text-xs text-gray-500 font-light gap-1.5 flex-wrap'>
                <span>{room.details.size}</span>
                <span className='text-[#B83E25] text-[8px]'>●</span>
                <span>{room.details.beds}</span>
                <span className='text-[#B83E25] text-[8px]'>●</span>
                <span>{room.details.bath}</span>
                <span className='text-[#B83E25] text-[8px]'>●</span>
                <span>{room.details.extra}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BookingGrid;
