import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RoomPage = lazy(() => import("../../pages/RoomPage/RoomPage"));

const index = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen bg-white flex justify-center items-center">
          <h1 className="text-9xl">LOADING...........</h1>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:roomID" element={<RoomPage />} />
      </Routes>
    </Suspense>
  );
};

export default index;
