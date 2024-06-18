// types/country.ts
export interface CountryProperties {
  name: string;
  [key: string]: any;
}

export type Country = {
  name: string;
  population: number;
  subregion: string;
  region: string;
  area: number;
  type: string;
  properties: {
    name: string;
  };
  geometry: {
    type: string;
    coordinates: any; // ajustez le type selon vos besoins
  };
  flag: string;
};
