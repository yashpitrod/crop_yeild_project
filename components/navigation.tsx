"use client";

import Link from "next/link";

export function Navigation({ showCta = false }: { showCta?: boolean }) {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4 backdrop-blur-xl transition-all duration-300"
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
          <span className="text-xl font-bold" style={{ color: "#f0f4f0" }}>CropYield AI</span>
        </Link>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-[0.95rem] font-medium no-underline transition-colors duration-200 hover:text-white"
              style={{ color: "#9ca89c" }}
            >
              Features
            </a>
            <a
              href="#stats"
              className="text-[0.95rem] font-medium no-underline transition-colors duration-200 hover:text-white"
              style={{ color: "#9ca89c" }}
            >
              Stats
            </a>
          </div>

          {showCta && (
            <Link
              href="/predict"
              className="inline-flex items-center gap-2 px-5 py-2.5 no-underline rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: "#22c55e", color: "#050a05" }}
            >
              Start Prediction
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
