"use client";

import React, { use, useEffect, useState } from "react";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Award,
  BookOpen,
  Users,
  Pencil,
} from "lucide-react";
import Cookies from "js-cookie";
import ImageUpload from "./compoenent/ImageUpload";
import { useAuth } from "@/app/context/AuthContext";
import { getPanditById } from "@/lib/api";

const PanditProfilePage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const { user, login, logout } = useAuth();
  const userId = Cookies.get("userId");
  console.log("userId from cookie:", userId);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-700">please wait....</p>
      </div>
    );
  }

  const userProfile = user?.Profile || {};
  // =================================================================================




  // =================================================================================


  // Helper functions
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
      />
    ));
  };

  function EditableSection({ children }: { children: React.ReactNode }) {
    return (
      <div className="relative group">
        <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition p-2 rounded-full hover:bg-gray-100">
          <Pencil className="w-5 h-5 text-gray-600" />
        </button>
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header Section */}
      <EditableSection>
        <div className="bg-white shadow-lg border-b-4 border-orange-500">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={userProfile.Picture ? `${process.env.NEXT_PUBLIC_API_URL2}/${userProfile?.Picture}` : "/img/user/1.png"}
                    alt={userProfile?.FirstName + " " + userProfile?.LastName}
                    className="w-64 h-64 rounded-2xl object-cover shadow-2xl border-4 border-orange-200"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-green-500  rounded-full text-sm font-medium shadow-lg">
                    <ImageUpload userType="1" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {userProfile.FirstName} {userProfile.LastName}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <span className="text-lg">
                      {userProfile.CityName}, {userProfile.StateName}, {userProfile.CountryName}
                    </span>
                  </div>

                  {/* Rating & Stats (placeholder since API doesn’t provide) */}
                  <div className="flex flex-wrap items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      {renderStars(4.5)}
                      <span className="font-semibold text-lg">4.5</span>
                      <span className="text-gray-500">(120 reviews)</span>
                    </div>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-xl border border-orange-200">
                      <div className="flex items-center gap-3">
                        <Award className="w-8 h-8 text-orange-600" />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {userProfile.Experience} Years
                          </div>
                          <div className="text-sm text-gray-600">Experience</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-green-600" />
                        <div>
                          <div className="font-semibold text-gray-900">100+</div>
                          <div className="text-sm text-gray-600">Completed Pujas</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                        <div>
                          <div className="font-semibold text-gray-900">{user?.Languages?.length || 0} Languages</div>
                          <div className="text-sm text-gray-600">Languages</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons placeholder */}
              </div>
            </div>
          </div>
        </div>
      </EditableSection>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Tabs */}
          <div className="lg:col-span-2 space-y-8">
            <EditableSection>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {/* Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-gray-200">
                  {[
                    { id: "about", label: "About", icon: Users },
                    { id: "services", label: "Services & Pricing", icon: BookOpen },
                    { id: "qualifications", label: "Qualifications", icon: Award },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-medium transition-all ${activeTab === tab.id
                          ? "bg-orange-500 text-white"
                          : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                  {activeTab === "about" && (
                    <EditableSection>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">About Pandit Ji</h3>
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {userProfile.AboutPandit || "No description available."}
                          </p>
                        </div>

                        {/* Languages */}
                        <div>
                          <h4 className="text-xl font-semibold text-gray-900 mb-3">Languages Spoken</h4>
                          <div className="flex flex-wrap gap-3">
                            {user?.Languages?.length > 0 ? (
                              user.Languages.map((lang: any, index: number) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium border border-blue-200"
                                >
                                  {lang.LanguageName}
                                </span>
                              ))
                            ) : (
                              <p className="text-gray-600">No languages available.</p>
                            )}

                          </div>
                        </div>
                      </div>
                    </EditableSection>
                  )}

                  {activeTab === "services" && (
                    <EditableSection>
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Services & Pricing</h3>
                        <div className="grid gap-4">
                          {user.Services && user.Services.length > 0 ? (
                            user.Services.map((service: any, index: number) => (
                              <div
                                key={index}
                                className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="text-lg font-semibold text-gray-900">{service.PujaName}</h4>
                                    <p className="text-gray-600 mt-1">{service.Description}</p>
                                    <p className="text-gray-600 mt-1">Duration: {service.DurationHours} hrs</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-2xl font-bold text-green-600">₹{service.PersonalPrice}</div>
                                    <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                                      Book Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-gray-600 text-lg">
                              No services available at the moment.
                            </div>
                          )}

                        </div>
                      </div>
                    </EditableSection>
                  )}

                  {activeTab === "qualifications" && (
                    <EditableSection>
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualifications</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Certifications */}
                          <div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">Certifications</h4>
                            <div className="space-y-2">
                              {user.Certifications.length > 0 ? (
                                user.Certifications.map((cert: any, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                                  >
                                    <Award className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    <span className="text-gray-800">{cert.Certification}</span>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-600">No certifications.</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </EditableSection>
                  )}
                </div>
              </div>
            </EditableSection>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <EditableSection>
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-800">{userProfile.AlternatePhoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-800">{user.Email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-800">
                      {userProfile.CityName}, {userProfile.StateName}, {userProfile.CountryName}
                    </span>
                  </div>
                </div>
              </div>
            </EditableSection>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanditProfilePage;
