"use client";

import React, { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/app/context/AuthContext";
import ImageUpload from "../../pandit/dashboard/compoenent/ImageUpload";

const DevoteeProfilePage = () => {
    const [activeTab, setActiveTab] = useState("about");
    const { user } = useAuth();
    console.log("Devotee Profile User:", user);

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg font-semibold text-gray-700">Please wait...</p>
            </div>
        );
    }

    const userProfile = user.Profile;

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

    const EditableSection = ({ children }: { children: React.ReactNode }) => {
        return (
            <div className="relative group">
                <button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition p-2 rounded-full hover:bg-gray-100">
                    <Pencil className="w-4 h-4 text-gray-600" />
                </button>
                {children}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <Card className="mb-6 overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-600 to-red-300 h-32"></div>
                    <CardContent className="relative pt-16">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                            <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-6">
                                <div className="absolute -top-16 left-6">
                                    <div className="w-32 h-32 bg-white rounded-full border-4 border-white flex items-center justify-center">
                                        <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
                                            {/* <span className="text-2xl font-bold text-gray-600">
                                                {userProfile?.Name?.charAt(0).toUpperCase() || "U"}
                                            </span> */}
                                            <img src={userProfile?.Picture ? `${process.env.NEXT_PUBLIC_API_URL2}/${userProfile?.Picture}` : "/img/user/1.png"}
                                                alt={userProfile?.FirstName + " " + userProfile?.LastName}
                                                className="w-28 h-28 rounded-full object-cover shadow-2xl border-4 border-orange-200"
                                            />
                                        </div>
                                        <div className="absolute -bottom-4 -right-4 bg-green-500  rounded-full text-sm font-medium shadow-lg">
                                            <ImageUpload userType="2" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-20 md:mt-0 md:ml-40">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {userProfile?.Name || "User"}
                                    </h1>
                                    <div className="flex items-center space-x-2 mt-2">
                                        <MapPin className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600">
                                            {userProfile?.CityName}, {userProfile?.StateName}, {userProfile?.CountryName}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <div className="flex items-center space-x-1">
                                            {renderStars(4)}
                                        </div>
                                        <span className="text-sm text-gray-500">4.0 (12 reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Badge
                                    variant={userProfile?.Active === 1 ? "default" : "secondary"}
                                    className={`${userProfile?.Active === 1
                                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                        }`}
                                >
                                    {userProfile?.Active === 1 ? "Active" : "Inactive"}
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Contact Info Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Phone</p>
                                        <p className="font-medium">{userProfile?.PhoneNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">WhatsApp</p>
                                        <p className="font-medium">{userProfile?.WhatsappNumber}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium break-all">{userProfile?.EmailAddress}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Location Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Location Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Address:</span>
                                    <span className="text-sm font-medium text-right">{userProfile?.Address}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Location:</span>
                                    <span className="text-sm font-medium text-right">{userProfile?.Location}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">City:</span>
                                    <span className="text-sm font-medium text-right">{userProfile?.CityName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">State:</span>
                                    <span className="text-sm font-medium text-right">{userProfile?.StateName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Country:</span>
                                    <span className="text-sm font-medium text-right">{userProfile?.CountryName}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-6">
                                <TabsTrigger value="about" className="flex items-center space-x-2">
                                    <BookOpen className="w-4 h-4" />
                                    <span>About</span>
                                </TabsTrigger>
                                <TabsTrigger value="profile" className="flex items-center space-x-2">
                                    <Users className="w-4 h-4" />
                                    <span>Profile</span>
                                </TabsTrigger>
                                <TabsTrigger value="activity" className="flex items-center space-x-2">
                                    <Award className="w-4 h-4" />
                                    <span>Activity</span>
                                </TabsTrigger>
                            </TabsList>

                            {/* About Tab */}
                            <TabsContent value="about">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center justify-between">
                                            <span>About</span>
                                            <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                                <Pencil className="w-4 h-4" />
                                                <span>Edit</span>
                                            </Button>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <EditableSection>
                                            <div className="space-y-4">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 mb-2">Comments</h3>
                                                    <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                                                        {userProfile?.Comments || "No comments available"}
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-2">Member Since</h3>
                                                        <p className="text-gray-700">
                                                            {userProfile?.EntryTimeStamp
                                                                ? new Date(userProfile.EntryTimeStamp).toLocaleDateString()
                                                                : "N/A"
                                                            }
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-2">User Type</h3>
                                                        <Badge variant="secondary">
                                                            {user.UserType === 2 ? "Devotee" : "User"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </EditableSection>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Profile Tab */}
                            <TabsContent value="profile">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Profile Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                                    <p className="mt-1 text-gray-900">{userProfile?.Name}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                                    <p className="mt-1 text-gray-900">{userProfile?.EmailAddress}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">Phone</label>
                                                    <p className="mt-1 text-gray-900">{userProfile?.PhoneNumber}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">WhatsApp</label>
                                                    <p className="mt-1 text-gray-900">{userProfile?.WhatsappNumber}</p>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">Status</label>
                                                    <div className="mt-1">
                                                        <Badge
                                                            variant={userProfile?.Active === 1 ? "default" : "secondary"}
                                                            className={
                                                                userProfile?.Active === 1
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-gray-100 text-gray-800"
                                                            }
                                                        >
                                                            {userProfile?.Active === 1 ? "Active" : "Inactive"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-sm font-medium text-gray-700">Devotee ID</label>
                                                    <p className="mt-1 text-gray-900">{userProfile?.DevoteeID}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Activity Tab */}
                            <TabsContent value="activity">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Account Activity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                                    <div>
                                                        <p className="font-medium">Profile Created</p>
                                                        <p className="text-sm text-gray-600">
                                                            {userProfile?.EntryTimeStamp
                                                                ? new Date(userProfile.EntryTimeStamp).toLocaleString()
                                                                : "N/A"
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <Award className="w-5 h-5 text-blue-600" />
                                                    <div>
                                                        <p className="font-medium">Account Status</p>
                                                        <p className="text-sm text-gray-600">
                                                            {userProfile?.Active === 1 ? "Verified and Active" : "Inactive"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevoteeProfilePage;