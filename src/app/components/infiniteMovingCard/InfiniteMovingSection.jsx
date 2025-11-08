"use client";
import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

// Dummy data for infinite moving cards
const cards = [
  // {
  //   name: "Amit Sharma",
  //   title: "Puja Customer, Delhi",
  //   quote:
  //     "The experience was divine and seamless. The pandit was knowledgeable and the arrangements were perfect.",
  // },
  // {
  //   name: "Priya Verma",
  //   title: "Puja Customer, Mumbai",
  //   quote:
  //     "Booking a puja was never this easy. Highly recommended for anyone looking for authentic rituals.",
  // },
  // {
  //   name: "Rahul Singh",
  //   title: "Puja Customer, Bangalore",
  //   quote:
  //     "Very professional service and the pandit explained every step of the puja. Will use again!",
  // },
  // {
  //   name: "Suman Das",
  //   title: "Puja Customer, Kolkata",
  //   quote:
  //     "The arrangements were perfect and the puja was conducted with utmost devotion.",
  // },
  // {
  //   name: "Neha Gupta",
  //   title: "Puja Customer, Pune",
  //   quote:
  //     "Excellent service and very easy to book. The pandit was punctual and knowledgeable.",
  // },
  {
    name: "Neha Gupta",
    title: "Puja Customer, Pune",
    quote:
      "Excellent service and very easy to book. The pandit was punctual and knowledgeable.",
  },
  {
    name: "Neha Gupta",
    title: "Puja Customer, Pune",
    quote:
      "Excellent service and very easy to book. The pandit was punctual and knowledgeable.",
  },
  {
    name: "Neha Gupta",
    title: "Puja Customer, Pune",
    quote:
      "Excellent service and very easy to book. The pandit was punctual and knowledgeable.",
  },
  {
    name: "Neha Gupta",
    title: "Puja Customer, Pune",
    quote:
      "Excellent service and very easy to book. The pandit was punctual and knowledgeable.",
  },
  {
    name: "Neha Gupta",
    title: "Puja Customer, Pune",
    quote:
      "Excellent service and very easy to book. The pandit was punctual and knowledgeable.",
  },
  {
    name: "Neha Gupta",
    title: "Puja Customer, Pune",
    quote:
      "Excellent service and very easy to book. The pandit was punctual and knowledgeable.",
  },
];

export default function InfiniteMovingSection() {
  return (
    <div className="w-full py-12 bg-white">
      <InfiniteMovingCards
        items={cards}
        speed="fast"
        direction="left"
        pauseOnHover={false}
      />
    </div>
  );
}
