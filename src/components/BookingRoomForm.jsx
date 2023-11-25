import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";
import Comments from "./CommentSection/Comments";
//import Comments from "../components/CommentSection/Comments";



const BookingRoomForm = () => {

    const { slug } = useParams();
    // const id = "6547bdbdca69c1b64dc6371f";
    const [place, setPlace] = useState(null);
    useEffect(() => {
        if (!slug) {
            return;
        }
        axios.get(`/rooms/${slug}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        },).then(response => {
            setPlace(response.data);
        });
    }, [slug])
    if (!place) return '';
    console.log("🚀 ~ file: BookingRoomForm.jsx:17 ~ BookingRoomForm ~ place:", place)

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl">{place?.title}</h1>
            {/* <AddressLink children={place?.address} />
            <PlaceGallery place={place} /> */}
            <div>
                <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        <div className="my-4">
                            <h2 className="font-semibold text-2xl">Description</h2>
                            {place?.description}
                        </div>
                        Check-in: {place?.checkIn}<br />
                        Check-out: {place?.checkOut}<br />
                        Max number of guests : {place?.maxGuests}
                    </div>
                    <div>
                        <BookingWidget place={place} />
                    </div>
                </div>
                <div className="bg-white -mx-8 px-8 py-8 border-t">
                    <div>
                        <h2 className="font-semibold text-2xl">Extra info</h2>
                    </div>
                    <div className="mb-4 mt-1 text-sm text-gray-700 leading-5">{place?.extraInfo}</div>
                </div>
                <Comments />
            </div>
        </div>
    )
}

export default BookingRoomForm;