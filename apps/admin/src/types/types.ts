
export interface Department {
  id: number;
  department_name: string;
  status: "0" | "1";
  is_deleted: "0" | "1";
  created_on: string; // or Date if you're parsing it
  updated_on: string;
}
export interface Category {
  id: number;
  category_name: string;
  status: "0" | "1";
  is_deleted: "0" | "1";
  created_on: string; // or Date if you're parsing it
  updated_on: string;
}

export interface Magazine {
  id: number;
  magazine_name: string;
  category:string;
  auther:string;
  image:any;
  publish_date:any;
  duration:string;
  short_description:string;
  description:string;
  status: "0" | "1";
  is_deleted: "0" | "1";
  created_on: string; // or Date if you're parsing it
  updated_on: string;
}


export interface User {
  id: number;
  full_name: string;
  image:any;
  short_description:string;
  description:string;
  email:string;
  status: "0" | "1";
  is_deleted: "0" | "1";
  created_on: string; // or Date if you're parsing it
  updated_on: string;
}


export interface Podcast {
  id: number;
  podcast_name: string;
  image:any;
  publish_date:any;
  duration:string;
  description:string;
  status: "0" | "1";
  is_deleted: "0" | "1";
  created_on: string; // or Date if you're parsing it
  updated_on: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

export interface DepartmentRow {
  [0]: number; // id
  [1]: number; // sr_no
  [2]: string; // department_name
  [3]: string | number;  // status (0 or 1)
}

export interface MagazineRow {
  [0]: number; // id
  [1]: number; // sr_no
  [2]: number | string; // status
  [3]: string ;  // Magazine Name
}

export interface UserRow {
  [0]: number; // id
  [1]: number; // sr_no
  [2]: number | string; // status
  [3]: string ;  // Full Name
}

export interface PodcastRow {
  [0]: number; // id
  [1]: number; // sr_no
  [2]: number | string; // status (0 or 1)
  [3]: string ;  
}