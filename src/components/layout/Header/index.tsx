import { RiCompassDiscoverLine, RiHotelLine } from "@remixicon/react";

interface SearchDataButton {
  title: string;
  descraption: string;
}

export interface DataSearchWhere {
  id: number;
  titleDataWhere: string;
  iconDataWhere: React.ReactNode;
  descraptionDataWhere: string;
  bgColor: string;
}

export type SerachType = {
  type: "where" | "who";
  card: DataSearchWhere[];
};

export const itemButtonSearch: SearchDataButton[] = [
  {
    title: "Where",
    descraption: "Search destinations",
  },
  {
    title: "When",
    descraption: "Add dates",
  },
  {
    title: "Who",
    descraption: "Add guests",
  },
];

export const dataWhere: SerachType[] = [
  {
    type: "where",
    card: [
      {
        id: 1,
        iconDataWhere: <RiCompassDiscoverLine color="var(--bg-color-palette-primary-light)"/>,
        titleDataWhere: "Nearby",
        descraptionDataWhere: "Find what’s around you",
        bgColor: "#e1f5fe",
      },
      {
        id: 2,
        iconDataWhere: <RiHotelLine />,
        titleDataWhere: "Istanbul, Türkiye",
        descraptionDataWhere: "Because your wishlist has stays in Istanbul",
        bgColor: "#e1f5fe",
      },
      {
        id: 3,
        iconDataWhere: < RiHotelLine  />,
        titleDataWhere: "Fethiye, Türkiye",
        descraptionDataWhere: "Popular beach destination",
        bgColor: "#fce4ec",
      },
      {
        id: 4,
        iconDataWhere: < RiHotelLine  />,
        titleDataWhere: "Izmir, Türkiye",
        descraptionDataWhere: "For sights like Kemeralti Bazaar",
        bgColor: "#fce4ec",
      },
      {
        id: 5,
        iconDataWhere: < RiHotelLine  />,
        titleDataWhere: "Budapest, Hungary",
        descraptionDataWhere: "For its bustling nightlife",
        bgColor: "#f9fbe7",
      },
      {
        id: 6,
        iconDataWhere: < RiHotelLine  />,
        titleDataWhere: "Kusadasi",
        descraptionDataWhere: "For its seaside allure",
        bgColor: "#f9fbe7",
      },
    ],
  },
];
