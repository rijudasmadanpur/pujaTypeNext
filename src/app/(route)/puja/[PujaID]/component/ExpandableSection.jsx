"use client";
import React, { useState } from "react";

export default function ExpandableSection({ getPuja, className = "" }) {
  // List of sections with id, title, show, and content
  const sections = [
    {
      id: "summary",
      title: "Summary",
      show: !!getPuja?.Summary,
      content: getPuja.Summary,
    },
    {
      id: "whyToPerform",
      title: "Why To Perform",
      show: !!getPuja?.WhyToPerform,
      content: getPuja.WhyToPerform,
    },
    {
      id: "whenToPerform",
      title: "When To Perform",
      show: !!getPuja?.WhenToPerform,
      content: getPuja.WhenToPerform,
    },
    {
      id: "details",
      title: "Details",
      show: !!getPuja?.DetailedDescription,
      content: getPuja.DetailedDescription,
    },
    {
      id: "history",
      title: "History",
      show: !!getPuja?.History,
      content: getPuja.History,
    },
    {
      id: "howToPerform",
      title: "How To Perform",
      show: !!getPuja?.HowToPerform,
      content: getPuja.HowToPerform,
    },
    {
      id: "whatToOffer",
      title: "What To Offer",
      show: !!getPuja?.WhatToOffer,
      content: getPuja.WhatToOffer,
    },
    {
      id: "mantras",
      title: "Mantras",
      show: !!getPuja?.Mantras,
      content: getPuja.Mantras,
    },
    {
      id: "pushpanjaliMantra",
      title: "Pushpanjali Mantra",
      show: !!getPuja?.PushpanjaliMantra,
      content: getPuja.PushpanjaliMantra,
    },
    {
      id: "samagri",
      title: "Samagri",
      show: !!getPuja?.Samagri,
      content: getPuja.Samagri,
    },
    {
      id: "colors",
      title: "Flowers & Clothes Colors",
      show: !!(getPuja?.FlowersColors || getPuja?.ClothesColors),
      content: (
        <div className="flex flex-wrap items-start justify-start gap-3 sm:gap-4 text-xs sm:text-sm mt-2">
          {getPuja?.FlowersColors && (
            <span className="flex items-center gap-1 sm:gap-2 text-gray-600">
              🌸 Flowers: {getPuja.FlowersColors}
            </span>
          )}
          {getPuja?.ClothesColors && (
            <span className="flex items-center gap-1 sm:gap-2 text-gray-600">
              👗 Clothes: {getPuja.ClothesColors}
            </span>
          )}
        </div>
      ),
    },
    {
      id: "prasadPrep",
      title: "Prasad Preparation",
      show: !!(getPuja?.PrasadPrepLink1 || getPuja?.PrasadPrepLink2),
      content: (
        <ul className="list-disc ml-5 text-blue-600">
          {getPuja?.PrasadPrepLink1 && (
            <li>
              <a
                href={
                  getPuja.PrasadPrepLink1.startsWith("http")
                    ? getPuja.PrasadPrepLink1
                    : `https:${getPuja.PrasadPrepLink1}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Link 1
              </a>
            </li>
          )}
          {getPuja?.PrasadPrepLink2 && (
            <li>
              <a
                href={
                  getPuja.PrasadPrepLink2.startsWith("http")
                    ? getPuja.PrasadPrepLink2
                    : `https:${getPuja.PrasadPrepLink2}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Link 2
              </a>
            </li>
          )}
        </ul>
      ),
    },
    {
      id: "entryTime",
      title: "Entry Timestamp",
      show: !!getPuja?.EntryTimeStamp,
      content: (
        <div className="text-xs text-gray-400">
          Entry: {getPuja.EntryTimeStamp}
        </div>
      ),
    },
  ];

  // Filter sections to only those that should be shown
  const visibleSections = sections.filter((section) => section.show);

  // Default to first visible tab
  const [activeTab, setActiveTab] = useState(
    visibleSections.length > 0 ? visibleSections[0].id : null
  );

  return (
    <div
      className={`w-full text-left self-start justify-self-start ${className} mt-10`}
    >
      {/* Tab bar */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {visibleSections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`px-4 py-2 whitespace-nowrap font-semibold text-sm sm:text-base ${
              activeTab === section.id
                ? "border-b-2 border-blue-500 text-blue-700"
                : "text-gray-700"
            }`}
            onClick={() => setActiveTab(section.id)}
            aria-selected={activeTab === section.id}
            aria-controls={`${section.id}-content`}
            tabIndex={0}
          >
            {section.title}
          </button>
        ))}
      </div>
      {/* Tab content */}
      <div className="py-4 mb-10 ">
        {visibleSections.map(
          (section) =>
            activeTab === section.id && (
              <div
                key={section.id}
                id={`${section.id}-content`}
                className="text-gray-700 text-sm sm:text-base"
              >
                {section.content}
              </div>
            )
        )}
      </div>
    </div>
  );
}
