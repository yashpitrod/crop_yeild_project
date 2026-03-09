"use client";

import { useState } from "react";
import Link from "next/link";
import { GridBackground } from "@/components/grid-background";

const REGIONS = [
  "Albania", "Algeria", "Angola", "Argentina", "Armenia", "Australia", "Austria",
  "Bangladesh", "Belgium", "Brazil", "Canada", "China", "Egypt", "France",
  "Germany", "India", "Indonesia", "Italy", "Japan", "Kenya", "Mexico",
  "Netherlands", "New Zealand", "Nigeria", "Pakistan", "Philippines", "Poland",
  "Russia", "South Africa", "Spain", "Thailand", "Turkey", "Ukraine",
  "United Kingdom", "United States of America", "Vietnam"
];

const CROPS = [
  "Cassava", "Maize", "Potatoes", "Rice, paddy", "Sorghum",
  "Soybeans", "Sweet potatoes", "Wheat", "Yams"
];

interface PredictionResult {
  prediction: number;
  crop: string;
  region: string;
}

export default function PredictPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState({
    area: "",
    item: "",
    year: "",
    rainfall: "",
    pesticides: "",
    avg_temp: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <GridBackground />

      {/* Navigation */}
      <nav 
        className="relative z-[100] px-4 md:px-8 py-4 backdrop-blur-xl"
        style={{ backgroundColor: "rgba(5, 10, 5, 0.8)", borderBottom: "1px solid rgba(60, 100, 60, 0.25)" }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div 
              className="w-10 h-10 rounded-[10px] flex items-center justify-center"
              style={{ background: "linear-gradient(to bottom right, #22c55e, #16a34a)" }}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-xl font-bold" style={{ color: "#f0f4f0" }}>
              CropYield AI
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 no-underline text-sm font-medium rounded-lg transition-all duration-200 hover:bg-white/5 group"
            style={{ color: "#9ca89c" }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:-translate-x-1"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-[1] max-w-[1200px] mx-auto px-4 md:px-8 py-12">
        <div className="text-center mb-12 animate-fadeInUp">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 tracking-tight" style={{ color: "#f0f4f0" }}>
            Crop Yield Prediction
          </h1>
          <p style={{ color: "#9ca89c" }} className="text-lg">
            Enter your agricultural parameters to get an AI-powered yield estimate
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Input Form Card */}
          <div
            className="backdrop-blur-xl rounded-3xl p-6 md:p-8 relative overflow-hidden animate-fadeInUp"
            style={{ backgroundColor: "rgba(15, 25, 15, 0.95)", border: "1px solid rgba(60, 100, 60, 0.3)" }}
          >
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(34, 197, 94, 0.3), transparent)" }}
            />

            <div className="flex items-center gap-3 mb-8">
              <div 
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(to bottom right, rgba(34,197,94,0.2), rgba(34,197,94,0.05))" }}
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: "#22c55e" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold" style={{ color: "#f0f4f0" }}>Input Parameters</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="Region / Area">
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select region</option>
                    {REGIONS.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  <MapIcon />
                </FormField>

                <FormField label="Crop Type">
                  <select
                    name="item"
                    value={formData.item}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select crop</option>
                    {CROPS.map((crop) => (
                      <option key={crop} value={crop}>
                        {crop}
                      </option>
                    ))}
                  </select>
                  <CropIcon />
                </FormField>

                <FormField label="Year">
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="e.g. 2024"
                    required
                    min="1990"
                    max="2030"
                  />
                  <CalendarIcon />
                </FormField>

                <FormField label="Avg Rainfall (mm/year)">
                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleInputChange}
                    placeholder="e.g. 1200"
                    required
                    min="0"
                    step="0.01"
                  />
                  <RainfallIcon />
                </FormField>

                <FormField label="Pesticides (tonnes)">
                  <input
                    type="number"
                    name="pesticides"
                    value={formData.pesticides}
                    onChange={handleInputChange}
                    placeholder="e.g. 500"
                    required
                    min="0"
                    step="0.01"
                  />
                  <PesticideIcon />
                </FormField>

                <FormField label="Avg Temperature (C)">
                  <input
                    type="number"
                    name="avg_temp"
                    value={formData.avg_temp}
                    onChange={handleInputChange}
                    placeholder="e.g. 25"
                    required
                    min="-50"
                    max="60"
                    step="0.01"
                  />
                  <TempIcon />
                </FormField>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 px-8 py-4 border-none rounded-[14px] text-base font-semibold cursor-pointer flex items-center justify-center gap-3 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none"
                style={{ 
                  background: "linear-gradient(to right, #22c55e, #16a34a)", 
                  color: "white",
                  boxShadow: "0 4px 20px rgba(34, 197, 94, 0.3)"
                }}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-5 h-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3" />
                    </svg>
                    Predict Yield
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Result Card */}
          <div
            className="backdrop-blur-xl rounded-3xl p-6 md:p-8 min-h-[480px] flex flex-col items-center justify-center text-center relative overflow-hidden animate-fadeInUp"
            style={{ 
              backgroundColor: "rgba(15, 25, 15, 0.95)", 
              border: "1px solid rgba(60, 100, 60, 0.3)",
              animationDelay: "0.1s" 
            }}
          >
            <div 
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(34, 197, 94, 0.3), transparent)" }}
            />

            {!result ? (
              <div style={{ color: "#9ca89c" }}>
                <div 
                  className="w-20 h-20 mx-auto mb-6 rounded-[20px] flex items-center justify-center"
                  style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                >
                  <svg
                    className="w-10 h-10 opacity-50"
                    style={{ color: "#22c55e" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18" />
                    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2" style={{ color: "#f0f4f0" }}>
                  No Prediction Yet
                </h3>
                <p className="text-[0.95rem] opacity-70">
                  Fill in the form and click predict to see results
                </p>
              </div>
            ) : (
              <div className="w-full animate-scaleIn">
                <div 
                  className="w-[72px] h-[72px] mx-auto mb-6 rounded-[20px] flex items-center justify-center"
                  style={{ background: "linear-gradient(to bottom right, rgba(34,197,94,0.2), rgba(34,197,94,0.05))" }}
                >
                  <svg
                    className="w-9 h-9"
                    style={{ color: "#22c55e" }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <path d="M22 4L12 14.01l-3-3" />
                  </svg>
                </div>

                <div className="text-sm font-medium mb-2" style={{ color: "#9ca89c" }}>
                  Predicted Yield
                </div>
                <div className="text-5xl md:text-6xl font-extrabold leading-none mb-2" style={{ color: "#22c55e" }}>
                  {result.prediction.toLocaleString()}
                </div>
                <div className="text-base mb-8" style={{ color: "#9ca89c" }}>
                  hectograms per hectare
                </div>

                <div 
                  className="grid grid-cols-2 gap-4 pt-6"
                  style={{ borderTop: "1px solid rgba(60, 100, 60, 0.3)" }}
                >
                  <div 
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: "rgba(34, 197, 94, 0.05)", border: "1px solid rgba(34, 197, 94, 0.1)" }}
                  >
                    <div className="text-xs mb-1 uppercase tracking-wide" style={{ color: "#9ca89c" }}>
                      Crop
                    </div>
                    <div className="text-base font-semibold" style={{ color: "#f0f4f0" }}>
                      {result.crop}
                    </div>
                  </div>
                  <div 
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: "rgba(34, 197, 94, 0.05)", border: "1px solid rgba(34, 197, 94, 0.1)" }}
                  >
                    <div className="text-xs mb-1 uppercase tracking-wide" style={{ color: "#9ca89c" }}>
                      Region
                    </div>
                    <div className="text-base font-semibold" style={{ color: "#f0f4f0" }}>
                      {result.region}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        input,
        select {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 2.75rem;
          background: rgba(10, 20, 10, 0.8);
          border: 1px solid rgba(60, 100, 60, 0.25);
          border-radius: 12px;
          font-size: 0.95rem;
          color: #f0f4f0;
          font-family: inherit;
          transition: all 0.2s ease;
          outline: none;
        }

        input::placeholder {
          color: #9ca89c;
          opacity: 0.7;
        }

        input:focus,
        select:focus {
          border-color: rgba(34, 197, 94, 0.5);
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }

        select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239ca89c' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }

        select option {
          background: #050a05;
          color: #f0f4f0;
        }
      `}</style>
    </>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium" style={{ color: "#9ca89c" }}>
        {label}
      </label>
      <div className="relative">{children}</div>
    </div>
  );
}

// Icons
function MapIcon() {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca89c" }}>
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    </div>
  );
}

function CropIcon() {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca89c" }}>
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
        <path d="M8.5 8.5v.01" />
        <path d="M16 15.5v.01" />
        <path d="M12 12v.01" />
        <path d="M11 17v.01" />
        <path d="M7 14v.01" />
      </svg>
    </div>
  );
}

function CalendarIcon() {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca89c" }}>
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h18" />
      </svg>
    </div>
  );
}

function RainfallIcon() {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca89c" }}>
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
        <path d="M16 14v6" />
        <path d="M8 14v6" />
        <path d="M12 16v6" />
      </svg>
    </div>
  );
}

function PesticideIcon() {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca89c" }}>
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
        <path d="M8.5 2h7" />
        <path d="M7 16h10" />
      </svg>
    </div>
  );
}

function TempIcon() {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#9ca89c" }}>
      <svg
        className="w-[18px] h-[18px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
      </svg>
    </div>
  );
}
