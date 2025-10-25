"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { popularDestinationsData, aroundIndiaData } from "@/data/NavData.js";
import { getRoutesFromSearch } from "@/actions/SearchAction";
import packageVM from "@/viewmodel/packageVM";
import { useSession } from "next-auth/react";
import { RainbowButton } from "./magicui/rainbow-button";

export default function SideMenu() {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session, status]);
  const { getPopularDestinationsData, getAroundIndiaData } = packageVM();
  const [indias, setIndias] = useState(null);
  const [populars, setPopulars] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      setLoading(true); // local loading on
      let populars;
      let indias;
      populars = await getPopularDestinationsData();
      indias = await getAroundIndiaData();
      setIndias(indias);
      setPopulars(populars);
      setLoading(false); // local loading off
    };

    loadPackages();
  }, []);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const NavItems = [
    "Popular Destinations",
    "Around India",
    "About Us",
    "Contact Us",
    "Sign In",
  ];

  //disabling overflow
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  const bigDiv = {
    open: {
      width: "100vw",
      height: "100vh",
      transition: {
        duration: 0.05,
        ease: "easeInOut",
      },
    },
    closed: {
      width: "60px",
      height: "60px",
      transition: {
        delay: 2,
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="open"
      animate={isOpen ? "open" : "closed"}
      variants={bigDiv}
      className={`absolute inset-0 flex items-center  justify-center z-9999`}
    >
      <div
        className={`relative flex flex-1 justify-start items-stretch h-full w-full overflow-hidden `}
      >
        <motion.nav
          initial={"closed"}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}
          className="relative h-full w-full pt-[62px]"
        >
          <motion.div
            className="absolute  top-0 left-0 bottom-0 w-screen gradbg" //bg-[#f8eadb]  "
            variants={sidebarVariants}
          />
          <motion.div
            variants={lineVariants}
            className="absolute top-15 h-[2px] w-[100vw] bg-black/20 z-10"
          />
          <div className="flex">
            <Navigation
              setIsOpen={setIsOpen}
              router={router}
              NavItems={NavItems}
              populars={populars}
              indias={indias}
              loading={loading}
              isAdmin={isAdmin}
            />
          </div>
          <MenuToggle toggle={() => setIsOpen(!isOpen)} />
        </motion.nav>
      </div>
    </motion.div>
  );
}

