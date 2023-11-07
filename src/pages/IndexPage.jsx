import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, [])
    return (
        <div className="mt-8 grid gap-x-8 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {places.length > 0 && places.map(place => (
                <Link key={place._id} to={'/place/' + place._id} className="w-50 h-50">
                    <div className="h-50 h-50 mb-2 bg-gray-500 rounded-2xl flex">
                        {place.photos?.[0] && (
                            <img className="rounded-2xl object-cover aspect-square" src={import.meta.env.VITE_BASE_URL + '/uploads/' + place.photos?.[0]} alt="" />
                        )}
                    </div>
                    <div>
                        <h3 className="font-bold">{place.address}</h3>
                        <h2 className="text-sm text-gray-500">{place.title}</h2>
                        <div className="mt-2">
                            <span className="font-bold"> ${place.price}</span> per night
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}