# 🎬 Movie Time

A modern, responsive movie discovery application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project leverages the **TMDB API** to provide real-time data about trending movies, TV shows, and detailed information about cinema.

![License](https://img.shields.io/github/license/tokyoprikol/movie-time-nextjs?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.dot.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)

## 🌟 Features

- ⚡ **Next.js 15 (App Router)** – Utilizing the latest React features and Server Components.
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop views using Tailwind CSS.
- 🔍 **Search & Explore** – Search for your favorite movies and filter by categories.
- 🎭 **Detailed Info** – View movie summaries, ratings, release dates, and cast details.
- 🌓 **Dark/Light Mode** – Seamless theme switching for better user experience.
- 🚀 **Performance** – Optimized images and fast routing.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **API:** [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api)
- **Icons:** [Lucide React](https://lucide.dev/) / [React Icons](https://react-icons.github.io/react-icons/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm / yarn / pnpm
- A TMDB API Key (Get it [here](https://www.themoviedb.org/settings/api))

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/tokyoprikol/movie-time-nextjs.git](https://github.com/tokyoprikol/movie-time-nextjs.git)
   cd movie-time-nextjs
   Install dependencies:
   ```

Bash
npm install

# or

yarn install
Set up Environment Variables:
Create a .env.local file in the root directory and add your TMDB API key:

Code snippet
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
Run the development server:

Bash
npm run dev
Open http://localhost:3000 with your browser to see the result.

📂 Project Structure
Plaintext
├── app/ # Next.js App Router (pages & layouts)
├── components/ # Reusable UI components
├── lib/ # Utility functions and API fetching logic
├── public/ # Static assets (images, icons)
└── types/ # TypeScript interfaces and types
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

Developed with ❤️ by tokyoprikol
