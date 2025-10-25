import { create } from "zustand";

import { packageList as localPackageList } from "@/data/PackagesData";
import { referralIndex as localReferralList } from "@/data/ReferralsList";

const packageVM = create((set, get) => ({
  // Runtime cache
  fullPackagesData: null,
  referrals: null,
  places: null,
  offerPackages: null,
  popularDestinations: null,
  aroundIndiaData: null,
  bookings: null,

  // Status
  isLoading: false,
  isLoadingReferrals: false,
  isLoadingPlaces: false,
  isLoadingOfferPackages: false,
  isLoadingPopularDestinations: false,
  isLoadingAroundIndia: false,
  isLoadingBookings: false,
  error: null,

  // UI State
  packages: [],
  filters: { sortBy: "relevance", priceRange: [0, 100000] },
  lastLoadedRoutes: [],

  /* ---------------- Packages ---------------- */
  ensurePackagesLoaded: async () => {
    const { fullPackagesData } = get();
    if (
      fullPackagesData &&
      fullPackagesData.length > 0 &&
      !fullPackagesData[0].__local
    ) {
      return fullPackagesData; // Already loaded from DB
    }

    set({ isLoading: true });
    try {
      // 🔹 Fetch from your DB
      const response = await fetch("/api/packages");
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      const data = await response.json();

      set({ fullPackagesData: data, isLoading: false });
      return data;
    } catch (err) {
      console.error("❌ Failed to load packages:", err);
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  clearPackages: () => set({ packages: [] }),

  clearFullPackagesData: () => set({ fullPackagesData: null }),

  loadPackagesFromRoutes: async (routes) => {
    const { lastLoadedRoutes } = get();
    if (
      JSON.stringify(routes.sort()) === JSON.stringify(lastLoadedRoutes.sort())
    ) {
      return;
    }

    set({ packages: [], isLoading: true, lastLoadedRoutes: [...routes] });

    const allData = await get().ensurePackagesLoaded();
    const packages = routes
      .map((route) => allData.find((pkg) => pkg.route === route))
      .filter(Boolean);

    set({ packages, isLoading: false });
  },

  getPackageByRoute: async (route) => {
    await get().ensurePackagesLoaded();
    const { fullPackagesData } = get();
    return fullPackagesData.find((pkg) => pkg.route === route);
  },

  getTourPackage: async (route) => {
    set({ isLoading: true });
    await get().ensurePackagesLoaded();
    const { fullPackagesData } = get();

    let result = null;
    if (Array.isArray(fullPackagesData)) {
      result = fullPackagesData.find((pkg) => pkg.route === route) || null;
    }

    set({ isLoading: false }); // ✅ flip back only at the end
    return result;
  },

  applyFilters: (filters) => {
    set({ filters });
    const { packages } = get();
    let filtered = [...packages];

    if (filters.priceRange) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.price >= filters.priceRange[0] &&
          pkg.price <= filters.priceRange[1]
      );
    }

    switch (filters.sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "duration":
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
    }

    set({ packages: filtered });
  },

  getAllPackages: async () => {
    return await get().ensurePackagesLoaded();
  },

  /* ---------------- Referrals ---------------- */
  loadReferrals: async () => {
    const { referrals, isLoadingReferrals } = get();

    if (referrals) {
      console.log("📦 Using cached referrals");
      return referrals;
    }

    if (isLoadingReferrals) {
      console.log("⏳ Already loading referrals, waiting...");
      while (get().isLoadingReferrals) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return get().referrals;
    }

    console.log("🚀 Loading referrals for first time...");
    set({ isLoadingReferrals: true, error: null });

    try {
      // 🔹 Fetch from your DB
      const response = await fetch("/api/referrals");
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      const data = await response.json();

      set({ referrals: data, isLoadingReferrals: false });
      console.log(`✅ Loaded ${data.length} referrals`);
      return data;
    } catch (err) {
      console.error("❌ Failed to load referrals:", err);
      set({ error: err, isLoadingReferrals: false });
      throw err;
    }
  },

  getReferralsList: async () => {
    return await get().loadReferrals();
  },

  /* ---------------- Places ---------------- */
  loadPlaces: async () => {
    const { places, isLoadingPlaces } = get();

    if (places) {
      console.log("📦 Using cached places");
      return places;
    }

    if (isLoadingPlaces) {
      console.log("⏳ Already loading places, waiting...");
      while (get().isLoadingPlaces) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return get().places;
    }

    console.log("🚀 Loading places for first time...");
    set({ isLoadingPlaces: true, error: null });

    try {
      // 🔹 Fetch from your DB
      const response = await fetch("/api/places");
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      const data = await response.json();

      set({ places: data, isLoadingPlaces: false });
      console.log(`✅ Loaded ${data.length} places`);
      return data;
    } catch (err) {
      console.error("❌ Failed to load places:", err);
      set({ error: err, isLoadingPlaces: false });
      throw err;
    }
  },

  getPlaceList: async () => {
    return await get().loadPlaces();
  },

  /* ---------------- Offer Packages ---------------- */
  loadOfferPackages: async () => {
    const { offerPackages, isLoadingOfferPackages } = get();

    if (offerPackages) {
      console.log("📦 Using cached offer packages:", offerPackages);
      return offerPackages;
    }

    if (isLoadingOfferPackages) {
      console.log("⏳ Already loading offer packages, waiting...");
      while (get().isLoadingOfferPackages) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return get().offerPackages;
    }

    console.log("🚀 Loading offer packages for first time...");
    set({ isLoadingOfferPackages: true, error: null });

    try {
      // 🔹 Fetch from your DB
      const response = await fetch("/api/offer-package");
      
      console.log("📡 Response status:", response.status);
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      
      const data = await response.json();
      console.log("📡 API raw response:", data);
      console.log("📡 Data type:", Array.isArray(data) ? 'Array' : typeof data);
      console.log("📡 Data length:", data?.length);

      set({ offerPackages: data, isLoadingOfferPackages: false });
      console.log(`✅ Loaded ${data?.length || 0} offer packages into store`);
      return data;
    } catch (err) {
      console.error("❌ Failed to load offer packages:", err);
      set({ error: err, isLoadingOfferPackages: false, offerPackages: [] });
      throw err;
    }
  },

  getOfferPackages: async () => {
    return await get().loadOfferPackages();
  },

  /* ---------------- Popular Destinations ---------------- */
  loadPopularDestinations: async () => {
    const { popularDestinations, isLoadingPopularDestinations } = get();

    if (popularDestinations) {
      console.log("📦 Using cached popular destinations");
      return popularDestinations;
    }

    if (isLoadingPopularDestinations) {
      console.log("⏳ Already loading popular destinations, waiting...");
      while (get().isLoadingPopularDestinations) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return get().popularDestinations;
    }

    console.log("🚀 Loading popular destinations for first time...");
    set({ isLoadingPopularDestinations: true, error: null });

    try {
      // 🔹 Fetch from your DB - assuming there's an endpoint for popular destinations
      const response = await fetch("/api/nav/popular");
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      const data = await response.json();

      set({ popularDestinations: data, isLoadingPopularDestinations: false });
      console.log(`✅ Loaded ${data.length} popular destinations`);
      return data;
    } catch (err) {
      console.error("❌ Failed to load popular destinations:", err);
      set({ error: err, isLoadingPopularDestinations: false });
      throw err;
    }
  },

  getPopularDestinationsData: async () => {
    return await get().loadPopularDestinations();
  },

  /* ---------------- Around India Data ---------------- */
  loadAroundIndiaData: async () => {
    const { aroundIndiaData, isLoadingAroundIndia } = get();

    if (aroundIndiaData) {
      console.log("📦 Using cached around India data");
      return aroundIndiaData;
    }

    if (isLoadingAroundIndia) {
      console.log("⏳ Already loading around India data, waiting...");
      while (get().isLoadingAroundIndia) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return get().aroundIndiaData;
    }

    console.log("🚀 Loading around India data for first time...");
    set({ isLoadingAroundIndia: true, error: null });

    try {
      // 🔹 Fetch from your DB - assuming there's an endpoint for around India data
      const response = await fetch("/api/nav/india");
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      const data = await response.json();

      set({ aroundIndiaData: data, isLoadingAroundIndia: false });
      console.log(`✅ Loaded ${data.length} around India data entries`);
      return data;
    } catch (err) {
      console.error("❌ Failed to load around India data:", err);
      set({ error: err, isLoadingAroundIndia: false });
      throw err;
    }
  },

  getAroundIndiaData: async () => {
    return await get().loadAroundIndiaData();
  },

  /* ---------------- Bookings ---------------- */
  loadBookings: async () => {
    const { bookings, isLoadingBookings } = get();

    if (bookings) {
      console.log("📦 Using cached bookings");
      return bookings;
    }

    if (isLoadingBookings) {
      console.log("⏳ Already loading bookings, waiting...");
      while (get().isLoadingBookings) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return get().bookings;
    }

    console.log("🚀 Loading bookings for first time...");
    set({ isLoadingBookings: true, error: null });

    try {
      // 🔹 Fetch from your DB
      const response = await fetch("/api/booking");
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }
      const data = await response.json();

      set({ bookings: data, isLoadingBookings: false });
      console.log(`✅ Loaded ${data.length} bookings`);
      return data;
    } catch (err) {
      console.error("❌ Failed to load bookings:", err);
      set({ error: err, isLoadingBookings: false });
      throw err;
    }
  },

  getAllBookings: async () => {
    return await get().loadBookings();
  },
}));

export default packageVM;
