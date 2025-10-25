"use client";

import React, { useEffect, useState } from "react";
import packageVM from "@/viewmodel/packageVM";
import Gallery from "@/components/Gallery";
import Image from "next/image";
import Header from "@/components/Header";
import { offerPackages } from "@/data/OfferPackage";
import { OfferGroupTour } from "@/components/OfferSection";
import { popularDestinationsData } from "@/data/NavData.js";
import CustomerReviews from "@/components/Reviews";

export default function Home() {
  const {
    getPlaceList,
    getOfferPackages,
    getPopularDestinationsData,
    getAroundIndiaData,
    getAllBookings,
  } = packageVM();
  const [loading, setLoading] = useState(true);
  const [offerLoading, setOfferLoading] = useState(true);
  const [popularLoading, setPopularLoading] = useState(true);
  const [placeLoading, setPlaceLoading] = useState(true);
  
  const [offers, setOffers] = useState([]);
  const [populars, setPopulars] = useState([]);
  const [places, setPlaces] = useState([]);

  // Update main loading state whenever individual loading states change
  useEffect(() => {
    setLoading(offerLoading && popularLoading && placeLoading);
  }, [offerLoading, popularLoading, placeLoading]);

  useEffect(() => {
    const loadPackages = async () => {
      setOfferLoading(true); 
      setPopularLoading(true); 
      setPlaceLoading(true); 

      try {
        // Load offers
        const offers = await getOfferPackages();
        setOffers(offers);
        setOfferLoading(false);

        // Load populars
        const populars = await getPopularDestinationsData();
        setPopulars(populars);
        setPopularLoading(false);

        // Load places
        const places = await getPlaceList();
        setPlaces(places);
        setPlaceLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        // Set loading states to false even on error
        setOfferLoading(false);
        setPopularLoading(false);
        setPlaceLoading(false);
      }
    };

    loadPackages();
  }, []);

  // Loading component with fixed height
  const LoadingSpinner = ({ message = "Loading..." }) => (
    <div className="h-64 sm:h-80 w-full flex items-center justify-center">
      <div className="text-center text-gray-600 flex flex-col items-center">
        <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 border-4 sm:border-6 md:border-8 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
        <h2 className="text-sm sm:text-lg md:text-xl font-semibold mt-2 sm:mt-4">{message}</h2>
      </div>
    </div>
  );

  // If everything is still loading, show main loading screen
  if (loading) {
    return (
      <div className="flex flex-col gap-16 sm:gap-32 text-black pb-32 sm:pb-40">
        <Header />
        <LoadingSpinner message="Loading packages..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 sm:gap-32 text-black pb-16 sm:pb-32">
      <Header />

      <div id="main" className="flex flex-col gap-16 sm:gap-32 text-black">
        {/* Offers Section */}
        {!offerLoading && offers && offers.length > 0 && (
          <OfferGroupTour pkg={offers[0]} />
        )}
        {offerLoading && <LoadingSpinner message="Loading offers..." />}

        {/* Popular Destinations Section */}
        {!popularLoading && populars && populars.length > 0 && (
          <>
            {populars.map((data, idx) => (
              <Gallery key={`popular-${idx}`} data={data} />
            ))}
          </>
        )}
        {popularLoading && <LoadingSpinner message="Loading popular destinations..." />}

        {/* Places Section */}
        {!placeLoading && places && places.length > 0 && (
          <>
            {places.map((data, idx) => (
              <Gallery key={`place-${idx}`} data={data} />
            ))}
          </>
        )}
        {placeLoading && <LoadingSpinner message="Loading places..." />}

      </div>

      <CustomerReviews/>
    </div>
  );
}
