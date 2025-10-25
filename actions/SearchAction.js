import Fuse from "fuse.js";
import packageVM from "@/viewmodel/packageVM";

export async function fuzzySearchPackages(searchQuery) {
  if (!searchQuery || searchQuery.trim() === "") {
    console.log("❌ Empty search query");
    return [];
  }

  // ✅ Use zustand cache
  const { getReferralsList } = packageVM.getState();
  const referralIndex = await getReferralsList();

  const referralDict = Object.fromEntries(
    referralIndex.map((it) => [it.keyword, it.routes])
  );

  const referralKeys = referralIndex.map((it) => it.keyword);
  console.log(`📋 Total referral keys available: ${referralKeys.length}`);

  const fuse = new Fuse(referralKeys, {
    threshold: .1,
    distance: 100,
    minMatchCharLength: 2,
    includeScore: true,
    findAllMatches: true,
  });

  const fuzzyResults = fuse.search(searchQuery);
  const matchedReferrals = fuzzyResults.map((r) => r.item);

  if (matchedReferrals.length === 0) {
    console.log("❌ No referrals matched the search query");
    return [];
  }

  const allRoutes = [];
  matchedReferrals.forEach((ref) => {
    const routes = referralDict[ref] || [];
    allRoutes.push(...routes);
  });

  return [...new Set(allRoutes)]; // unique routes
}

//     const routes = referralDict[normalizedQuery];

//   if (!routes || routes.length === 0) {
//     console.log("❌ No referrals matched the search query");
//     return [];
//   }

//   // Return unique routes (in case there are duplicates)
//   const uniqueRoutes = [...new Set(routes)];
//   console.log(`✅ Found ${uniqueRoutes.length} unique routes for keyword: ${normalizedQuery}`);
  
//   return uniqueRoutes;
// }


export async function getRoutesFromSearch(query) {
  return await fuzzySearchPackages(query);
}
