import React, { useState, useEffect } from "react";
import { TableColumn } from "react-data-table-component";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";


import {
  activateItem,
  deactivateItem,
  deleteItem,
  getAllDepartments
} from "@/services/services";

import { FaEdit, FaTrash } from "react-icons/fa";
import Label from "@/components/form/Label";
import toast from "react-hot-toast";
// import { AiOutlineCheck, AiOutlineClose } from "@/icons"; alertnative import react-icons
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import CustomDataTable from "@/components/tables/customTableComponent";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { Controller } from "react-hook-form";


// Type definitions
// type StatusFilter = "all" | "1" | "0";

type DepartmentOption = {
  value: string;
  label: string;
};

interface UserRow {
  0: number; // S.No
  1: number; // ID
  2: string; // First Name
  3: string; // middle Name
  4: string; // last Name
  5: string | number; // Department Name,
  6: string | number; // Desingation Name,
  7: string; // email
  8: string; // username
  9: string | number; // Status (0 or 1)
}

interface ApiResponse {
  data: {
    success: boolean;
    message: string;
  };
}

const UserTable: React.FC = () => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [departmentOptions, setDepartmentOptions] = useState<
    DepartmentOption[]
  >([]);

  const [departFilter, setDepartFilter] = useState<string>("all"); // default to "All Departments"
  const [filteredName, setFilteredName] = useState<string>("");
  const [filteredUsername, setFilteredUsername] = useState<string>("");

  const [filteredUrl, setFilteredUrl] = useState<string>(
    "/api/user/ajax/user-list"
  );

    const navigate = useRouter();

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = {
        data:{
          data: [
            { id: 1, department_name: "HR" },
            { id: 2, department_name: "IT" },
            { id: 3, department_name: "Finance" },
          ], success: true,
          message: "Departments fetched successfully"
        }
      };
      const departmentData = response.data.data;

      setDepartmentOptions([
        { value: "all", label: "All Department" },
        ...departmentData.map((dept: any) => ({
          value: dept.id.toString(),
          label: dept.department_name,
        })),
      ]);
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    if (
      departFilter === "all" &&
      filteredName === "" &&
      filteredUsername === ""
    ) {
      setFilteredUrl("/api/user/ajax/user-list");
    } else {
      setFilteredUrl(
        `/api/user/ajax/user-list?department_id=${departFilter}&name=${filteredName}&username=${filteredUsername}`
      );
    }
  }, [departFilter, filteredName, filteredUsername]);

  const columns: TableColumn<UserRow>[] = [
    {
      name: "Sr. No.",
      selector: (row: UserRow) => row[0],
      width: "80px",
    },
    {
      name: "Full Name",
      selector: (row: UserRow) => row[2] + " " + row[3] + " " + row[4],
      width: "200px",
    },
    {
      name: "Department",
      selector: (row: UserRow) => {
        const value = row[6];
        return value?.toString().toLowerCase() === "unknown" ? "-" : value;
      },
      width: "200px",
    },
    {
      name: "Designation",
      selector: (row: UserRow) => {
        const value = row[5];
        return value?.toString().toLowerCase() === "unknown" ? "-" : value;
      },
      width: "200px",
    },
    {
      name: "Email",
      selector: (row: UserRow) => row[7],
      width: "150px",
    },
    {
      name: "Username",
      selector: (row: UserRow) => row[8],
      width: "250px",
    },

    {
      name: "Status",
      selector: (row: UserRow) => row[9],
      cell: (row: UserRow) => (row[9] === "1" ? "Active" : "Inactive"),
      width: "200px",
    },
    {
      name: "Actions",
      cell: (row: UserRow) => (
        <div className="flex justify-center gap-7 items-center w-full">
          <button
            onClick={() => handleEdit(row[1])}
            title="Edit"
            className="text-green-600 hover:text-green-800">
            <FaEdit size={15} />
          </button>
          <button
            onClick={() => handleDelete(row[1])}
            title="Delete"
            className="text-red-600 hover:text-red-800">
            <FaTrash size={15} />
          </button>
          <button
            onClick={() => handleToggleStatus(row[1], row[9])}
            className="btn btn-sm btn-info text-[17px]">
            {row[9] === "1" ? <AiOutlineCheck /> : <AiOutlineClose />}
          </button>
        </div>
      ),
      width: "150px",
      ignoreRowClick: true,
      button: true,
    },
  ];

  const handleToggleStatus = async (
    id: number,
    currentStatus: string | number
  ): Promise<void> => {
    try {
      let response: ApiResponse;

      if (currentStatus === "1") {
        response = await deactivateItem("tbl_admins", id);
      } else {
        response = await activateItem("tbl_admins", id);
      }

      if (response.data.success) {
        toast.success(` ${response.data.message}`);
        setRefresh(!refresh);
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error toggling status:", error);
      toast.error(" Failed to update status");
    }
  };

  const handleEdit = (id: number): void => {
    navigate.push(`/admin/users/add-user/${id}`)
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the item.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });
    
      if (result.isConfirmed) {
    
      const response: ApiResponse = await deleteItem("tbl_admins", id);
      if (response.data.success) {
        toast.success(` ${response.data.message}`);
        setRefresh(!refresh);
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    }
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error(" Failed to delete item");
    }
  };

  // const handleStatusFilterChange = (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ): void => {
  //   setStatusFilter(e.target.value as StatusFilter);
  // };

  const handleDepartmentFilterChange = (value: string): void => {
    setDepartFilter(value);
  };

  return (

<div className="p-4 bg-white rounded-xl">

      <div className="filter-container flex flex-wrap mb-4">
        <div className="w-full md:w-1/3 pe-4">
          <Label>Search by Name</Label>
          <Input
            type="text"
            placeholder="Search by Name..."
            className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-1  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            value={filteredName}
            onChange={(e) => setFilteredName(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3 pe-4">
          <Label>Department Name</Label>
            <Select
            options={departmentOptions}
            value={departFilter}
            onChange={handleDepartmentFilterChange}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Label>Search by Username</Label>
          <Input
            type="text"
            placeholder="Search by Username..."
            className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-1  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            value={filteredUsername}
            onChange={(e) => setFilteredUsername(e.target.value)}
          />
        </div>
      </div>
      <hr className="my-8" />
      <div className="table-container max-w-[950px]">
        <CustomDataTable
          tableName="User"
          url={filteredUrl}
          columns={columns}
          refresh={refresh}
        />
      </div>
    </div>
  );
};

export default UserTable;