const sidebarVariants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "tween",
      duration: 0.6,
      ease: "easeOut",
    },
  }),
  closed: {
    clipPath: "circle(0px at 26px 30px)",
    transition: {
      delay: 0.2,
      type: "tween",
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const navVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.3 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Navigation = ({
  setIsOpen,
  router,
  NavItems,
  populars,
  indias,
  loading,
  isAdmin,
}) => {
  const [activeItem, setActiveItem] = useState("popular");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handleLinkClick = async (query) => {
    setIsOpen(false);
    const routes = await getRoutesFromSearch(query);
    if (!Array.isArray(routes) || routes.length === 0) {
      console.log("⚠️ No routes found for", query);
      return;
    }
    setTimeout(() => {
      router.push(`/packages?place=${query}&routes=${routes.join(",")}`);
    }, 550);
  };

  const handleLinkClick2 = (href) => {
    setIsOpen(false);
    setTimeout(() => {
      router.push(href);
    }, 550);
  };

  const list =
    activeItem == "popular" ? populars : activeItem == "india" ? indias : null;

  return (
    <div className="flex w-screen">
      <motion.ul
        className="relative  w-[40vw] text-base  leading-tight h-full list-none  text-black poppins font-bold"
        variants={navVariants}
      >
        <motion.div
          variants={itemVariants}
          className={` px-4 py-7 border-b-1 border-black/20  ${
            activeItem == "popular"
              ? "bg-gradient-to-r from-orange-200/80 to-yellow-100/80 shadow-lg"
              : "shadow-sm"
          }`}
        >
          <div
            onClick={() => {
              handleItemClick("popular");
            }}
            className="gradient-text3"
          >
            {NavItems[0]}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={` px-4 py-7 border-b-1 border-black/20  ${
            activeItem == "india"
              ? "bg-gradient-to-r from-orange-200/80 to-yellow-100/80 shadow-lg"
              : "shadow-md"
          }`}
        >
          <div
            onClick={() => {
              handleItemClick("india");
            }}
            className="gradient-text3"
          >
            {NavItems[1]}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className=" px-4 py-6 border-b-1 border-black/20 shadow-md"
        >
          <div
            onClick={() => handleLinkClick2("/about")}
            className="gradient-text3 cursor-pointer"
          >
            {NavItems[2]}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className=" px-4 py-6 border-b-1 border-black/20 shadow-md"
        >
          <div
            onClick={() => handleLinkClick2("/contact")}
            className="gradient-text3 cursor-pointer"
          >
            {NavItems[3]}
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className=" px-4 py-6 border-b-1 border-black/20 shadow-md"
        >
          <div
            onClick={() => handleLinkClick2("/signIn")}
            className="gradient-text3 cursor-pointer"
          >
            {NavItems[4]}
          </div>
        </motion.div>
        {isAdmin && (
          <motion.div
            variants={itemVariants}
            className=" px-4 py-6 border-b-1 border-black/20 shadow-md"
          >
            <div
              onClick={() => handleLinkClick2("/admin-dashboard")}
              className="text-white cursor-pointer"
            >
              <RainbowButton>Admin Panel</RainbowButton>
            </div>
          </motion.div>
        )}
      </motion.ul>

      <motion.div
        variants={lineVariants2}
        className=" w-[2px] h-[100vh] bg-black/20 z-10"
      />

      {populars && populars.length > 0 && indias && indias.length > 0 && (
        <>
          <motion.div
            variants={menuVariant}
            className=" relative h-[90vh] space-y-6  overflow-y-auto text-black w-full px-5 pt-4 pb-20 poppins"
          >
            {list.map((section, idx) => (
              <div key={idx}>
                <h4 className=" gradient-text2 text-orange-500 font-semibold text-sm mb-3 tracking-wide">
                  {section.category}
                </h4>
                <div className="space-y-1">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        handleLinkClick(item.route);
                      }}
                      className="block text-sm text-gray-600 hover:text-gray-900 hover:font-semibold hover:scale-105 p-1 transition-all duration-300 transform origin-left"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </>
      )}
    </div>
  );
};

const menuVariant = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.5,
    },
  },
  closed: {
    x: -50,
    opacity: 0,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

const MenuItem = ({ i }) => {
  const border = `2px solid ${colors[i]}`;
  return (
    <motion.li
      className="flex items-center justify-start mb-5 cursor-pointer"
      variants={itemVariants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="w-10 h-10 rounded-full flex-shrink-0 mr-5"
        style={{ border }}
      />
      <div className="w-[200px] h-5 rounded" style={{ border }} />
    </motion.li>
  );
};

const lineVariants = {
  open: {
    scaleX: 1,
    originX: 0,
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  closed: {
    scaleX: 0,
    originX: 0,

    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};
const lineVariants2 = {
  open: {
    scaleY: 1,
    originY: 0,
    transition: {
      type: "tween",
      duration: 0.4,
      delay: 0.2,
    },
  },
  closed: {
    scaleY: 0,
    originY: 0,

    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle }) => (
  <button
    onClick={toggle}
    className="absolute top-1 sm:top-[6px] w-[50px] h-[50px] rounded-full bg-transparent flex items-center justify-center cursor-pointer"
  >
    <svg width="24" height="18" viewBox="0 0 24 24">
      {/* Top Line (50%) */}
      <Path
        strokeWidth="2"
        strokeLinecap="round"
        variants={{
          closed: (custom) => ({
            d: "M 2 2 L 22 2", // full width
            stroke: "#ffffff",
            transition: {
              d: { duration: 0.3 },
              stroke: { duration: 0.3, delay: custom ? 0.6 : 0 },
            },
          }),
          open: {
            d: "M 4 4 L 20 20", // nice diagonal
            stroke: "#000000",
            transition: {
              d: { duration: 0.3 },
              stroke: { duration: 0.3, delay: 0 },
            },
          },
        }}
        custom={true}
      />

      {/* Middle Line (50%) */}
      <Path
        strokeWidth="2"
        strokeLinecap="round"
        d="M 2 9 L 12 9" // short
        variants={{
          closed: (custom) => ({
            opacity: 1,
            stroke: "#ffffff",
            transition: {
              opacity: { duration: 0.3 },
              stroke: { duration: 0.3, delay: custom ? 0.6 : 0 },
            },
          }),
          open: {
            opacity: 0,
            stroke: "#000000",
            transition: {
              opacity: { duration: 0.3 },
              stroke: { duration: 0.3, delay: 0 },
            },
          },
        }}
        custom={true}
      />

      {/* Bottom Line (80%) */}
      <Path
        strokeWidth="2"
        strokeLinecap="round"
        variants={{
          closed: (custom) => ({
            d: "M 2 16 L 18 16", // 80%
            stroke: "#ffffff",
            transition: {
              d: { duration: 0.3 },
              stroke: { duration: 0.3, delay: custom ? 0.6 : 0 },
            },
          }),
          open: {
            d: "M 4 20 L 20 4", // other diagonal
            stroke: "#000000",
            transition: {
              d: { duration: 0.3 },
              stroke: { duration: 0.3, delay: 0 },
            },
          },
        }}
        custom={true}
      />
    </svg>
  </button>
);

const useDimensions = (ref) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
  }, [ref]);

  return dimensions.current;
};
