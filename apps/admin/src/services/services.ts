
import { ApiResponse, Department ,Category , Magazine , Podcast, User } from "@/types/types";
import instance from "@/utils/axiosInstance";
import { AxiosResponse } from "axios";

type ModelName = string | number;
type ItemId = string | number;

export const deleteItem = (model: ModelName, id: ItemId): Promise<AxiosResponse> => {
  return instance.delete(`/api/delete/${model}/${id}`);
};

export const activateItem = (model: ModelName, id: ItemId): Promise<AxiosResponse> => {
  return instance.put(`/api/active/${model}/${id}`);
};

export const deactivateItem = (model: ModelName, id: ItemId): Promise<AxiosResponse> => {
  return instance.put(`/api/inactive/${model}/${id}`);
};

export const signInUser = (data: { email: string; password: string; rememberMe?: boolean }): Promise<AxiosResponse> => {
  return instance.post("/api/auth/login", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};



export const getAllDepartments = (): Promise<
  AxiosResponse<ApiResponse<Department[]>>
> => instance.get("/api/department/department-list");

export const addDepartment = (data: { department_name: string }): Promise<AxiosResponse> => {
  return instance.post("/api/department/add-department", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getDepartmentById = (id: number): Promise<AxiosResponse<ApiResponse<Department>>> => {
  return instance.get(`/api/department/get-department/${id}`); }


  export const submitDepartment = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/api/department/add-department/${id}`, data,{
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
    }
    return instance.post("/api/department/add-department", data,{
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  export const  uniqueDepartment = (department_name: string, currentId: number | undefined): Promise<AxiosResponse> => {
    return instance.get(`/api/department/check-unique/`, {
      params: { department_name, currentId },
    });
  };


  
export const getAllCategorys = (): Promise<
  AxiosResponse<ApiResponse<Category[]>>
> => instance.get("/api/category/category-list");

export const addCategory = (data: { category_name: string }): Promise<AxiosResponse> => {
  return instance.post("/api/category/add-category", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getCategoryById = (id: number): Promise<AxiosResponse<ApiResponse<Category>>> => {
  return instance.get(`/api/category/get-category/${id}`); }


  export const submitCategory = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/api/category/add-category/${id}`, data,{
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      });
    }
    return instance.post("/api/category/add-category", data,{
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  };

  export const  uniqueCategory = (category_name: string, currentId: number | undefined): Promise<AxiosResponse> => {
    return instance.get(`/api/category/check-unique/`, {
      params: { category_name, currentId },
    });
  };




  
export const getAllMagazines = (): Promise<
  AxiosResponse<ApiResponse<Magazine[]>>
> => instance.get("/api/magazine/magazine-list");

export const addMagazine = (data: FormData): Promise<AxiosResponse> => {
  return instance.post("/api/magazine/add-magazine", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMagazineById = (id: number): Promise<AxiosResponse<ApiResponse<Magazine>>> => {
  return instance.get(`/api/magazine/get-magazine/${id}`); }


  export const submitMagazine = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/api/magazine/add-magazine/${id}`, data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "PUT",
      });
    }
    return instance.post("/api/magazine/add-magazine", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    });
  };

  export const  uniqueMagazine = (magazine_name: string, currentId: number | undefined): Promise<AxiosResponse> => {
    return instance.get(`/api/magazine/check-unique/`, {
      params: { magazine_name, currentId },
    });
  };


  
  
export const getAllPodcasts = (): Promise<
  AxiosResponse<ApiResponse<Podcast[]>>
> => instance.get("/api/podcast/podcast-list");

export const addPodcast = (data: FormData): Promise<AxiosResponse> => {
  return instance.post("/api/podcast/add-podcast", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getPodcastById = (id: number): Promise<AxiosResponse<ApiResponse<Podcast>>> => {
  return instance.get(`/api/podcast/get-podcast/${id}`); }


  export const submitPodcast = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/api/podcast/add-podcast/${id}`, data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "PUT",
      });
    }
    return instance.post("/api/podcast/add-podcast", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    });
  };

  export const  uniquePodcast = (podcast_name: string, currentId: number | undefined): Promise<AxiosResponse> => {
    return instance.get(`/api/podcast/check-unique/`, {
      params: { podcast_name, currentId },
    });
  };



  
export const getAllUsers = (): Promise<
  AxiosResponse<ApiResponse<User[]>>
> => instance.get("/api/user/user-list");

export const addUser = (data: FormData): Promise<AxiosResponse> => {
  return instance.post("/api/user/add-user", JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserById = (id: number): Promise<AxiosResponse<ApiResponse<User>>> => {
  return instance.get(`/api/user/get-user/${id}`); }


  export const submitUser = (id: number | undefined, data: FormData): Promise<AxiosResponse> => {
    if (id) {
      return instance.put(`/api/user/add-user/${id}`, data,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "PUT",
      });
    }
    return instance.post("/api/user/add-user", data,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    });
  };

  export const  uniqueUser = (full_name: string, currentId: number | undefined): Promise<AxiosResponse> => {
    return instance.get(`/api/user/check-unique/`, {
      params: { full_name, currentId },
    });
  };

