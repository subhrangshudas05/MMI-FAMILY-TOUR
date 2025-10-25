"use client";
import React, { useEffect,useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(true); // start as loading

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    document.title = `SignIn - Mimi Family Tour`;
  }, []);
  // useEffect(() => {
  //   if (session) {
  //     router.push("/");
  //   }
  // }, [session, router]);

  // const goHome =()=>{

  // }

  if (!session) {
    return (
      <div className="min-h-screen poppins bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden pt-20 sm:pt-30">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

          {/* Animated particles */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-300"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-blue-300/60 rounded-full animate-bounce delay-700"></div>
          <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-purple-300/50 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-300/40 rounded-full animate-bounce delay-500"></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-6 lg:p-8">
          {/* Logo/Brand section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4 tracking-tight">
              Mimi Family Tour
            </h1>

            <p className="text-lg sm:text-xl text-blue-200/80 max-w-md mx-auto font-light leading-relaxed">
              Discover magical destinations with your loved ones
            </p>
          </div>

          {/* Login card */}
          <div className="w-full max-w-md mx-auto">
            <div className="backdrop-blur-xl bg-white/10 p-8 sm:p-10 rounded-3xl border border-white/20 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:bg-white/15">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-blue-200/70 text-sm sm:text-base">
                  Sign in to start your adventure
                </p>
              </div>

              {/* Google Sign In Button */}
              <button
                onClick={() => signIn("google")}
                disabled={loading}
                className={`group relative w-full ${
                  loading
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-50 text-gray-800 hover:scale-[1.02] hover:-translate-y-1"
                } font-semibold py-4 sm:py-5 px-6 rounded-2xl border-0 shadow-lg ${
                  loading ? "" : "hover:shadow-xl"
                } transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-blue-500/50`}
              >
                {/* Button background gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 ${
                    loading
                      ? ""
                      : "group-hover:from-blue-500/5 group-hover:to-purple-500/5"
                  } rounded-2xl transition-all duration-300`}
                ></div>

                <div className="relative flex items-center justify-center space-x-3">
                  {/* Google Icon */}
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7">
                    <svg viewBox="0 0 24 24" className="w-full h-full">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </div>

                  <span className="text-sm sm:text-lg font-medium tracking-wide">
                    {loading ? "Signing in..." : "Continue with Google"}
                  </span>

                  {/* Loading dots or Arrow icon */}
                  {loading ? (
                    <div className="flex space-x-1 ms-1 sm:ms-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  ) : (
                    <svg
                      className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  )}
                </div>

                {/* Shine effect - disabled when loading */}
                <div
                  className={`absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 ${
                    loading
                      ? ""
                      : "group-hover:animate-pulse opacity-0 group-hover:opacity-100"
                  } transition-opacity duration-300 rounded-2xl`}
                ></div>
              </button>

              {/* Decorative elements */}
              <div className="mt-8 flex items-center justify-center space-x-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-white/30"></div>
                <span className="text-white/50 text-sm">Secure Login</span>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-white/30"></div>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <div className="mt-12 text-center">
            <p className="text-blue-200/60 text-sm max-w-sm mx-auto leading-relaxed">
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    );
  }

  // Logged in state
  return (
    <div className="min-h-screen poppins bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative overflow-hidden pt-20 sm:pt-30">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 sm:p-6 lg:p-8">
        {/* Success animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-2xl animate-bounce">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Welcome card */}
        <div className="w-full max-w-lg mx-auto">
          <div className="backdrop-blur-xl bg-white/10 p-8 sm:p-10 rounded-3xl border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent mb-4">
                Welcome to Mimi Family Tour!
              </h1>
              <p className="text-emerald-200/80 text-lg">
                Ready for your next adventure?
              </p>
            </div>

            {/* User info */}
            <div className="space-y-4 mb-8">
              <div className="bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10 overflow-x-auto">
                <p className="text-white/90 text-lg font-medium">
                  👋 Hello, {session.user.name}!
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10 overflow-x-auto">
                <p className="text-white/70 text-base">
                  📧 &nbsp;{session.user.email}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur p-4 rounded-xl border border-white/10">
                <p className="text-white/70 text-base">
                  🎭 &nbsp;Role:{" "}
                  <span className="capitalize font-semibold text-emerald-300">
                    {session.user.role}
                  </span>
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
              <button
                onClick={() => router.push("/")}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 text-lg"
              >
                🏠 &nbsp;Explore Tours
              </button>

              <button
                onClick={() => signOut()}
                className="w-full bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-6 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-[1.02]"
              >
                👋 &nbsp;Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
