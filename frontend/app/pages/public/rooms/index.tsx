import RoomHeader from "~/section/public/rooms/RoomHeader";
import RoomList from "~/section/public/rooms/RoomList";

export default function RoomsPageView(){
    return (
        <div className="min-h-screen">
            <RoomHeader />
            <RoomList />
        </div>
    )
}