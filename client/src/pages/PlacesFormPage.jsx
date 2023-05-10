import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import { UserContext } from "../UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };

  const inputDescription = (text) => {
    return <p className="text-sm text-gray-500">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const savePlace = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !address ||
      addedPhotos.length === 0 ||
      perks.length === 0 ||
      !description ||
      !extraInfo ||
      !checkIn ||
      !checkOut
    ) {
      toast.warning("You need to fill out all of fields");
      return;
    }

    try {
      const placeData = {
        name: user.name,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      };
      if (id) {
        //update
        await axios.put("/places", {
          id,
          ...placeData,
        });
      } else {
        //new place
        await axios.post("/places", placeData);
      }
      setRedirect(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to save place");
    }
  };
  if (redirect) return <Navigate to={"/account/places"} />;
  return (
    <div>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place, should be short and catchy as in advertisement"
        )}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title, for example: My lovely apt"
        />
        {preInput("Address", "Address to this place")}
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Place's location"
        />
        {preInput("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
        {preInput("Description", "Description of the picture")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {preInput("Perks", "Sellect all the perks of your place")}
        <div className="gap gap-y-2 gap-x-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra Info", "House rules, etc")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        {preInput(
          "Checkin & out times, max guests",
          "Add check in and out times, remember to have some time windown for cleaning room between guests"
        )}
        <div className="grid gap-y-2 gap-x-6 lg:grid-cols-4 md:grid-cols-2 grid-cols-1">
          <div>
            <h3 className="mt-2 ">Check in time</h3>
            <input
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              type="text"
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 ">Check out time</h3>
            <input
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              type="text"
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 ">Max number of guests</h3>
            <input
              value={maxGuests}
              onChange={(e) => setMaxGuests(e.target.value)}
              type="number"
              placeholder="1"
            />
          </div>
          <div>
            <h3 className="mt-2 ">Price per night</h3>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="1"
            />
          </div>
        </div>
        <div className="my-4">
          <button className="primary ">Save</button>
        </div>
      </form>
    </div>
  );
}
