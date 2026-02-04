import { useState, useMemo } from "react";
import {
  Search,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
    skills: [
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
    ],
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
    skills: [
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
    ],
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
    skills: [
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
    ],
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
    skills: [
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
    ],
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
    skills: [
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
    ],
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
    skills: [
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
    ],
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
    skills: [
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
    ],
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
    skills: [
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
    ],
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
    skills: [
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
    ],
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
    skills: [
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
    ],
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
    skills: [
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
      "Senior Dev Ops",
    ],
    lastActive: "5/27/15",
    level: "Active",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?u=11",
  },
];

const SupportEmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(
    new Set(),
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null,
  );

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

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Support Employees List
          </h2>
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
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-50 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-50/50 h-14 border-none [&_tr]:border-b-0">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[50px] px-6">
                  <input
                    type="checkbox"
                    checked={
                      selectedEmployees.size === employees.length &&
                      employees.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 accent-blue-600"
                  />
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
                  File Name
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
                  Role
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
                  Skills
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
                  Last Active
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
                  Level
                </TableHead>
                <TableHead className="font-semibold text-gray-900 text-xs uppercase tracking-wider">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map((emp) => (
                <TableRow
                  key={emp.id}
                  className="border-b border-gray-50/50 hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedEmployees.has(emp.id)}
                      onChange={() => toggleEmployeeSelection(emp.id)}
                      className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer"
                    />
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                        <AvatarImage src={emp.avatar} />
                        <AvatarFallback>{emp.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-semibold text-gray-900">
                        {emp.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-sm text-gray-500 font-medium">
                    {emp.email}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-600 border px-3 py-1 rounded-full border-purple-200 text-sm font-normal"
                    >
                      {emp.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 max-w-[200px]">
                    <div className="flex flex-wrap gap-1.5">
                      {emp.skills.slice(0, 2).map((skill, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-gray-50 text-gray-500 border-none px-2 py-0.5 rounded text-[10px] font-bold leading-tight"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {emp.skills.length > 2 && (
                        <Badge
                          variant="secondary"
                          className="bg-gray-50 text-gray-500 border-none px-2 py-0.5 rounded text-[10px] font-bold"
                        >
                          +{emp.skills.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-sm text-gray-500 font-medium">
                    {emp.lastActive}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      className={cn(
                        "px-3 py-1 rounded-lg text-sm font-normal border",
                        emp.status === "Active"
                          ? "bg-emerald-50 text-emerald-500 border-emerald-200"
                          : "bg-rose-50 text-rose-500 border-rose-200",
                      )}
                    >
                      {emp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setIsEditModalOpen(true);
                        }}
                        className="p-1.5 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedEmployee(emp);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Delete Modal */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="max-w-[400px] p-6 rounded-xl border-none">
            <DialogHeader className="space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center">
                <Trash2 className="h-6 w-6 text-rose-500" />
              </div>
              <DialogTitle className="text-lg font-semibold text-center text-gray-900">
                Delete Employee
              </DialogTitle>
              <DialogDescription className="text-center text-gray-500 text-sm">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">
                  {selectedEmployee?.name}
                </span>
                ? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 h-11 rounded-lg border-gray-200 text-gray-600 font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  toast.success("Employee deleted successfully");
                  setIsDeleteModalOpen(false);
                }}
                className="flex-1 h-11 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-lg shadow-rose-100"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-[500px] p-0 overflow-hidden border-none rounded-lg shadow-2xl">
            <DialogHeader className="px-8 py-6 bg-white border-b border-gray-100 italic">
              <DialogTitle className="text-lg font-semibold text-gray-900">
                Edit Employee
              </DialogTitle>
            </DialogHeader>
            <div className="p-8 space-y-6">
              <div className="flex justify-center mb-2">
                <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                  <AvatarImage src={selectedEmployee?.avatar} />
                  <AvatarFallback>{selectedEmployee?.name[0]}</AvatarFallback>
                </Avatar>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2.5">
                  <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Full Name
                  </Label>
                  <Input
                    defaultValue={selectedEmployee?.name}
                    className="h-12 bg-gray-50/50 border-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-medium"
                  />
                </div>
                <div className="space-y-2.5">
                  <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Role
                  </Label>
                  <Select defaultValue={selectedEmployee?.role}>
                    <SelectTrigger className="h-12! w-full bg-gray-50/50 border-gray-100 rounded-lg focus:ring-blue-500 font-medium">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Support Manager">
                        Support Manager
                      </SelectItem>
                      <SelectItem value="Sales Officer">
                        Sales Officer
                      </SelectItem>
                      <SelectItem value="Call attendance">
                        Call attendance
                      </SelectItem>
                      <SelectItem value="System Eng.">System Eng.</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2.5">
                <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email Address
                </Label>
                <Input
                  defaultValue={selectedEmployee?.email}
                  className="h-12 bg-gray-50/50 border-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 font-medium"
                />
              </div>

              <div className="space-y-2.5">
                <Label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Account Status
                </Label>
                <div className="flex gap-4">
                  {["Active", "In Active"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        if (selectedEmployee) {
                          setSelectedEmployee({
                            ...selectedEmployee,
                            status: status as any,
                          });
                        }
                      }}
                      className={cn(
                        "flex-1 h-12 rounded-lg border-1 transition-all font-semibold text-sm",
                        selectedEmployee?.status === status
                          ? status === "Active"
                            ? "bg-emerald-50 border-emerald-500 text-emerald-600"
                            : "bg-rose-50 border-rose-500 text-rose-600"
                          : "border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200",
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter className="px-8 py-6 bg-gray-50  flex items-center gap-0 sm:gap-4">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                className="flex-1 h-12 rounded-xl border-gray-200 text-gray-600 font-bold hover:bg-white"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  toast.success("Employee updated successfully");
                  setIsEditModalOpen(false);
                }}
                className="flex-1 h-12 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-100"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-900">1 to 11</span>{" "}
            of <span className="font-semibold text-blue-600">500</span> Files
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-gray-500 border-gray-200 rounded-lg"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Prev
            </Button>
            <div className="flex items-center gap-1 mx-2">
              <Button
                variant="default"
                size="sm"
                className="h-9 w-9 p-0 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md shadow-blue-100"
              >
                1
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-400 font-medium"
              >
                2
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-400 font-medium"
              >
                3
              </Button>
              <span className="px-2 text-gray-300">...</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-9 w-9 p-0 text-gray-400 font-medium"
              >
                30
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-gray-500 border-gray-200 rounded-lg"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportEmployeeList;
