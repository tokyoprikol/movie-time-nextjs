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
      { title: "Popular", href: "/movie/popular" },
      { title: "Now Playing", href: "/movie/now-playing" },
      { title: "Upcoming", href: "/movie/upcoming" },
      { title: "Top Rated", href: "/movie/top-rated" },
    ],
  },

  {
    title: "TV Shows",
    items: [
      { title: "Popular", href: "/tv/popular" },
      { title: "Airing Today", href: "/tv/airing-today" },
      { title: "On TV", href: "/tv/on-the-air" },
      { title: "Top Rated", href: "/tv/top-rated" },
    ],
  },

  {
    title: "People",
    items: [{ title: "Popular", href: "/people/popular" }],
  },
];
