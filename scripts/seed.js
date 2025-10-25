// scripts/seed.js

import mongoose from "mongoose";
import connectDb from "../db/connectDb.js";

// Import all models
import { PopularDestination } from "../models/navSchemas.js";
import { AroundIndia } from "../models/navSchemas.js";
import OfferPackage from "../models/offerPackageSchema.js";
import Package from "../models/packageSchema.js";
import { Place } from "../models/placesSchema.js";
import { Referral } from "../models/referralSchema.js";

// Import data
import { popularDestinationsData } from "../data/NavData.js";
import { aroundIndiaData } from "../data/NavData.js";
import { offerPackages } from "../data/OfferPackage.js";
import { packageList } from "../data/PackagesData.js";
import { allPlaces } from "../data/placelist.js";
import { referralIndex } from "../data/ReferralsList.js";

async function seed() {
  try {
    await connectDb();

    await Referral.deleteMany();

    console.log("✅ Cleared old data");

    // Insert fresh data
    await Referral.insertMany(referralIndex);

    console.log("🎉 Database seeded successfully!");
  } catch (err) {
    console.error("❌ Error seeding DB:", err);
  } finally {
    mongoose.connection.close();
  }
}

seed();
