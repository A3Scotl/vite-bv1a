import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = ({ headers = [], rows = 5 }) => {
  return (
    <Table className="table-fixed w-full">
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index} className="text-center">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {headers.map((_, colIndex) => (
              <TableCell key={colIndex} className="text-center">
                {colIndex === 1 ? (
                  <Skeleton className="h-10 w-10 rounded" />
                ) : (
                  <Skeleton className="h-4 w-full" />
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
