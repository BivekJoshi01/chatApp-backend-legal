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
  enableExpand?: any;
  renderRowSubComponent?: any;
  // showColumnFilters?: boolean;
}

const CustomTable = <T extends Record<string, any>>({
  columns,
  data,
  isLoading,
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
  enableExpand = false,
  renderRowSubComponent,
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
          // Expand row initial state can be managed here if needed
        }}
        enableColumnResizing={enableColumnResizing}
        enableColumnActions={enableColumnActions}
        enableColumnFilters={enableColumnFilters}
        enableSorting={enableSorting}
        enableRowActions={enableRowActions}
        enableBottomToolbar={enableBottomToolbar}
        enableTopToolbar={enableTopToolbar}
        enableDensityToggle={enableDensityToggle}
        enableHiding={enableHiding}
        enableFullScreenToggle={enableFullScreenToggle}
        enableGlobalFilter={enableGlobalFilter}

        // Row Actions buttons
        renderRowActions={({ row }) => (
          <div className="flex gap-2">
            {enableEdit && (
              <button
                onClick={() => handleEdit?.(row)}
                className="text-blue-600 hover:text-blue-800 bg-blue-200 p-1 rounded"
                title="Edit"
              >
                <FiEdit2 className="text-lg" />
              </button>
            )}

            {enableDelete && (
              <button
                onClick={() => handleDelete?.(row)}
                className="text-red-600 hover:text-red-800 bg-red-200 p-1 rounded"
                title="Delete"
              >
                <FiTrash2 className="text-lg" />
              </button>
            )}
          </div>
        )}

        enableExpanding={enableExpand}
        renderDetailPanel={
          enableExpand && renderRowSubComponent
            ? ({ row }: { row: any }) => (
              <div className="min-w-full">{renderRowSubComponent(row.original)}</div>
            )
            : undefined
        }

        muiTableHeadRowProps={{
          sx: {
            backgroundColor: "var(--primary)",
            height: filter ? "70px" : "40px",
          },
        }}
        muiTableBodyRowProps={() => ({
          sx: {
            cursor: "pointer",
            backgroundColor: "var(--backgroundLight)",
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
        background-color: var(--backgroundAlt)
      }
              .css-zrlv9q  {
        background-color: var(--backgroundAlt)
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
