export type Users = {
  id: string;
  username: string;
  email: string;
  password: string;
  date_inscription:Date;
};

export type Countries = {
  id_country: string;
  name: string;
  population: number;
  subregion: string;
  region: string;
  area: number;
  flag_link: string;
};

export interface Sprints {
  id_user: number;
  nb_secret_find: number;
  nb_penalities: number;
  score_date: string;
  username: string | null;
  email: string | null;
}

export interface Precisions {
  id_user: number;
  duration_of_game: number;
  nb_click: number;
  score_date: string;
  username: string | null;
  email: string | null; 
}
