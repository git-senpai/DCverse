"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import AvatarCard from "./components/AvatarCard";
import SearchBar from "./components/SearchBar";
import CreateAvatarModal from "./components/CreateAvatarModal";
import FloatingActionButton from "./components/FloatingActionButton";
import LoadingSpinner from "./components/LoadingSpinner";
import ToastNotification from "./components/ToastNotification";

export default function Home() {
  const [avatars, setAvatars] = useState([]);
  const [filteredAvatars, setFilteredAvatars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editAvatar, setEditAvatar] = useState(null);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  // Fetch avatars from the API
  useEffect(() => {
    const fetchAvatars = async () => {
      // Define Unsplash person photos to use
      const unsplashPersonPhotos = [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494959764136-6be9eb3c261e?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
      ];

      try {
        // Try DummyJSON API instead of ReqRes since ReqRes is returning 401
        const response = await fetch("https://dummyjson.com/users?limit=9");

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        // Transform the data to match our expected format AND override the avatar URLs
        const transformedData = data.users.map((user, index) => ({
          id: user.id,
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          // Always use our Unsplash images instead of the API's images
          avatar: unsplashPersonPhotos[index % unsplashPersonPhotos.length],
        }));
        setAvatars(transformedData);
        setFilteredAvatars(transformedData);
      } catch (error) {
        console.error("Error fetching avatars:", error);
        // Create fallback data with realistic person images if API fails
        const fallbackData = [
          {
            id: 1,
            first_name: "Alex",
            last_name: "Morgan",
            email: "alex.morgan@example.com",
            avatar: unsplashPersonPhotos[0],
          },
          {
            id: 2,
            first_name: "Jamie",
            last_name: "Taylor",
            email: "jamie.taylor@example.com",
            avatar: unsplashPersonPhotos[1],
          },
          {
            id: 3,
            first_name: "Jordan",
            last_name: "Chen",
            email: "jordan.chen@example.com",
            avatar: unsplashPersonPhotos[2],
          },
          {
            id: 4,
            first_name: "Taylor",
            last_name: "Kim",
            email: "taylor.kim@example.com",
            avatar: unsplashPersonPhotos[3],
          },
          {
            id: 5,
            first_name: "Morgan",
            last_name: "Singh",
            email: "morgan.singh@example.com",
            avatar: unsplashPersonPhotos[4],
          },
          {
            id: 6,
            first_name: "Sam",
            last_name: "Johnson",
            email: "sam.johnson@example.com",
            avatar: unsplashPersonPhotos[5],
          },
        ];
        setAvatars(fallbackData);
        setFilteredAvatars(fallbackData);
        showToast("Using sample data - API connection failed", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvatars();
  }, []);

  // Filter avatars based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAvatars(avatars);
    } else {
      const filtered = avatars.filter((avatar) => {
        const fullName =
          `${avatar.first_name} ${avatar.last_name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
      });
      setFilteredAvatars(filtered);
    }
  }, [searchQuery, avatars]);

  const showToast = (message, type = "success") => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };

  const handleOpenModal = (avatar = null) => {
    setEditAvatar(avatar);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditAvatar(null);
  };

  const handleAvatarSubmit = (formData) => {
    // Basic validation for URLs
    const formattedData = {
      ...formData,
      // If avatar URL is empty or invalid, use a placeholder
      avatar:
        formData.avatar && formData.avatar.trim().length > 0
          ? formData.avatar.trim()
          : `https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&auto=format&fit=crop`, // Default person image
    };

    if (editAvatar) {
      // Update existing avatar
      const updatedAvatars = avatars.map((av) =>
        av.id === editAvatar.id ? { ...av, ...formattedData } : av
      );
      setAvatars(updatedAvatars);
      showToast("Avatar updated successfully!");
    } else {
      // Create new avatar
      const newAvatar = {
        id: Date.now(),
        ...formattedData,
      };
      setAvatars((prev) => [...prev, newAvatar]);
      showToast("New avatar created successfully!");
    }

    handleCloseModal();
  };

  const handleEditAvatar = (avatar) => {
    handleOpenModal(avatar);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <ThemeToggle />

      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Header username="Alex" />

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="mt-8">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {filteredAvatars.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    No avatars found
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAvatars.map((avatar, index) => (
                    <AvatarCard
                      key={avatar.id}
                      avatar={avatar}
                      onEdit={handleEditAvatar}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <FloatingActionButton onClick={() => handleOpenModal()} />

      <CreateAvatarModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editAvatar={editAvatar}
        onSubmit={handleAvatarSubmit}
      />

      <ToastNotification
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
}
