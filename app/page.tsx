import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { GridBackground } from "@/components/grid-background";

export default function Home() {
  return (
    <>
      <GridBackground />
      <Navigation showCta />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-4 md:px-8 z-[1]">
        <div className="max-w-[900px] mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fadeInUp"
            style={{ backgroundColor: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ backgroundColor: "#22c55e" }} />
            Powered by Machine Learning
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight"
            style={{ animation: "fadeInUp 0.6s ease 0.1s both" }}
          >
            Predict{" "}
            <span className="bg-gradient-to-r from-[#4ade80] to-[#d4a853] bg-clip-text text-transparent">
              Crop Yields
            </span>{" "}
            with AI Precision
          </h1>

          <p
            className="text-base sm:text-lg md:text-xl max-w-[600px] mx-auto mb-12 leading-relaxed text-foreground-muted"
            style={{ animation: "fadeInUp 0.6s ease 0.2s both" }}
          >
            Leverage advanced machine learning models to forecast crop yields
            with precision. Input your regional and environmental data and get
            instant predictions.
          </p>

          <div
            className="flex items-center justify-center gap-4 flex-wrap"
            style={{ animation: "fadeInUp 0.6s ease 0.3s both" }}
          >
            <Link
              href="/predict"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 group"
              style={{ backgroundColor: "#22c55e", color: "#050a05" }}
            >
              Start Prediction
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
            <a
              href="#features"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent rounded-xl text-base font-semibold transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5"
              style={{ color: "#f0f4f0", border: "1px solid rgba(60,100,60,0.3)" }}
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-4 md:px-8 z-[1]">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#22c55e" }}>
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Why Choose CropYield AI
            </h2>
            <p className="text-lg max-w-[500px] mx-auto text-foreground-muted">
              Advanced tools for modern agriculture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              }
              title="ML-Powered Predictions"
              description="Random Forest algorithm trained on extensive agricultural datasets for accurate yield forecasting."
              delay={0}
            />
            <FeatureCard
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              }
              title="Global Coverage"
              description="Support for regions across the globe with localized climate and soil considerations."
              delay={100}
            />
            <FeatureCard
              icon={
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              }
              title="Instant Results"
              description="Get yield predictions in milliseconds. No waiting, no delays, just instant insights."
              delay={200}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative py-16 px-4 md:px-8 z-[1]">
        <div className="max-w-[900px] mx-auto">
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 backdrop-blur-xl rounded-3xl"
            style={{ backgroundColor: "rgba(15, 25, 15, 0.95)", border: "1px solid rgba(60, 100, 60, 0.3)" }}
          >
            <StatItem value="50+" label="Supported Regions" />
            <StatItem value="10+" label="Crop Types" />
            <StatItem value="95%" label="Model Accuracy" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 md:px-8 z-[1]">
        <div 
          className="max-w-[800px] mx-auto text-center p-8 md:p-16 rounded-[32px] relative overflow-hidden"
          style={{ background: "linear-gradient(to bottom right, rgba(34,197,94,0.1), rgba(34,197,94,0.02))", border: "1px solid rgba(34,197,94,0.2)" }}
        >
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(34,197,94,0.1)_0%,transparent_50%)] animate-rotate pointer-events-none" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 relative z-[1]">
            Ready to Optimize Your Yield?
          </h2>
          <p className="text-lg mb-8 relative z-[1] text-foreground-muted">
            Start predicting crop yields with our free ML-powered tool today.
          </p>
          <Link
            href="/predict"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:-translate-y-0.5 relative z-[1] group"
            style={{ backgroundColor: "#22c55e", color: "#050a05" }}
          >
            Get Started Now
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
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
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 md:px-8 z-[1]" style={{ borderTop: "1px solid rgba(60, 100, 60, 0.3)" }}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(to bottom right, #22c55e, #16a34a)" }}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
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
            <span className="font-semibold text-foreground-muted">
              CropYield AI
            </span>
          </div>
          <span className="text-sm text-foreground-muted">
            2026 CropYield AI. Built with ML.
          </span>
        </div>
      </footer>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <div
      className="relative backdrop-blur-xl rounded-[20px] p-8 transition-all duration-400 hover:-translate-y-2 group"
      style={{ 
        animation: `fadeInUp 0.6s ease ${delay}ms both`,
        backgroundColor: "rgba(15, 25, 15, 0.95)",
        border: "1px solid rgba(60, 100, 60, 0.3)"
      }}
    >
      <div 
        className="w-14 h-14 rounded-[14px] flex items-center justify-center mb-6"
        style={{ background: "linear-gradient(to bottom right, rgba(34,197,94,0.2), rgba(34,197,94,0.05))" }}
      >
        <div className="w-7 h-7" style={{ color: "#22c55e" }}>{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-[0.95rem] leading-relaxed text-foreground-muted">
        {description}
      </p>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: "#22c55e" }}>
        {value}
      </div>
      <div className="text-[0.95rem] text-foreground-muted">{label}</div>
    </div>
  );
}
