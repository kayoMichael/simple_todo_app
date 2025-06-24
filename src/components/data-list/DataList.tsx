import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Data } from "@/type/data";
import { Button } from "../ui/button";

interface Props {
  tableData?: Data[];
  missingPriority: number[];
  handleDelete: (id: number) => void;
}

const DataList = ({ tableData, missingPriority, handleDelete }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Priorities</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData ? (
          tableData.map((data) => (
            <TableRow key={data.id}>
              <TableCell className="w-[100px]">{data.id}</TableCell>
              <TableCell className="w-[100px]">{data.name}</TableCell>
              <TableCell className="w-[100px]">{data.priority}</TableCell>
              <TableCell className="w-[100px]">
                <Button
                  variant="nonExistant"
                  onClick={() => handleDelete(data.id)}
                  className="text-red-400 hover:text-red-200 cursor-pointer"
                >
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={3}
              className="text-center text-muted-foreground"
            >
              No Data Available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      <TableCaption>
        {missingPriority.length > 0 && (
          <div>Missing Priority: {missingPriority.join(",")}</div>
        )}
      </TableCaption>
    </Table>
  );
};

export default DataList;
