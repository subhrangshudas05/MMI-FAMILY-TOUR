import React from "react";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Whatsapp = () => {
  return (
    <div>
      <Link
        href="https://wa.me/918820361987"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
      >
        <div className="w-6 h-6 md:w-8 md:h-8 relative">
          <Image
            src="/whatsapp.png"
            alt="WhatsApp"
            fill
            className="object-contain"
          />
        </div>
      </Link>
    </div>
  );
};

export default Whatsapp;
