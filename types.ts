export interface PropertyDetails {
  location: string;
  propertyType: string;
  sizeSqm: number;
  bedrooms: number;
  bathrooms: number;
  furnishing: string;
}

export interface PriceTrendPoint {
  year: string;
  price: number;
}

export interface AppraisalResult {
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  currency: string;
  analysis: string;
  priceTrend: PriceTrendPoint[];
  comparableHighlights: string[];
}

export const PHILIPPINE_LOCATIONS = [
  "Makati CBD",
  "Bonifacio Global City (BGC)",
  "Ortigas Center",
  "Quezon City",
  "Mandaluyong",
  "Pasig",
  "Manila",
  "Alabang",
  "Parañaque",
  "Pasay",
  "Cebu City",
  "Davao City",
  "Tagaytay",
  "Nuvali / Sta. Rosa",
  "Clark / Pampanga"
];

export const PROPERTY_TYPES = [
  "Condominium Unit",
  "House and Lot",
  "Townhouse",
  "Vacant Lot",
  "Commercial Space",
  "Beach Property"
];

export const FURNISHING_TYPES = [
  "Unfurnished",
  "Semi-Furnished",
  "Fully Furnished"
];