import { NextRequest, NextResponse } from "next/server";

// Base yields per crop (hectograms per hectare) - based on global averages
const BASE_YIELDS: Record<string, number> = {
  Cassava: 120000,
  Maize: 55000,
  Potatoes: 200000,
  "Rice, paddy": 45000,
  Sorghum: 15000,
  Soybeans: 25000,
  "Sweet potatoes": 140000,
  Wheat: 35000,
  Yams: 100000,
};

// Regional productivity multipliers (based on agricultural development)
const REGION_MULTIPLIERS: Record<string, number> = {
  Albania: 0.85,
  Algeria: 0.75,
  Angola: 0.65,
  Argentina: 1.1,
  Armenia: 0.8,
  Australia: 1.15,
  Austria: 1.2,
  Bangladesh: 0.9,
  Belgium: 1.25,
  Brazil: 1.05,
  Canada: 1.15,
  China: 1.1,
  Egypt: 0.95,
  France: 1.25,
  Germany: 1.3,
  India: 0.85,
  Indonesia: 0.95,
  Italy: 1.15,
  Japan: 1.2,
  Kenya: 0.7,
  Mexico: 0.9,
  Netherlands: 1.35,
  "New Zealand": 1.2,
  Nigeria: 0.7,
  Pakistan: 0.8,
  Philippines: 0.85,
  Poland: 1.05,
  Russia: 0.9,
  "South Africa": 0.85,
  Spain: 1.1,
  Thailand: 0.95,
  Turkey: 0.95,
  Ukraine: 1.0,
  "United Kingdom": 1.2,
  "United States of America": 1.25,
  Vietnam: 0.9,
};

// Optimal conditions for crops
const OPTIMAL_CONDITIONS: Record<string, { temp: number; rainfall: number }> = {
  Cassava: { temp: 27, rainfall: 1200 },
  Maize: { temp: 24, rainfall: 800 },
  Potatoes: { temp: 18, rainfall: 600 },
  "Rice, paddy": { temp: 28, rainfall: 1500 },
  Sorghum: { temp: 27, rainfall: 500 },
  Soybeans: { temp: 25, rainfall: 700 },
  "Sweet potatoes": { temp: 26, rainfall: 900 },
  Wheat: { temp: 20, rainfall: 500 },
  Yams: { temp: 28, rainfall: 1100 },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { area, item, year, rainfall, pesticides, avg_temp } = data;

    // Get base yield for the crop
    const baseYield = BASE_YIELDS[item] || 50000;

    // Get regional multiplier
    const regionMultiplier = REGION_MULTIPLIERS[area] || 0.9;

    // Get optimal conditions for crop
    const optimal = OPTIMAL_CONDITIONS[item] || { temp: 25, rainfall: 800 };

    // Calculate temperature factor (closer to optimal = better)
    const tempDiff = Math.abs(parseFloat(avg_temp) - optimal.temp);
    const tempFactor = Math.max(0.5, 1 - tempDiff * 0.025);

    // Calculate rainfall factor
    const rainfallRatio = parseFloat(rainfall) / optimal.rainfall;
    const rainfallFactor =
      rainfallRatio > 1.5 || rainfallRatio < 0.3
        ? 0.6
        : rainfallRatio > 1.2 || rainfallRatio < 0.5
          ? 0.8
          : rainfallRatio > 0.8 && rainfallRatio < 1.2
            ? 1.0
            : 0.9;

    // Pesticide factor (moderate use is optimal)
    const pesticideValue = parseFloat(pesticides);
    const pesticideFactor =
      pesticideValue < 100
        ? 0.85
        : pesticideValue < 500
          ? 0.95
          : pesticideValue < 2000
            ? 1.0
            : pesticideValue < 5000
              ? 0.98
              : 0.95;

    // Year factor (slight improvements over time)
    const yearValue = parseInt(year);
    const yearFactor = 1 + (yearValue - 2000) * 0.003;

    // Calculate final prediction with some random variation
    const randomVariation = 0.95 + Math.random() * 0.1;

    const prediction = Math.round(
      baseYield *
        regionMultiplier *
        tempFactor *
        rainfallFactor *
        pesticideFactor *
        yearFactor *
        randomVariation
    );

    return NextResponse.json({
      prediction,
      crop: item,
      region: area,
    });
  } catch (error) {
    console.error("Prediction error:", error);
    return NextResponse.json(
      { error: "Failed to process prediction" },
      { status: 500 }
    );
  }
}
