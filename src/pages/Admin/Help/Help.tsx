import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  skills: string[];
  lastActive: string;
  level: string;
  status: "Active" | "In Active";
  avatar: string;
}

const employees: Employee[] = [
  {
    id: "1",
    name: "Dianne Russell",
    email: "tanya.hill@example.com",
    role: "Support Manager",
    skills: ["Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops"],
    lastActive: "4/4/18",
    level: "Active",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    id: "2",
    name: "Brooklyn Simmons",
    email: "curtis.weaver@example.com",
    role: "Sales Officer",
    skills: ["Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops"],
    lastActive: "12/4/17",
    level: "Active",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=2",
  },
  {
    id: "3",
    name: "Darlene Robertson",
    email: "michelle.rivera@example.com",
    role: "Call attendance",
    skills: ["Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops"],
    lastActive: "1/31/14",
    level: "In Active",
    status: "In Active",
    avatar: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: "4",
    name: "Arlene McCoy",
    email: "jackson.graham@example.com",
    role: "Sales Officer",
    skills: ["Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops"],
    lastActive: "3/4/18",
    level: "Active",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: "5",
    name: "Marvin McKinney",
    email: "bill.sanders@example.com",
    role: "Sales Officer",
    skills: ["Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops"],
    lastActive: "5/7/18",
    level: "Active",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=5",
  },
  {
    id: "6",
    name: "Jane Cooper",
    email: "nathan.roberts@example.com",
    role: "System Eng.",
    skills: ["Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops"],
    lastActive: "2/11/12",
    level: "Active",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=6",
  },
  {
    id: "7",
    name: "Theresa Webb",
    email: "tim.jennings@example.com",
    role: "Viewer",
    skills: ["Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops"],
    lastActive: "6/10/14",
    level: "In Active",
    status: "In Active",
    avatar: "https://i.pravatar.cc/150?u=7",
  },
  {
    id: "8",
    name: "Darrell Steward",
    email: "deanna.curtis@example.com",
    role: "Support Manager",
    skills: ["Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops"],
    lastActive: "9/10/16",
    level: "Active",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=8",
  },
  {
    id: "9",
    name: "Jacob Jones",
    email: "willie.jennings@example.com",
    role: "Support Manager",
    skills: ["Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops"],
    lastActive: "7/11/19",
    level: "Active",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=9",
  },
  {
    id: "10",
    name: "Savannah Nguyen",
    email: "dolores.chambers@example.com",
    role: "Viewer",
    skills: ["Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops"],
    lastActive: "8/30/14",
    level: "Active",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=10",
  },
  {
    id: "11",
    name: "Devon Lane",
    email: "debra.holt@example.com",
    role: "Viewer",
    skills: ["Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops", "Senior Dev Ops"],
    lastActive: "5/27/15",
    level: "Active",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=11",
  },
];

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(new Set());

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || emp.status === statusFilter;
      const matchesRole = roleFilter === "all" || emp.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [searchTerm, statusFilter, roleFilter]);

  const toggleSelectAll = () => {
    if (selectedEmployees.size === employees.length) {
      setSelectedEmployees(new Set());
    } else {
      setSelectedEmployees(new Set(employees.map((e) => e.id)));
    }
  };

  const toggleEmployeeSelection = (id: string) => {
    const newSelection = new Set(selectedEmployees);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedEmployees(newSelection);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-900">Support Employees List</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search Project..."
                className="pl-10 h-11 w-full md:w-[240px] bg-gray-50/50 border-gray-100 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-11 w-[120px] bg-white border-gray-200 rounded-lg text-gray-500 font-medium">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="In Active">In Active</SelectItem>
              </SelectContent>
            </Select>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="h-11 w-[150px] bg-white border-gray-200 rounded-lg text-gray-500 font-medium">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Support Manager">Support Manager</SelectItem>
                <SelectItem value="Sales Officer">Sales Officer</SelectItem>
                <SelectItem value="Call attendance">Call attendance</SelectItem>
                <SelectItem value="System Eng.">System Eng.</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="h-11 px-4 rounded-lg border-gray-100 text-gray-500 gap-2 font-semibold">
              <Filter className="h-4 w-4" />
              Filter By
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-50 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50 h-16 border-none [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[80px] px-8">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.size === employees.length && employees.length > 0}
                    onChange={toggleSelectAll}
                    className="w-5 h-5 rounded border-gray-300 accent-blue-600 transition-all cursor-pointer"
                  />
                </TableHead>
                <TableHead className="font-bold text-gray-900 text-[11px] uppercase tracking-[0.1em]">File Name</TableHead>
                <TableHead className="font-bold text-gray-900 text-[11px] uppercase tracking-[0.1em]">Email</TableHead>
                <TableHead className="font-bold text-gray-900 text-[11px] uppercase tracking-[0.1em]">Role</TableHead>
                <TableHead className="font-bold text-gray-900 text-[11px] uppercase tracking-[0.1em]">Skills</TableHead>
                <TableHead className="font-bold text-gray-900 text-[11px] uppercase tracking-[0.1em]">Last Active</TableHead>
                <TableHead className="font-bold text-gray-900 text-[11px] uppercase tracking-[0.1em]">Level</TableHead>
                <TableHead className="font-bold text-gray-900 text-[11px] uppercase tracking-[0.1em]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow key={emp.id} className="border-b border-gray-50/50 hover:bg-gray-50/50 transition-colors">
                  <TableCell className="px-8 py-5">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.has(emp.id)}
                      onChange={() => toggleEmployeeSelection(emp.id)}
                      className="w-5 h-5 rounded border-gray-300 accent-blue-600 transition-all cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-gray-100">
                        <AvatarImage src={emp.avatar} />
                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold">{emp.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-[14px] font-bold text-gray-900 tracking-tight">{emp.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 text-[14px] text-gray-500 font-medium">{emp.email}</TableCell>
                  <TableCell className="py-5">
                    <Badge variant="outline" className="bg-purple-50/50 text-purple-600 border-none px-4 py-1.5 rounded-xl text-[12px] font-bold">
                      {emp.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-5 max-w-[220px]">
                    <div className="flex flex-wrap gap-2">
                      {emp.skills.slice(0, 2).map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-gray-50 text-gray-400 border-none px-2.5 py-1 rounded-lg text-[10px] font-bold leading-none tracking-wide">
                          {skill}
                        </Badge>
                      ))}
                      {emp.skills.length > 2 && (
                        <Badge variant="secondary" className="bg-gray-50 text-gray-400 border-none px-2 py-1 rounded-lg text-[10px] font-bold">
                          +{emp.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-5 text-[14px] text-gray-500 font-medium">{emp.lastActive}</TableCell>
                  <TableCell className="py-5">
                    <Badge
                      className={cn(
                        "px-4 py-1.5 rounded-xl text-[12px] font-bold border-none transition-all",
                        emp.status === "Active" ? "bg-emerald-50 text-emerald-500 shadow-sm shadow-emerald-50" : "bg-rose-50 text-rose-500 shadow-sm shadow-rose-50"
                      )}
                    >
                      {emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-all hover:scale-110">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all hover:scale-110">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-all hover:scale-110">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 px-2">
          <p className="text-[14px] text-gray-400 font-medium">
            Showing <span className="font-bold text-gray-900">1 to 11</span> of <span className="font-bold text-blue-600">500</span> Files
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="h-10 px-4 text-gray-500 border-gray-100 rounded-lg font-bold bg-white hover:bg-gray-50 transition-all">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Prev
            </Button>
            <div className="flex items-center gap-1 mx-1">
              <Button variant="default" className="h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-100 transition-all active:scale-95">
                1
              </Button>
              <Button variant="ghost" className="h-10 w-10 p-0 text-gray-400 font-bold rounded-lg hover:bg-gray-50">
                2
              </Button>
              <Button variant="ghost" className="h-10 w-10 p-0 text-gray-400 font-bold rounded-lg hover:bg-gray-50">
                3
              </Button>
              <span className="px-2 text-gray-200 font-bold">...</span>
              <Button variant="ghost" className="h-10 w-10 p-0 text-gray-400 font-bold rounded-lg hover:bg-gray-50">
                30
              </Button>
            </div>
            <Button variant="outline" className="h-10 px-4 text-gray-500 border-gray-100 rounded-lg font-bold bg-white hover:bg-gray-50 transition-all">
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
