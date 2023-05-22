import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function PlaceImg({ place, index = 0, className = null }) {
  if (!place.photos?.length) return "";
  if (!className) className = "object-cover w-full";
  const {  api } = useContext(UserContext);

  return (
    <img
      className={className}
      src={`${api}/uploads/` + place.photos[index]}
      alt=""
    />
  );
}
