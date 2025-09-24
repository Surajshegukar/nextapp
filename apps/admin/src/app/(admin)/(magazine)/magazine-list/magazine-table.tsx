import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import CustomDataTable from "@/components/tables/customTableComponent";
 
import { MagazineRow } from "@/types/types";
import { useTableActions } from "@/hooks/useTableAction";
 

const MagazineTable: React.FC = () => {
  const [filteredUrl, setFilteredUrl] = useState(
    "/api/Magazine/ajax/magazine-list"
  );

  const { toggleStatus, editItem, deleteItemAction, refresh } =
    useTableActions("Magazine");
    

  useEffect(() => {
    setFilteredUrl("/api/Magazine/ajax/magazine-list");
  }, []);

  const columns: TableColumn<MagazineRow>[] = [
    { name: "Sr. No.", selector: (row) => row[0], width: "80px" },
    {
      name: "Magazine",
      selector: (row) => (row[2]?.toLowerCase() === "unknown" ? "-" : row[2]),
      width: "200px",
    },
    {
      name: "Status",
      cell: (row) => (row[3] === 1 ? "Active" : "Inactive"),
      width: "200px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex justify-center gap-7 items-center w-full">
          <button
            onClick={() => editItem(row[1], "/add-Magazine")}
            title="Edit"
            className="text-green-600 hover:text-green-800"
          >
            <FaEdit size={15} />
          </button>
          <button
            onClick={() => deleteItemAction(row[1])}
            title="Delete"
            className="text-red-600 hover:text-red-800"
          >
            <FaTrash size={15} />
          </button>
          <button
            onClick={() => toggleStatus(row[1], row[3])}
            className="btn btn-sm btn-info text-[17px]"
          >
            {row[3] === 1 ? <AiOutlineCheck /> : <AiOutlineClose />}
          </button>
        </div>
      ),
      width: "150px",
      ignoreRowClick: true,
      // button: true,
    },
  ];

  return (
    <div className="p-4 bg-white rounded-xl">
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

export default MagazineTable;
