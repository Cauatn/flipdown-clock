import { Drawer, DrawerContent } from "@/components/ui/drawer.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.js";

import { Trash2 } from "lucide-react";
import { useSessionContext } from "@/contexts/SessionContext/Session-Context";

function SessionsList() {
  const { isModalOpen, setIsModalOpen } = useSessionContext();

  function formatTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
  }

  return (
    <Drawer open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <DrawerContent className="max-w-[40%] h-full p-4 space-y-4">
        <div>
          <h1 className="text-lg">Sessões</h1>
          <p className="text-sm">
            Lista de sessões feitas, sem mais finalidades além disso, vou pensar
            ainda.
          </p>
        </div>
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Horas feitas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {JSON.parse(localStorage.getItem("time_list") ?? "[]").map(
              (element: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{element.date}</TableCell>
                  <TableCell>{formatTime(element.time)}</TableCell>
                  <TableCell>
                    <button
                      onClick={(_e) => {
                        const list = localStorage.getItem("time_list");

                        if (list) {
                          const new_list = JSON.parse(list);
                          new_list.splice(index, 1);
                          localStorage.setItem(
                            "time_list",
                            JSON.stringify(new_list)
                          );
                        }

                        setIsModalOpen(false);
                      }}
                    >
                      <Trash2 className="size-5" />
                    </button>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </DrawerContent>
    </Drawer>
  );
}

export default SessionsList;
