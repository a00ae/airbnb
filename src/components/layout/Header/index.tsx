import { RiCompassDiscoverLine, RiHotelLine } from "@remixicon/react";
import type { ReactNode } from "react";

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

export interface DataSearchWho {
  id: number;
  titleDataWho: string;
  descraptionDataWho: string;
}

export type SerachType = {
  type: "where" | "who";
  whereData?: DataSearchWhere[];
  whoData?: DataSearchWho[]
};



export type SearchProps = {
  activeLabel: string | null;
  onLabelChange: (label: string | null) => void;
};

export type CityRecord = {
  id: string | number;
  cityName: string;
};

type DestinationData = {
  id: string | number;
  iconDataWhere: ReactNode;
  titleDataWhere: string;
  descraptionDataWhere: string;
  bgColor: string;
};

export type WhereSectionItem = {
  type: string;
  whereData?: DestinationData[];
};

export type CityItemProps = {
  cityName: string;
  onSelect: (city: string) => void;
};

export type DestinationItemProps = {
  item: DestinationData;
  onSelect: (city: string) => void;
};

export type WhereSectionProps = {
  item: WhereSectionItem;
  nearby?: boolean;
  handleSelectCity: (city: string) => void;
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
    whereData: [
      {
        
        id: 1,
        iconDataWhere: (
          <RiCompassDiscoverLine color="var(--bg-color-palette-primary-light)" />
        ),
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
        iconDataWhere: <RiHotelLine />,
        titleDataWhere: "Fethiye, Türkiye",
        descraptionDataWhere: "Popular beach destination",
        bgColor: "#fce4ec",
      },
      {
        id: 4,
        iconDataWhere: <RiHotelLine />,
        titleDataWhere: "Izmir, Türkiye",
        descraptionDataWhere: "For sights like Kemeralti Bazaar",
        bgColor: "#fce4ec",
      },
      {
        id: 5,
        iconDataWhere: <RiHotelLine />,
        titleDataWhere: "Budapest, Hungary",
        descraptionDataWhere: "For its bustling nightlife",
        bgColor: "#f9fbe7",
      },
      {
        id: 6,
        iconDataWhere: <RiHotelLine />,
        titleDataWhere: "Kusadasi",
        descraptionDataWhere: "For its seaside allure",
        bgColor: "#f9fbe7",
      },
    ],
  },
  {
    type: "who",
    whoData: [
      { id: 1, titleDataWho: "Adults", descraptionDataWho: "Ages 13 or above" },
      { id: 2, titleDataWho: "Children", descraptionDataWho: "Ages 2–12" },
      { id: 3, titleDataWho: "Infants", descraptionDataWho: "Under 2" },
      {
        id: 4,
        titleDataWho: "Pets",
        descraptionDataWho: "Bringing a service animal?",
      },
    ],
  },
];


