export type FeaturesType = {
  properties: {
    address_line1: string;
    address_line2: string;
    country: string;
    city: string;
    lat: number;
    lon: number;
    formatted: string;
    place_id: string;
  };
};

export type FullData = {
  features: FeaturesType[];
};

export interface LocationContextType {
  dataLocations: FullData | null;
  location: string;
  setLocation: (location: string) => void;
  error: string | null;
  loading: boolean;
  setDataLocations: (dataLocation: FullData | null) => void;
}
