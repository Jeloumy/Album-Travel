export type Users = {
  id: string;
  username: string;
  email: string;
  password: string;
  date_inscription:Date;
};

export type Countries = {
  name: string;
  population: number;
  subregion: string;
  region: string;
  area: number;
};

type Country = {
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
