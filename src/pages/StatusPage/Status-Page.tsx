import { DataTable } from "@/components/status/data-table";
import { Payment, columns } from "@/components/status/collumns";

function StatusPage() {
  const data: Payment[] = [
    {
      status: "pending",
      date: new Date().toDateString(),
      name: "728ed52f",
      time: "m@example.com",
    },
    // ...
  ];

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}

export default StatusPage;
