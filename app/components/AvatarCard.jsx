"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiEdit, FiUser } from "react-icons/fi";
import gsap from "gsap";

const AvatarCard = ({ avatar, onEdit, index = 0 }) => {
  const cardRef = useRef(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1 * index, // Staggered animation based on index
          ease: "power3.out",
        }
      );
    }
  }, [index]);

  // Simple boolean check if we have an image URL
  const hasImageUrl = Boolean(avatar.avatar);

  return (
    <motion.div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: "0 30px 60px rgba(0,0,0,0.12)",
      }}
      style={{ opacity: 0 }} // Initial state for GSAP
    >
      <div className="relative h-48 w-full bg-gradient-to-r from-indigo-500 to-purple-600">
        {hasImageUrl && !imageError ? (
          <Image
            src={avatar.avatar}
            alt={`${avatar.first_name} ${avatar.last_name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={index < 3} // Load first 3 images with priority
            onError={(e) => {
              console.error(`Failed to load image: ${avatar.avatar}`);
              setImageError(true);
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FiUser className="w-24 h-24 text-white opacity-70" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
          {avatar.first_name} {avatar.last_name}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {avatar.email}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          onClick={() => onEdit(avatar)}
        >
          <FiEdit className="h-4 w-4" />
          <span>Edit Avatar</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AvatarCard;
