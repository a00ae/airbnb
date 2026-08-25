export interface DestinationItem {
  id: number;
  city: string;
  type: string;
}

export interface Category {
  id: number;
  name: string;
  key: string;
  items: DestinationItem[];
}

export const categoriesData: Category[] = [
  {
    id: 1,
    name: "Popular",
    key: "popular",
    items: [
      { id: 1, city: "Marbella", type: "Holiday rentals" },
      { id: 2, city: "Cape Town", type: "Cottage rentals" },
      { id: 3, city: "Harrogate", type: "Serviced apartment rentals" },
      { id: 4, city: "Barcelona", type: "House rentals" },
      { id: 5, city: "Eastbourne", type: "Cottage rentals" },
      { id: 6, city: "Minorca", type: "Pet-friendly rentals" },
      { id: 7, city: "Tenby", type: "Flat rentals" },
      { id: 8, city: "Marseille", type: "Pet-friendly rentals" },
      { id: 9, city: "Nottingham", type: "Pet-friendly rentals" },
      { id: 10, city: "Exeter", type: "Villa rentals" },
      { id: 11, city: "Dubai", type: "Pet-friendly rentals" },
      { id: 12, city: "Weymouth", type: "Cottage rentals" },
      { id: 13, city: "Leicester", type: "Flat rentals" },
      { id: 14, city: "Lincoln", type: "Flat rentals" },
      { id: 15, city: "Athens", type: "Flat rentals" },
      { id: 16, city: "San Sebastián", type: "Serviced apartment rentals" },
      { id: 17, city: "Margate", type: "Pet-friendly rentals" }
    ]
  },
  {
    id: 2,
    name: "Coastal",
    key: "coastal",
    items: []
  },
  {
    id: 3,
    name: "Historic",
    key: "historic",
    items: []
  },
  {
    id: 4,
    name: "Islands",
    key: "islands",
    items: []
  },
  {
    id: 5,
    name: "Lakes",
    key: "lakes",
    items: []
  },
  {
    id: 6,
    name: "Things to do",
    key: "things_to_do",
    items: []
  }
];