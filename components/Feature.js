import React from "react";
import ListIcon from "@/public/list.svg";
import TripIcon from "@/public/trip.svg";
import WorldIcon from "@/public/world.svg";

const FeaturesSection = () => {
  const features = [
    {
      icon: "/icons/checklist.svg", // You'll download and place this in public/icons/
      title: "Seamless Planning, Stress-Free Travel!",
      description: "Relax and enjoy; we handle everything.",
    },
    {
      icon: "/icons/package.svg", // You'll download and place this in public/icons/
      title: "Personalized Journeys, Unforgettable Memories.",
      description: "Your dream trip, crafted just for you.",
    },
    {
      icon: "/icons/destination.svg", // You'll download and place this in public/icons/
      title: "Local Insights, Global Adventures!",
      description: "Discover the world, the authentic way.",
    },
  ];

  // Inline SVG icons as fallback (you can replace with your downloaded SVGs)
  const ChecklistIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path
        fillRule="evenodd"
        d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z"
        clipRule="evenodd"
      />
      <path
        fillRule="evenodd"
        d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const TripIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
  );

  const DestinationIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6"
    >
      <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
      <path
        fillRule="evenodd"
        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const iconComponents = [ChecklistIcon, TripIcon, DestinationIcon];

  return (
    <div className="relative py-8 lg:py-12 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 w-[95vw] sm:w-[90vw] lg:w-[85vw] xl:w-[90vw] 2xl:w-[80vw] mx-auto   ">
        <div className=" flex flex-col sm:flex-row   sm:items-center sm:justify-between  gap-2 ">
          {features.map((feature, index) => {
            const IconComponent = iconComponents[index];
            return (
              <div key={index} className="flex flex-row items-center sm:items-start gap-2 md:gap-4">
                {/* Icon with Glassmorphism Background */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12.5 rounded-full backdrop-blur-xs border-2 border-white/50 flex items-center justify-center">
                    {/* Try to load SVG from public folder first, fallback to inline SVG */}
                    <div className="w-6 h-6 text-white">
                      
                      <IconComponent />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="poppins flex-1 text-white">
                  <h3 className=" text-sm md:text-md font-semibold leading-6 lg:mb-2">
                    {feature.title}
                  </h3>
                  <p className="hidden lg:block text-sm opacity-90 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
