"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import packageVM from "@/viewmodel/packageVM";
import { Suspense } from "react";

const Lottie = dynamic(
  () => import("lottie-react").then((mod) => mod.default || mod),
  { ssr: false }
);

export const NavigationProvider = ({ children, minLoadingTime = 1200 }) => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/roadtrip.json") // make sure public/roadtrip.json exists
      .then((r) => r.json())
      .then(setAnimationData)
      .catch((err) => console.error("Lottie fetch error:", err));
  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [previousPath, setPreviousPath] = useState(null);
  const [previousParams, setPreviousParams] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [progress, setProgress] = useState(0);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const lottieRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (lottieRef.current && lottieRef.current.setSpeed) {
        lottieRef.current.setSpeed(2);
      }
    }, 100); // Small delay to ensure ref is ready

    return () => clearTimeout(timer);
  }, []);

  const handleDOMLoaded = () => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(2);
    }
  };

  // Convert searchParams to string for comparison
  const currentParams = searchParams.toString();

  // Get Zustand loading state
  const zustandIsLoading = packageVM((state) => state.isLoading);

  // Combined loading state - show animation if either is loading
  const shouldShowLoading = isLoading || zustandIsLoading;

  // Navigation change effect
  useEffect(() => {
    // Skip on initial load
    if (isInitialLoad) {
      setPreviousPath(pathname);
      setPreviousParams(currentParams);
      setIsInitialLoad(false);
      return;
    }
    // Check if URL actually changed
    const hasPathChanged = previousPath !== pathname;
    const hasParamsChanged = previousParams !== currentParams;

    if (!hasPathChanged && !hasParamsChanged) {
      return; // No change, don't trigger loading
    }

    let timeoutId;
    let progressInterval;
    let startTime;
    let pageReadyFlag = false;

    const startLoading = () => {
      startTime = Date.now();
      setIsLoading(true);
      setProgress(0);

      // Progress animation during minimum time
      progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const timeProgress = elapsed / minLoadingTime;

        if (timeProgress < 1) {
          // Ease-out progress during minimum time (0 to 85%)
          const easeOut = 1 - Math.pow(1 - timeProgress, 3);
          setProgress(Math.min(85, easeOut * 85));
        } else if (pageReadyFlag) {
          // After minimum time AND page is ready: jump to 100%
          setProgress(100);
          clearInterval(progressInterval);

          // Small delay to show 100% then hide loading
          setTimeout(() => {
            setIsLoading(false);
            setProgress(0);
          }, 200);
        } else {
          // After minimum time, crawl slowly (85% to 95%)
          setProgress((prev) => {
            if (prev < 95) {
              return prev + Math.random() * 0.5; // Very slow crawl
            }
            return prev;
          });
        }
      }, 50); // Update every 50ms
    };

    const stopLoading = () => {
      if (!startTime) return;

      const elapsed = Date.now() - startTime;

      if (elapsed >= minLoadingTime) {
        // Minimum time has passed, can stop immediately
        clearInterval(progressInterval);
        setProgress(100);

        setTimeout(() => {
          setIsLoading(false);
          setProgress(0);
        }, 200);
      } else {
        // Mark page as ready, but let the interval handle the timing
        pageReadyFlag = true;
      }
    };

    startLoading();
    // Update previous values for next comparison
    setPreviousPath(pathname);
    setPreviousParams(currentParams);

    // Check if page is ready, but respect minimum time

    const checkPageReady = () => {
      if (document.readyState === "complete") {
        pageReadyFlag = true;
        stopLoading(); // Try to stop, but will only work after minTime
      } else {
        requestAnimationFrame(checkPageReady);
      }
    };

    // Also add a fallback to stop loading after minimum time regardless
    const minTimeTimeout = setTimeout(() => {
      if (pageReadyFlag) {
        stopLoading(); // Page was ready, now minimum time has passed
      }
    }, minLoadingTime);

    const initCheck = setTimeout(() => {
      checkPageReady();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(minTimeTimeout);
      clearInterval(progressInterval);
      clearTimeout(initCheck);
    };
  }, [pathname, searchParams, minLoadingTime]);

  //disabling overflow
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <Suspense
      fallback={
        <div className="h-screen w-screen flex items-center justify-center text-2xl sm:text-3xl">
          Loading...
        </div>
      }
    >
    <>
      {/* Your sexy loading screen */}
      {isLoading && (
        <div
          className="fixed inset-0 z-9999  flex items-center justify-center"
          style={{
            backdropFilter: "blur(10px)",
            background: "linear-gradient(135deg, #FFFAF5, #FFEBC8, #FFDC78)",
          }}
        >
          <AnimatePresence>
            <motion.div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: progress / 100,
                opacity: 1,
              }}
              exit={{
                scaleX: 1,
                opacity: 0,
                transition: { duration: 0.3 },
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "5px",
                transformOrigin: "0%",
                zIndex: 9999,
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
              transition={{
                scaleX: { duration: 0.1, ease: "easeOut" },
                opacity: { duration: 0.2 },
              }}
            />
          </AnimatePresence>
          <div className="absolute h-screen w-screen  text-center justify-center text-black poppins flex flex-col items-center">
            {/* Add your loading animation here */}
            <div
              className=" w-[300px] h-[250px] sm:w-[400px] sm:h-[320px] lg:w-[500px] lg:h-[400px]  "
              style={{
                transform: "scaleX(1)", // This flips it horizontally
              }}
            >
              {/* {animationData ? (
          <Lottie animationData={animationData} loop autoplay />
        ) : (
          "Loading animation..."
        )} */}
              <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={true}
                autoplay={true}
                onDOMLoaded={handleDOMLoaded}
              />
            </div>
            {/* <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent mx-auto mb-4"></div> */}
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Loading...</h2>
            <p className="text-lg font-semibold opacity-70">
              Preparing your journey
            </p>
            <p className="text-md font-semibold mt-2 opacity-60">
              {Math.round(progress)}%
            </p>
          </div>
        </div>
      )}

      {children}
    </>
    </Suspense>
  );
};
