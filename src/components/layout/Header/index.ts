// import type React from "react";

interface SearchDataButton {
    title: string;
    descraption: string;

}


export interface DataSearchWhere {
    id: number,
    titleDataWhere: string;
    iconDataWhere: string;
    descraptionDataWhere: string;
}

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


export const dataWhere: DataSearchWhere[] = [
    {
        id: 1,
        iconDataWhere: "ri-compass-discover-line",
        titleDataWhere: "Nearby",
        descraptionDataWhere: "Find what’s around you"
    },
    {
        id: 2,
        iconDataWhere: "ri-compass-discover-line",
        titleDataWhere: "Istanbul, Türkiye",
        descraptionDataWhere: "Because your wishlist has stays in Istanbul"
    },
    {
        id: 3,
        iconDataWhere: "ri-compass-discover-line",
        titleDataWhere: "Fethiye, Türkiye",
        descraptionDataWhere: "Popular beach destination"
    },
    {
        id: 4,
        iconDataWhere: "ri-compass-discover-line",
        titleDataWhere: "Izmir, Türkiye",
        descraptionDataWhere: "For sights like Kemeralti Bazaar"
    },
    {
        id: 5,
        iconDataWhere: "ri-compass-discover-line",
        titleDataWhere: "Budapest, Hungary",
        descraptionDataWhere: "For its bustling nightlife"
    },
    {
        id: 6,
        iconDataWhere: "ri-compass-discover-line",
        titleDataWhere: "Kusadasi",
        descraptionDataWhere: "For its seaside allure"
    },
]





