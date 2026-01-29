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
      { title: "Top Rated", href: "/movie/top-rated" },
      { title: "Upcoming", href: "/movie/upcoming" },
    ],
  },

  {
    title: "TV Shows",
    items: [
      { title: "Popular", href: "/tv/popular" },
      { title: "Top Rated", href: "/tv/top-rated" },
      { title: "On TV", href: "/tv/on-the-air" },
    ],
  },

  {
    title: "People",
    items: [{ title: "Popular", href: "/people/popular" }],
  },
];
