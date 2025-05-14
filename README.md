# AI Avatar Dashboard

A modern, responsive, and mobile-friendly dashboard for viewing and managing AI avatars. This single-page application allows users to view, search, and interact with avatar cards with high-quality profile images from Unsplash.

## Features

- **Welcome Header**: Personalized greeting with current date and time
- **Avatar Display**: Card-based layout showing avatars with professional Unsplash profile images
- **Search Functionality**: Filter avatars by name in real-time
- **Dark Mode Toggle**: Switch between light and dark themes with persistent preferences
- **Modal Form**: Create or edit avatars with a polished modal interface
- **Responsive Design**: Mobile-friendly layout that adapts to any screen size
- **Toast Notifications**: Display success or error messages
- **Loading States**: Visual feedback during API calls
- **Modern Animations**: Smooth transitions and animations using Framer Motion and GSAP
- **Fallback System**: Graceful degradation with quality placeholder data when API is unavailable

## Technologies Used

- **Next.js 15** - React framework for the frontend
- **React 19** - UI component library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth UI interactions
- **GSAP** - Advanced animation library for staggered card effects
- **React Icons** - Icon library for interface elements
- **DummyJSON API** - Data source for user information
- **Unsplash Images** - High-quality profile images

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone <repository-url>
   ```

2. Install dependencies

   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server

   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
ai-avatar/
├── app/
│ ├── components/
│ │ ├── AvatarCard.jsx
│ │ ├── CreateAvatarModal.jsx
│ │ ├── FloatingActionButton.jsx
│ │ ├── Header.jsx
│ │ ├── LoadingSpinner.jsx
│ │ ├── SearchBar.jsx
│ │ ├── ThemeToggle.js
│ │ └── ToastNotification.jsx
│ ├── globals.css
│ ├── layout.js
│ └── page.js
├── public/
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
└── README.md
```

## Key Features Explained

### Dynamic Image Handling

The application uses Next.js Image component with proper configuration for external images from Unsplash. This ensures:

- Optimized image loading with proper sizing
- Responsive images that adapt to different screen sizes
- Priority loading for visible content
- Graceful fallback to placeholder icons when images fail to load

### Theme Toggle

The application includes a dark/light mode toggle that:

- Respects user system preferences on first load
- Persists theme selection in localStorage
- Provides smooth transition between themes

### API Integration

The app fetches user data from DummyJSON API and enhances it with high-quality profile images from Unsplash:

```javascript
// Example of API integration with image enhancement
const response = await fetch("https://dummyjson.com/users?limit=9");
const data = await response.json();
const transformedData = data.users.map((user, index) => ({
  id: user.id,
  email: user.email,
  first_name: user.firstName,
  last_name: user.lastName,
  avatar: unsplashPersonPhotos[index % unsplashPersonPhotos.length],
}));
```

## Customization

### Adding More Avatars

You can easily expand the collection of avatar images by adding more Unsplash URLs to the `unsplashPersonPhotos` array in `app/page.js`.

### API Configuration

The application is configured to work with multiple image providers through Next.js config:

```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "dummyjson.com" },
    ],
  },
};
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Unsplash](https://unsplash.com/) for the high-quality profile images
- [DummyJSON](https://dummyjson.com/) for the user data API
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the React framework
- [Framer Motion](https://www.framer.com/motion/) for the animation library
- [GSAP](https://greensock.com/gsap/) for advanced animations

```

```
