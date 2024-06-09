// types/country.ts
export interface CountryProperties {
  name: string;
  [key: string]: any;
}

export interface Country {
  type: string;
  properties: CountryProperties;
  geometry: {
    type: string;
    coordinates: any;
  };
  name: string;
  population: number;
  subregion: string;
  region: string;
  flag : {
    small: string;
    large: string;
    medium: string;
  };
  area: number;
}
