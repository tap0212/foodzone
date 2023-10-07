export type Item = {
  id: number;
  name: string;
  price: number;
};

export type Cuisine = {
  id: number;
  name: string;
  items: Item[];
};

export type Restaurant = {
  id: number;
  name: string;
  distance_km: number;
  cuisines: Cuisine[];
  header?: string;
};

export interface RestuarantsData {
  quick_bites: Restaurant[];
  trusted_restaurants: Restaurant[];
}
