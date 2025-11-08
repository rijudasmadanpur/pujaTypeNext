import { Navbar } from "@/app/components/navbar/navbar";
import React from "react";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Award,
  Users,
  IndianRupee,
} from "lucide-react";
import PanditBookDialog from "./component/PanditBookDialog";
import { getPanditById } from "@/lib/api";

interface PanditPageProps {
  params: Promise<{
    PujaID: string;
    PanditID: string;
  }>;
}

interface Service {
  PujaName?: string;
  DurationHours?: number | string;
  PersonalPrice?: number | string;
  CommercialPrice?: number | string;
}

interface Availability {
  day?: string;
  time?: string;
}

export default async function PanditDetailsPage({
  params,
}: PanditPageProps) {
  // Await the params promise
  const { PanditID } = await params;
  console.log("Received PanditID:", PanditID);

  const response = await getPanditById(PanditID);
  const pandit = response.user || {};
  console.log("Pandit Data:", pandit);

  // Profile info
  const profile = pandit.Profile || {};
  const name = `${profile.FirstName} ${profile.LastName}` || "Pandit Ji";
  const picture = profile?.Picture
    ? `${process.env.NEXT_PUBLIC_API_URL2}/${profile?.Picture}`
    : `/img/pandit/${pandit?.UsersID % 10}.jpg`;

  const experience = profile.Experience ?? 0;
  const phone = profile.AlternatePhoneNumber ?? "-";
  const email = profile.Email ?? "-";
  const location = profile.CityName ?? "-";
  const description = profile.AboutPandit ?? "-";
  console.log("picture", picture);

  // Other arrays
  const completedPujas = profile.completedPujas ?? 0;
  const rating = profile.rating ?? 0;
  const totalReviews = profile.totalReviews ?? 0;
  const languages: string[] = pandit.Languages?.map((l: any) => l.LanguageName) ?? [];
  const services: Service[] = pandit.Services ?? [];
  const specializations: string[] = pandit.Specializations ?? [];
  const education: string[] = []; // Not provided in API
  const certifications: string[] =
    pandit.Certifications?.map((c: any) => c.Certification) ?? [];
  const availability: Availability[] = pandit.Availability ?? [];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < Math.floor(rating)
          ? "fill-yellow-400 text-yellow-400"
          : index < rating
            ? "fill-yellow-200 text-yellow-400"
            : "text-gray-300"
          }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="lg:flex">
              {/* Image Section */}
              <div className="lg:w-2/5 flex justify-center">
                <div className="w-3/4 h-64 lg:h-96 relative">
                  <img
                    src={picture}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Info Section */}
              <div className="lg:w-3/5 p-6 lg:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {name}
                    </h1>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      {renderStars(rating)}
                    </div>
                    <p className="text-sm text-gray-600">
                      {rating.toFixed(1)} ({totalReviews} reviews)
                    </p>
                  </div>
                </div>

                {/* Experience & Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <Award className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-semibold text-orange-600">
                      {experience} Years
                    </p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Users className="w-6 h-6 text-green-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="font-semibold text-green-600">
                      {completedPujas.toLocaleString()} Pujas
                    </p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg col-span-2 lg:col-span-1">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Languages</p>
                    <p className="font-semibold text-blue-600">
                      {languages.length} Languages
                    </p>
                  </div>
                </div>

                {/* Specializations */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {specializations.map((spec: any, index: number) => (
                    <span
                      key={spec.SpecializationID || index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                    >
                      {spec.SpecializationName}
                    </span>
                  ))}
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <PanditBookDialog />
                  <button className="flex-1 cursor-pointer border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="px-4 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About Pandit Ji
              </h2>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            {/* Services & Pricing */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Services & Pricing
              </h2>
              <div className="grid gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {service.PujaName ?? "-"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Duration: {service.DurationHours ?? "-"} hours
                        </p>
                      </div>

                      <div className="text-right flex flex-col sm:items-center gap-1">
                        <div className="flex items-center gap-1 font-bold text-lg text-green-600">
                          <p>Personal price</p>
                          <IndianRupee className="w-4 h-4" />
                          {Number(service.PersonalPrice ?? 0).toLocaleString()}
                        </div>

                        <div className="flex items-center gap-1 font-bold text-lg text-green-600">
                          <p>Commercial price</p>
                          <IndianRupee className="w-4 h-4" />
                          {Number(service.CommercialPrice ?? 0).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Qualifications
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Education</h3>
                  <ul className="space-y-2">
                    {education.map((edu, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Certifications
                  </h3>
                  <ul className="space-y-2">
                    {certifications.map((cert, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">{phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">{email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">{location}</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Languages Spoken
              </h2>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Availability
              </h2>
              <div className="space-y-3">
                {availability.map((slot, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <span className="font-medium text-gray-900 min-w-[80px]">
                      {slot.day ?? "-"}
                    </span>
                    <span className="text-sm text-gray-600 text-right">
                      {slot.time ?? "-"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Book */}
            <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Book Now</h2>
              <p className="text-orange-100 mb-4 text-sm">
                Get instant confirmation for your puja booking
              </p>
              <button className="w-full bg-white text-orange-600 hover:bg-orange-50 px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}