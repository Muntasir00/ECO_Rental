import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { searchRooms } from '~/pages/public/rooms/roomActions';
import SearchFilterBar from '~/pages/Search/SearchFilterBar';
import RoomCard, { type Room } from '~/pages/Search/RoomCard';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  // Pagination State
  const [totalResults, setTotalResults] = useState(0);
  const LIMIT = 10; // Must match your API limit

  // Params from URL
  const location = searchParams.get('location');
  const bedroom = searchParams.get('bedroom');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const pageParam = searchParams.get('page');

  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const totalPages = Math.ceil(totalResults / LIMIT);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Call API
        const res = await searchRooms({
          location: location || '',
          bedroom: bedroom || undefined,
          checkIn: checkIn || '',
          checkOut: checkOut || '',
          page: currentPage,
        });

        // Handle Response (Support both array or object with meta data)
        if (res && res.result) {
          setRooms(res.result);
          setTotalResults(res.total || 0); // Assuming API returns 'total' count
        } else if (Array.isArray(res)) {
          setRooms(res);
          // If API doesn't return total, we might assume length is total (not ideal for pagination)
          setTotalResults(res.length);
        } else {
          setRooms([]);
          setTotalResults(0);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [searchParams, currentPage]); // Re-run when URL params change

  // Pagination Handler
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    setSearchParams(params);
  };

  return (
    <div className='min-h-screen flex flex-col bg-white font-sans text-gray-900'>
      <main className='flex-grow bg-[#F8F9FB]'>
        {/* Header / Filter Section */}
        <div className='bg-white pb-8 pt-24 md:pt-32 px-4 shadow-sm border-b border-gray-100'>
          <div className='max-w-7xl mx-auto'>
            <div className='relative -mt-10 md:-mt-16 z-10 mb-10'>
              {/* The FilterBar now handles its own state filling from URL */}
              <SearchFilterBar />
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className='max-w-7xl mx-auto px-4 py-10'>
          {/* Count Header */}
          <div className='mb-8 flex justify-between items-end'>
            <h1 className='text-xl md:text-2xl font-medium text-gray-800'>
              Search Result :{' '}
              <span className='text-gray-500 font-normal'>
                {totalResults} results found
              </span>
            </h1>
            <p className='text-sm text-gray-400'>
              Page {currentPage} of {totalPages || 1}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div
                  key={i}
                  className='h-[400px] w-full bg-gray-200 animate-pulse rounded-2xl'
                ></div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && rooms.length === 0 && (
            <div className='flex flex-col items-center justify-center py-20 text-gray-400'>
              <Search className='w-16 h-16 mb-4 opacity-20' />
              <p className='text-lg'>
                No properties found matching your criteria.
              </p>
              <Button variant='link' onClick={() => setSearchParams({})}>
                Clear Filters
              </Button>
            </div>
          )}

          {/* Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {rooms.map(room => (
              <RoomCard key={room._id} data={room} />
            ))}
          </div>

          {/* Pagination Controls */}
          {!loading && totalResults > 0 && (
            <div className='mt-16 flex justify-center items-center gap-4'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className='h-10 w-10 rounded-full'
              >
                <ChevronLeft className='h-4 w-4' />
              </Button>

              <div className='flex items-center gap-2'>
                {/* Simple Page Numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
                  // Logic to hide excessive page numbers (optional simple version)
                  if (
                    p !== 1 &&
                    p !== totalPages &&
                    (p < currentPage - 1 || p > currentPage + 1)
                  )
                    return null;
                  if (p === currentPage - 2 || p === currentPage + 2)
                    return <span key={p}>...</span>;

                  return (
                    <Button
                      key={p}
                      variant={p === currentPage ? 'default' : 'ghost'}
                      onClick={() => handlePageChange(p)}
                      className={`h-10 w-10 rounded-full ${p === currentPage ? 'bg-[#B83E25] hover:bg-[#d4444b]' : ''}`}
                    >
                      {p}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant='outline'
                size='icon'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className='h-10 w-10 rounded-full'
              >
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
