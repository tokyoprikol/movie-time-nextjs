interface NavItem {
  title: string;
  href: string;
}

interface NavMenu {
  title: string;
  items: NavItem[];
}

export const NAV_ITEMS: NavMenu[] = [
  {
    title: "Movies",
    items: [
      { title: "Popular", href: "/movies/popular" },
      { title: "Top Rated", href: "/movies/top-rated" },
      { title: "Upcoming", href: "/movies/upcoming" },
    ],
  },

  {
    title: "TV Shows",
    items: [
      { title: "Popular", href: "/tv/popular" },
      { title: "Top Rated", href: "/tv/top-rated" },
      { title: "On TV", href: "/tv/on-tv" },
    ],
  },

  {
    title: "Actors",
    items: [{ title: "Popular", href: "/actors/popular" }],
  },
];
