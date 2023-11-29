import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDate from "../BookingDate";




export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    console.log("🚀 ~ file: BookingPage.jsx:14 ~ BookingPage ~ booking:", booking)
    useEffect(() => {
        if (id) {
            axios.get(`/hotelRoomBooking/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            },).then(response => {
                const foundBoking = response.data.find(({ _id }) => _id === id)
                if (foundBoking) {
                    setBooking(foundBoking);
                }
            })
        }
    }, [])
    if (!booking) {
        return '';
    }
    return (
        <div className="flex justify-center items-center">
            <div className="w-11/12">
                <div className="my-8">
                    <h1 className="text-3xl">{booking?.hotelId?.title}</h1>
                    <AddressLink className="my-2 block">{booking?.hotelId?.address}</AddressLink>
                    <div className="bg-gray-200 p-6 mb-6 rounded-2xl flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl mb-4">Your booking information </h2>
                            <BookingDate booking={booking} />
                        </div>
                        <div className="bg-primary p-4 text-white rounded-2xl">
                            <div>Total price</div>
                            <div className="text-3xl">${booking?.price}</div>
                        </div>
                    </div>
                    <div>

                    </div>
                    {/* <PlaceGallery place={booking?.hotelId} /> */}
                </div>
            </div>
        </div>
    );
}