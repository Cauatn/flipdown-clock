import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  status: "pending" | "processing" | "success" | "failed";
  name: string;
  date: any;
  time: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "status",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
];
