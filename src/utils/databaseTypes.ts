export type User = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: number;
  gender: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

export type UserRole = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

export type NannyReview = {
  id: number;
  nanny_id: number;
  parent_id: number;
  review: string;
  rating: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};
export type Advert = {
  id: number;
  title: string;
  description: string;
  price: number;
  area: string;
  availability: string;
  experience: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};
