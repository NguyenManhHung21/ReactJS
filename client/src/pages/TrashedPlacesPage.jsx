import { useContext, useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import { Link } from "react-router-dom";
import PlaceImg from "../PlaceImg";
import { Button, Modal, Spinner } from "flowbite-react";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";

export default function TrasheddeletedListPage() {
  const [deletedList, setDeletedList] = useState([]);
  const [showDel, setShowDel] = useState(false);
  const [placeId, setPlaceId] = useState("");
  const { ready } = useContext(UserContext);

  useEffect(() => {
    try {
      axios.get("/placesDeleted").then((res) => setDeletedList(res.data));
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }, []);
  if (!ready) {
    return (
      <>
        <Spinner aria-label="Default status example" />
        <h2>Loading...</h2>
      </>
    );
  }
  const handleRetore = (id) => {
    try {
      axios.patch(`/retore-place/${id}`);
      const updatePlaces = deletedList.filter((place) => place._id !== id);
      setDeletedList(updatePlaces);
      toast.success("You have restored your place successfully!");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  const handleDelPlace = (e) => {
    try {
      axios.delete(`/permanentDelete/${placeId}`);
      const updatePlaces = deletedList.filter((place) => place._id !== placeId);
      setDeletedList(updatePlaces);
      toast.success("You have restored your place successfully!");
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  return (
    <div>
      <AccountNav />
      <div className="text-end">
        <Link
          to={"/account/places"}
          className="inline-block border border-gray-500 p-4 rounded-full hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </Link>
      </div>
      <div className="mt-4">
        {deletedList.length > 0 &&
          deletedList.map((place) => (
            <Link
              key={place._id}
              to={"/account/places/" + place._id}
              className="flex mt-4 cursor-pointer gap-x-4 bg-gray-100 p-4 rounded-2xl"
            >
              <div className="flex w-32 h-32 bg-gray-300 grow-0 shrink-0">
                <PlaceImg place={place} />
              </div>
              <div className="grow shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.description}</p>
              </div>
              <Button
                color="gray"
                onClick={(e) => {
                  e.preventDefault();
                  handleRetore(place._id);
                }}
                className="-mt-4  "
              >
                Retore&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
              </Button>
              <Button
                color="failure"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDel(true);
                  setPlaceId(place._id);
                }}
                className="-mt-4 -mr-4 bg-red-500 text-white hover:opacity-80"
              >
                Delete&nbsp;
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
              <Modal
                onClick={(e) => {
                  e.stopPropagation();
                }}
                show={showDel}
                size="md"
                popup={true}
                onClose={(e) => {
                  setShowDel(false);
                }}
              >
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <div className="flex justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-16 h-w-16"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      You'll cannot restore this place. Are you sure you still
                      want to delete this place?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button
                        color="failure"
                        onClick={(e) => {
                          handleDelPlace();
                          setShowDel(false);
                        }}
                      >
                        Yes, I'm sure
                      </Button>
                      <Button
                        color="gray"
                        onClick={(e) => {
                          setShowDel(false);
                        }}
                      >
                        No, cancel
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </Link>
          ))}
      </div>
    </div>
  );
}
