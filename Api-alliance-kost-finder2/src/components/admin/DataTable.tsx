import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface DataTableProps {
  data: any[];
  onDelete: (id: string) => void;
}

export default function DataTable({ data, onDelete }: DataTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>No. Kamar</TableHead>
            <TableHead>Nama Penghuni</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
             <TableRow>
               <TableCell colSpan={5} className="text-center h-24">Belum ada data</TableCell>
             </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.noKamar || "-"}</TableCell>
                <TableCell>{item.nama || "Kosong"}</TableCell>
                <TableCell>Rp {item.harga}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${item.status === 'Terisi' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                    {item.status || "Tersedia"}
                  </span>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Link to={`/admin/edit/${item.id}`}>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-blue-600 border-blue-200 hover:bg-blue-50">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}