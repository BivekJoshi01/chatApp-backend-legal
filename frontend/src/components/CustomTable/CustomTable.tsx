import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
// import { FC } from "react";

interface CustomTableProps<T extends Record<string, any>> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  isLoading?: boolean;
  // pageSize?: number;
  rowCount?: number;
  filter?: boolean;
  enablePagination?: boolean;
  enableEditing?: boolean;
  // editingMode?: "modal" | "row" | "table";
  enableColumnResizing?: boolean;
  enableColumnActions?: boolean;
  enableColumnFilters?: boolean;
  enableSorting?: boolean;
  enableRowActions?: boolean;
  enableRowNumbers?: boolean;
  enableBottomToolbar?: boolean;
  enableTopToolbar?: boolean;
  enableDensityToggle?: boolean;
  enableHiding?: boolean;
  enableFullScreenToggle?: boolean;
  enableGlobalFilter?: boolean;
  renderRowActions?: any;
  density?: string;
  enableEdit?: boolean;
  enableDelete?: boolean;
  handleEdit?: any,
  handleDelete?: any
  // showColumnFilters?: boolean;
}

const CustomTable = <T extends Record<string, any>>({
  columns,
  data,
  isLoading,
  // pageSize = 10,
  rowCount,
  filter = false,
  enablePagination = false,
  enableEditing = false,
  enableColumnResizing = true,
  enableColumnActions,
  enableColumnFilters,
  enableSorting,
  enableRowActions = false,
  enableRowNumbers = false,
  enableBottomToolbar,
  enableTopToolbar,
  enableDensityToggle,
  enableHiding,
  enableFullScreenToggle,
  enableGlobalFilter,
  enableEdit = false,
  enableDelete = false,
  handleEdit,
  handleDelete
}:
  CustomTableProps<T>) => {

  return (
    <div className="custom_table">
      <MaterialReactTable
        columns={columns.map((col) => ({
          ...col,
          size: col.size || 170,
        }))}
        data={data || []}
        enableRowNumbers={enableRowNumbers}
        enableRowVirtualization
        enableStickyHeader
        enablePagination={enablePagination}
        // paginationPageSize={pageSize}
        enableEditing={enableEditing}
        rowCount={rowCount}
        state={{
          isLoading,
        }}
        initialState={{
          density: "compact",
          showColumnFilters: filter,
          columnPinning: {
            right: ["mrt-row-actions"],
          },
        }}
        enableColumnResizing={enableColumnResizing}
        enableColumnActions={enableColumnActions}
        enableColumnFilters={enableColumnFilters}
        enableSorting={enableSorting}
        enableRowActions={enableRowActions}
        // showColumnFilters={showColumnFilters}
        enableBottomToolbar={enableBottomToolbar}
        enableTopToolbar={enableTopToolbar}
        enableDensityToggle={enableDensityToggle}
        enableHiding={enableHiding}
        enableFullScreenToggle={enableFullScreenToggle}
        enableGlobalFilter={enableGlobalFilter}
        // density={density}
        renderRowActions={({ row }) => (
          <div className="flex gap-2">
            {enableEdit && (
              <button
                onClick={() => handleEdit(row)}
                className="text-blue-600 hover:text-blue-800"
                title="Edit"
              >
                <FiEdit2 />
              </button>
            )}

            {enableDelete && (
              <button
                onClick={() => handleDelete(row)}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <FiTrash2 />
              </button>
            )}
          </div>
        )}
        muiTableHeadRowProps={{
          sx: {
            backgroundColor: "#8E51FF",
            height: filter ? "70px" : "40px",
          },
        }}
        muiTableBodyRowProps={() => ({
          sx: {
            cursor: "pointer",
            backgroundColor: "#ffff",
          },
        })}
        muiTableHeadCellProps={{
          sx: {
            color: "black",
          },
        }}
      />
    </div>
  );
};

export default CustomTable;
