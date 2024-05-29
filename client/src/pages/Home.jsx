import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper"
import { Navigation } from "swiper/modules"
import "swiper/css/bundle"
import ListingItem from "../components/ListingItem"
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

SwiperCore.use([Navigation]);

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const offerListingsRef = useRef(null);
  const rentListingsRef = useRef(null);
  const saleListingsRef = useRef(null);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.error("Error fetching offer listings:", error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
      } catch (error) {
        console.error("Error fetching rent listings:", error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.error("Error fetching sale listings:", error);
      }
    };

    fetchOfferListings();
    fetchRentListings();
    fetchSaleListings();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const animateListings = (ref) => {
      setTimeout(() => {
        if (ref.current && ref.current.children.length > 0) {
          gsap.fromTo(
            ref.current.children,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.2,
              duration: 0.8,
              scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "top center",
                scrub: 1,
                markers: false, // Add markers to help visualize the trigger points
              },
            }
          );
        }
      }, 100); // Delay to ensure elements are fully rendered
    };

    if (offerListings.length > 0) animateListings(offerListingsRef);
    if (rentListings.length > 0) animateListings(rentListingsRef);
    if (saleListings.length > 0) animateListings(saleListingsRef);
  }, [offerListings, rentListings, saleListings]);

  return (
    <div>
      {/* topside */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find Your Next <span className="text-slate-500">Perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          useEstate is a platform that connects homeowners and investors. It allows you to find your next perfect place to live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link className="text-xs sm:text-sm font-bold text-blue-800 hover:underline" to="/search">
          Let's get Started...
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div ref={offerListingsRef}>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
              <Link className="text-sm text-blue-800 hover:underline" to="/search?offer=true">
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div ref={rentListingsRef}>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent places for rent</h2>
              <Link className="text-sm text-blue-800 hover:underline" to="/search?type=rent">
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div ref={saleListingsRef}>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Recent places for sale</h2>
              <Link className="text-sm text-blue-800 hover:underline" to="/search?type=sale">
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
