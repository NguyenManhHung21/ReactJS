import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import PlaceImg from "../components/PlaceImg";
import { Button, Modal, Spinner, Tooltip } from "flowbite-react";
import { toast } from "react-toastify";
import { UserContext } from "../UserContext";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);
  const [showDel, setShowDel] = useState(false);
  const [placeId, setPlaceId] = useState("");
  const [deleteCount, setDeleteCount] = useState("");
  const { ready } = useContext(UserContext);

  const reloadData = () => {
    try {
      axios.get("/user-places").then(({ data }) => {
        setPlaces(data.places);
        setDeleteCount(data.deleteCount);
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  useEffect(() => {
    try {
      axios.get("/user-places").then(({ data }) => {
        setPlaces(data.places);
        setDeleteCount(data.deleteCount);
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }, []);

  const handleDelPlace = () => {
    try {
      axios.delete(`/softDel-place/${placeId}`).then(() => {
        reloadData();
        toast.success("You have successfully deleted your place!");
      });
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
  if (!ready) {
    return (
      <>
        <Spinner aria-label="Default status example" />
        <h2>Loading...</h2>
      </>
    );
  }
  return (
    <div>
      <AccountNav />
      <div className="flex justify-between">
        <br />
        <Link
          className="inline-flex items-center text-white rounded-full bg-primary gap-1 px-6 py-2 hover:opacity-80"
          to={"/account/places/new"}
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
              d="M12 6v12m6-6H6"
            />
          </svg>
          Add new place
        </Link>
        <Link to={"/account/places/trashed"}>
          <Tooltip content={`Recent deleted ${deleteCount} places`}>
            <Button className="bg-gray-500  hover:bg-gray-400">
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
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </Button>
          </Tooltip>
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((place) => (
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
                <p className="text-sm mt-2 hidden lg:inline-block">
                  {place.description}
                </p>
              </div>
              <Button
                color="failure"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDel(true);
                  setPlaceId(place._id);
                }}
                className="flex items-center -mt-4 -mr-4 bg-red-500 px-2 text-white hover:opacity-80 "
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
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
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
                      Are you sure you want to delete this place?
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
      <div>
        {places.length == 0 && (
          <h2 className="text-2xl text-center font-bold dark:text-white">
            You have not posted any places yet!
          </h2>
        )}
      </div>
    </div>
  );
}
