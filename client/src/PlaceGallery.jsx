import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 text-white bg-black min-h-screen">
        <div className="bg-black pb-16">
          <h2 className="text-3xl text-center my-8">Photos of {place.title}</h2>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="fixed right-16 text-sm flex gap-1 py-1 px-3 bg-white text-black hover:bg-black hover:text-white rounded-2xl border shadow-md shadow-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
            Close photos
          </button>
          <div className="flex flex-col items-center gap-5">
            {place?.photos?.length > 0 &&
              place.photos.map((photo, index) => (
                <div key={index} className="w-2/3">
                  <img
                    className="w-full"
                    src={`http://localhost:4000/uploads/${photo}`}
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative rounded-3xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2">
        <div>
          {place.photos?.[0] && (
            <div>
              <img
                onClick={() => setShowAllPhotos(true)}
                className="aspect-square object-cover cursor-pointer"
                src={`http://localhost:4000/uploads/${place.photos[0]}`}
                alt=""
              />
            </div>
          )}
        </div>
        <div>
          <div className="grid">
            {place.photos?.[1] && (
              <div>
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={`http://localhost:4000/uploads/${place.photos[1]}`}
                  alt=""
                />
              </div>
            )}
            {place.photos?.[2] && (
              <div className="overflow-hidden">
                <img
                  onClick={() => setShowAllPhotos(true)}
                  className="aspect-square object-cover cursor-pointer relative top-2"
                  src={`http://localhost:4000/uploads/${place.photos[2]}`}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllPhotos(true)}
        className="flex gap-2 absolute right-2 bottom-2 py-2 px-4 bg-white rounded-2xl border shadow-md shadow-gray-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        Show more photos
      </button>
    </div>
  );
}
