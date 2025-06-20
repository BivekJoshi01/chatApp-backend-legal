import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

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
  handleEdit?: any;
  handleDelete?: any;
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
  handleDelete,
}: CustomTableProps<T>) => {
  return (
    <>
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
            backgroundColor: "var(--primary)",
            height: filter ? "70px" : "40px",
          },
        }}
        muiTableBodyRowProps={() => ({
          sx: {
            cursor: "pointer",
            backgroundColor: "var(--primary-10)",
            color: "var(--text)",
          },
        })}
        muiTableHeadCellProps={{
          sx: {
            color: "var(--text)",
          },
        }}
      />
      <style>
        {`
      .css-10gei56  {
        background-color: var(--background)
      }
              .css-zrlv9q  {
        background-color: var(--background)
      }
        .css-1e1m30i {
          color: var(--text)
        }
      `}
      </style>
    </>
  );
};

export default CustomTable;
