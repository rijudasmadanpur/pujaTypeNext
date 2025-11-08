'use client'

import { useLocation } from '@/app/context/LocationContext'
import { getAllPuja, getPanditWithPuja } from '@/lib/api'
import { City, Country, State, ICountry, IState, ICity } from 'country-state-city'
import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useParams, useRouter } from 'next/navigation'

// Type definitions (keep your existing interfaces)
interface Puja {
    ID: string;
    PujaName: string;
}

interface Service {
    PujaName: string;
    PersonalPrice: number;
}

interface Specialization {
    SpecializationID: string;
    SpecializationName: string;
}

interface Profile {
    FirstName: string;
    LastName: string;
    CountryCode: string;
    StateCode: string;
    CityName: string;
    StateName: string;
    Picture?: string;
    Experience: number;
}

interface Pandit {
    UsersID: string;
    Profile: Profile;
    Services: Service[];
    Specializations: Specialization[];
}

interface PanditResponse {
    user: Pandit[];
}

export default function PanditListingPage() {
    const params = useParams()
    const PujaID = params.PujaID as string
    console.log("PujaID from params:", PujaID)

    const [allPandits, setAllPandits] = useState<Pandit[]>([])
    const [filteredPandits, setFilteredPandits] = useState<Pandit[]>([])
    const [loading, setLoading] = useState(true)
    const { location, setLocation } = useLocation()
    const router = useRouter()

    // Track if initial load has been done
    const [initialLoadDone, setInitialLoadDone] = useState(false)

    // Filter states - use null instead of empty string for "all" option
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
    const [selectedState, setSelectedState] = useState<string | null>(null)
    const [selectedCity, setSelectedCity] = useState<string | null>(null)
    const [selectedPuja, setSelectedPuja] = useState<string | null>(null)
    const [allPuja, setAllPuja] = useState<Puja[]>([])

    // Available options
    const [availablePujas, setAvailablePujas] = useState<string[]>([])
    const [availableCountries, setAvailableCountries] = useState<ICountry[]>([])
    const [availableStates, setAvailableStates] = useState<IState[]>([])
    const [availableCities, setAvailableCities] = useState<ICity[]>([])

    // Fetch all pujas on component mount
    useEffect(() => {
        const fetchAllPuja = async () => {
            try {
                const res = await getAllPuja();
                console.log("All Pujas:", res)
                setAllPuja(res)
            } catch (err) {
                console.log("Error fetching pujas:", err)
            }
        }
        fetchAllPuja()
    }, [])

    // Set selected puja from params when component mounts
    useEffect(() => {
        if (PujaID) {
            console.log("Setting selected puja from params:", PujaID)
            setSelectedPuja(PujaID)
        }
    }, [PujaID])

    // Initialize countries
    useEffect(() => {
        const countries = Country.getAllCountries()
        setAvailableCountries(countries)
    }, [])

    // Initial data load when location and puja ID are available
    useEffect(() => {
        async function fetchInitialPandits() {
            if (!PujaID || !location.cityCode || initialLoadDone) return

            try {
                setLoading(true)
                console.log("Fetching initial pandits with:", {
                    PujaID,
                    country: location.countryCode,
                    state: location.stateCode,
                    city: location.cityCode
                })

                // Set initial filter values from location context
                setSelectedCountry(location.countryCode)
                setSelectedState(location.stateCode)
                setSelectedCity(location.cityName)

                const res: PanditResponse = await getPanditWithPuja(
                    PujaID,
                    location.countryCode,
                    location.stateCode,
                    location.cityCode
                )
                console.log("Initial pandits response:", res)
                setAllPandits(res.user || [])
                setInitialLoadDone(true)
            } catch (error) {
                console.error("Error fetching initial pandits:", error)
                setAllPandits([])
                setInitialLoadDone(true)
            } finally {
                setLoading(false)
            }
        }

        fetchInitialPandits()
    }, [location, PujaID, initialLoadDone])

    // Fetch data when user manually changes location filters
    useEffect(() => {
        async function fetchPanditsByLocation() {
            // Don't fetch if initial load hasn't happened yet
            if (!initialLoadDone || !PujaID) return

            // Only fetch if all location filters are set and this is a user-initiated change
            if (selectedCountry && selectedState && selectedCity) {
                try {
                    setLoading(true)
                    console.log("Fetching pandits based on user location selection:", {
                        PujaID,
                        selectedCountry,
                        selectedState,
                        selectedCity
                    })

                    const res: PanditResponse = await getPanditWithPuja(
                        PujaID,
                        selectedCountry,
                        selectedState,
                        selectedCity
                    )
                    console.log("Location-based pandits response:", res)
                    setAllPandits(res.user || [])
                } catch (error) {
                    console.error("Error fetching pandits:", error)
                    setAllPandits([])
                } finally {
                    setLoading(false)
                }
            }
        }

        // Only fetch if this is a user-initiated change (not initial load)
        if (initialLoadDone) {
            fetchPanditsByLocation()
        }
    }, [selectedCity, selectedCountry, selectedState, initialLoadDone, PujaID])

    // Extract unique pujas from all pandits
    useEffect(() => {
        const pujas = Array.from(
            new Set(
                allPandits.flatMap(pandit =>
                    pandit.Services.map(service => service.PujaName)
                )
            )
        )
        setAvailablePujas(pujas)
    }, [allPandits])

    // Update states when country changes
    useEffect(() => {
        if (selectedCountry) {
            const states = State.getStatesOfCountry(selectedCountry)
            setAvailableStates(states)
            // Only reset state and city if this is not the initial setting from location context
            if (initialLoadDone) {
                setSelectedState(null)
                setSelectedCity(null)
            }
        } else {
            setAvailableStates([])
            if (initialLoadDone) {
                setSelectedState(null)
                setAvailableCities([])
                setSelectedCity(null)
            }
        }
    }, [selectedCountry, initialLoadDone])

    // Update cities when state changes
    useEffect(() => {
        if (selectedCountry && selectedState) {
            const cities = City.getCitiesOfState(selectedCountry, selectedState)
            setAvailableCities(cities)
            // Only reset city if this is not the initial setting from location context
            if (initialLoadDone) {
                setSelectedCity(null)
            }
        } else {
            setAvailableCities([])
            if (initialLoadDone) {
                setSelectedCity(null)
            }
        }
    }, [selectedCountry, selectedState, initialLoadDone])

    // Apply filters to display
    useEffect(() => {
        let filtered = allPandits

        // Filter by country
        if (selectedCountry) {
            filtered = filtered.filter(pandit =>
                pandit.Profile.CountryCode === selectedCountry
            )
        }

        // Filter by state
        if (selectedState) {
            filtered = filtered.filter(pandit =>
                pandit.Profile.StateCode === selectedState
            )
        }

        // Filter by city
        if (selectedCity) {
            filtered = filtered.filter(pandit =>
                pandit.Profile.CityName === selectedCity
            )
        }

        setFilteredPandits(filtered)
    }, [allPandits, selectedCountry, selectedState, selectedCity, selectedPuja])

    // Handler functions for filter changes
    const handleCountryChange = (value: string) => {
        setSelectedCountry(value || null)
    }

    const handleStateChange = (value: string) => {
        setSelectedState(value || null)
    }

    const handleCityChange = (value: string) => {
        setSelectedCity(value || null)
    }

    const handlePujaChange = async (value: string) => {
        setSelectedPuja(value || null)
        try {
            setLoading(true)
            console.log("Fetching pandits for puja:", value)

            const res: PanditResponse = await getPanditWithPuja(
                value,
                selectedCountry || location.countryCode || '',
                selectedState || location.stateCode || '',
                selectedCity || location.cityCode || ''
            )
            console.log("Puja change response:", res)
            setAllPandits(res.user || [])
        } catch (error) {
            console.error("Error fetching pandits for puja:", error)
            setAllPandits([])
        } finally {
            setLoading(false)
        }
    }

    // Get initials for avatar fallback
    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
    }

    // Clear all filters
    const clearAllFilters = () => {
        setSelectedCountry(null)
        setSelectedState(null)
        setSelectedCity(null)
        setSelectedPuja(null)
    }

    // Get minimum price from services
    const getMinPrice = (services: Service[]) => {
        if (services.length === 0) return 0
        return Math.min(...services.map(s => s.PersonalPrice))
    }

    if (loading && !initialLoadDone) {
        return (
            <div className="max-w-7xl mx-auto pt-18 bg-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading pandits...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto pt-18 bg-white min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Find Pandits for Your Puja
                    </h1>
                    <p className="text-gray-600">
                        Browse through our verified pandits and filter by location and services
                    </p>
                </div>

                {/* Debug info - remove in production */}
                <div className="mb-4 p-4 bg-yellow-50 rounded-lg text-sm">
                    <p>Debug: PujaID = {PujaID}, Selected Puja = {selectedPuja}</p>
                    <p>All Pandits: {allPandits.length}, Filtered: {filteredPandits.length}</p>
                </div>

                {/* Filters Section */}
                <Card className="mb-8">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">Filters</CardTitle>
                            {(selectedCountry || selectedState || selectedCity || selectedPuja) && (
                                <button
                                    onClick={clearAllFilters}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Country Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country
                                </label>
                                <Select
                                    value={selectedCountry || ''}
                                    onValueChange={handleCountryChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableCountries.map((country) => (
                                            <SelectItem key={country.isoCode} value={country.isoCode}>
                                                {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* State Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State
                                </label>
                                <Select
                                    value={selectedState || ''}
                                    onValueChange={handleStateChange}
                                    disabled={!selectedCountry}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={selectedCountry ? "Select State" : "Select country first"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableStates.map((state) => (
                                            <SelectItem key={state.isoCode} value={state.isoCode}>
                                                {state.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* City Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                </label>
                                <Select
                                    value={selectedCity || ''}
                                    onValueChange={handleCityChange}
                                    disabled={!selectedState}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={selectedState ? "Select City" : "Select state first"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableCities.map((city) => (
                                            <SelectItem key={city.name} value={city.name}>
                                                {city.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Puja Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Puja Service
                                </label>
                                <Select
                                    value={selectedPuja || ''}
                                    onValueChange={handlePujaChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Puja" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {allPuja.map((puja) => (
                                            <SelectItem key={puja.ID} value={puja.ID}>
                                                {puja.PujaName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Active Filters Summary */}
                        {(selectedCountry || selectedState || selectedCity || selectedPuja) && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {selectedCountry && (
                                    <Badge variant="secondary" className="cursor-pointer"
                                        onClick={() => setSelectedCountry(null)}>
                                        Country: {availableCountries.find(c => c.isoCode === selectedCountry)?.name} ×
                                    </Badge>
                                )}
                                {selectedState && (
                                    <Badge variant="secondary" className="cursor-pointer"
                                        onClick={() => setSelectedState(null)}>
                                        State: {availableStates.find(s => s.isoCode === selectedState)?.name} ×
                                    </Badge>
                                )}
                                {selectedCity && (
                                    <Badge variant="secondary" className="cursor-pointer"
                                        onClick={() => setSelectedCity(null)}>
                                        City: {selectedCity} ×
                                    </Badge>
                                )}
                                {selectedPuja && (
                                    <Badge variant="secondary" className="cursor-pointer"
                                        onClick={() => setSelectedPuja(null)}>
                                        Puja: {allPuja.find(p => p.ID === selectedPuja)?.PujaName || selectedPuja} ×
                                    </Badge>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Loading indicator for subsequent loads */}
                {loading && initialLoadDone && (
                    <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                            <p className="text-blue-600">Updating results...</p>
                        </div>
                    </div>
                )}

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Found {filteredPandits.length} pandit{filteredPandits.length !== 1 ? 's' : ''}
                        {(selectedCountry || selectedState || selectedCity || selectedPuja) &&
                            ' matching your criteria'
                        }
                    </p>
                </div>

                {/* Pandits Grid */}
                {filteredPandits.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <p className="text-gray-500 text-lg">No pandits found matching your criteria</p>
                            <p className="text-gray-400 mt-2">Try adjusting your filters</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPandits.map((pandit) => (
                            <Card key={pandit.UsersID} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                                {/* Large Image Section */}
                                <div className="relative h-80 w-full bg-gray-200">
                                    <Avatar className="h-80 w-full rounded-none">
                                        <AvatarImage
                                            src={pandit.Profile.Picture ? `${process.env.NEXT_PUBLIC_API_URL2}/${pandit.Profile.Picture}` : `/img/pandit/${parseInt(pandit.UsersID) % 10 || 0}.jpg`
                                            }
                                            alt={`${pandit.Profile.FirstName} ${pandit.Profile.LastName}`}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="rounded-none text-2xl bg-gray-300">
                                            {getInitials(pandit.Profile.FirstName, pandit.Profile.LastName)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* Experience Badge */}
                                    <div className="absolute top-3 right-3">
                                        <Badge className="bg-white text-gray-900 font-semibold shadow-md">
                                            {pandit.Profile.Experience}+ years
                                        </Badge>
                                    </div>
                                </div>

                                <CardContent className="p-4 space-y-3">
                                    {/* Name and Location */}
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">
                                            {pandit.Profile.FirstName} {pandit.Profile.LastName}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {pandit.Profile.CityName}, {pandit.Profile.StateName}
                                        </p>
                                    </div>

                                    {/* Specializations */}
                                    <div>
                                        <h4 className="font-medium text-sm text-gray-700 mb-2">Specializations:</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {pandit.Specializations?.map((spec) => (
                                                <Badge
                                                    key={spec.SpecializationID}
                                                    variant="outline"
                                                    className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                                                >
                                                    {spec.SpecializationName}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="pt-2 border-t border-gray-100">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Starting from</span>
                                            <span className="text-lg font-bold text-green-600">
                                                ₹{getMinPrice(pandit.Services)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* View Details Button */}
                                    <button onClick={() => router.push(`/puja/${PujaID}/${pandit.UsersID}`)} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                                        View Details
                                    </button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}