
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
  department_name: string;
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
  [2]: string; // department_name
  [3]: string | number;  // status (0 or 1)
}