export interface PropertyDetails {
  city: string;
  buildingName: string;
  propertyType: string;
  sizeSqm: number;
  bedrooms: number;
  bathrooms: number;
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

export interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
}

export interface MarketTrendsData {
  date: string;
  items: NewsItem[];
}

export interface HeatmapZone {
  areaName: string;
  avgPriceSqm: number;
  priceLevel: 'Budget' | 'Mid-End' | 'High-End' | 'Luxury';
  description: string;
  growthRate: string;
}

export interface HeatmapData {
  location: string;
  lastUpdated: string;
  zones: HeatmapZone[];
  summary: string;
}

export const PROPERTY_TYPES = [
  "Condominium Unit",
  "House and Lot",
  "Townhouse",
  "Vacant Lot",
  "Commercial Space",
  "Beach Property"
];

export const HEATMAP_LOCATIONS = [
  "Makati City",
  "Bonifacio Global City",
  "Manila Bay Area",
  "Pasay City",
  "Quezon City",
  "Ortigas Center",
  "Clark and Pampanga",
  "Nuvali / Sta. Rosa",
  "Alabang",
  "Cebu City",
  "Davao City",
  "Palawan",
  "Siargao"
];