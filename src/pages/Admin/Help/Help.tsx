import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  skills: string;
  lastActive: string;
  level: string;
  status: "Active" | "In Active";
}

const Help: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<Set<string>>(
    new Set(),
  );
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  
  const employees: Employee[] = [
    {
      id: "1",
      name: "Domee Russell",
      email: "zenga.nl@example.com",
      role: "Support Manager",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "4A/16",
      status: "Active",
    },
    {
      id: "2",
      name: "Brooklyn Simmons",
      email: "carris.weaver@example.com",
      role: "Sales Officer",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "12/A/17",
      status: "Active",
    },
    {
      id: "3",
      name: "Daimne Robertson",
      email: "michele.rivevs@example.com",
      role: "Call attendance",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "1/31/14",
      status: "In Active",
    },
    {
      id: "4",
      name: "Ateme McCoy",
      email: "jockson.graham@example.com",
      role: "Sales Officer",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "3A/16",
      status: "Active",
    },
    {
      id: "5",
      name: "Marvin McKinney",
      email: "bil.sanders@example.com",
      role: "Sales Officer",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "5/7/18",
      status: "Active",
    },
    {
      id: "6",
      name: "Jann Cooper",
      email: "nathan.colbertg@example.com",
      role: "System Fops",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "2/11/12",
      status: "Active",
    },
    {
      id: "7",
      name: "Thomas Webb",
      email: "tim.janmey@example.com",
      role: "Viewer",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "8/10/14",
      status: "In Active",
    },
    {
      id: "8",
      name: "Durrell Steward",
      email: "demma.carli@example.com",
      role: "Support Manager",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "9/19/04",
      status: "Active",
    },
    {
      id: "9",
      name: "Jacob Jones",
      email: "wills.janmey@example.com",
      role: "Support Manager",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "7/11/19",
      status: "Active",
    },
    {
      id: "10",
      name: "Sommarie Nguyen",
      email: "defores.chandlerd@example.com",
      role: "Viewer",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "8/30/14",
      status: "Active",
    },
    {
      id: "11",
      name: "Devon Lane",
      email: "deton.baill@example.com",
      role: "Viewer",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "5/27/15",
      status: "Active",
    },
    {
      id: "12",
      name: "Robert Fox",
      email: "terral.lawson@example.com",
      role: "Viewer",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "5/19/12",
      status: "Active",
    },
    {
      id: "13",
      name: "Albert Flores",
      email: "atlas.lawson@example.com",
      role: "Viewer",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "10/6/13",
      status: "Active",
    },
    {
      id: "14",
      name: "Kathryn Murphy",
      email: "felicia.mel@example.com",
      role: "Viewer",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "1/15/12",
      status: "In Active",
    },
    {
      id: "15",
      name: "Wade Winton",
      email: "michael.milo@example.com",
      role: "Viewer",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "1/15/12",
      status: "In Active",
    },
    {
      id: "16",
      name: "Kristin Watson",
      email: "newselt.stimson@example.com",
      role: "Viewer",
      skills: "Senior Don Qas",
      lastActive: "Senior Don Qas",
      level: "1/15/12",
      status: "In Active",
    },
  ];

  const roles = [
    "All",
    "Support Manager",
    "Sales Officer",
    "Call attendance",
    "System Fops",
    "Viewer",
  ];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || employee.status === statusFilter;
    const matchesRole = roleFilter === "All" || employee.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const toggleEmployeeSelection = (id: string) => {
    const newSelection = new Set(selectedEmployees);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedEmployees(newSelection);
  };

  const toggleSelectAll = () => {
    if (selectedEmployees.size === filteredEmployees.length) {
      setSelectedEmployees(new Set());
    } else {
      setSelectedEmployees(new Set(filteredEmployees.map((e) => e.id)));
    }
  };

  const handleActionClick = (id: string, action: string) => {
    setShowActionMenu(null);
    console.log(`Performing ${action} on employee ${id}`);
    // Implement actual action logic here
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Support Employees List
        </h1>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employees..."
              className="pl-9 pr-3 py-2 w-64 rounded border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setShowStatusDropdown(!showStatusDropdown);
                setShowRoleDropdown(false);
              }}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded bg-white text-sm"
            >
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">Status: {statusFilter}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showStatusDropdown && (
              <div className="absolute right-0 z-10 mt-1 w-40 bg-white border border-gray-200 rounded shadow">
                <div className="py-1">
                  {["All", "Active", "In Active"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setShowStatusDropdown(false);
                      }}
                      className="block text-left w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role Filter */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleDropdown(!showRoleDropdown);
                setShowStatusDropdown(false);
              }}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded bg-white text-sm"
            >
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">Role: {roleFilter}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 z-10 mt-1 w-48 bg-white border border-gray-200 rounded shadow">
                <div className="py-1 max-h-60 overflow-y-auto">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setRoleFilter(role);
                        setShowRoleDropdown(false);
                      }}
                      className="block text-left w-full px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  checked={
                    selectedEmployees.size === filteredEmployees.length &&
                    filteredEmployees.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-blue-600 rounded"
                />
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Active
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedEmployees.has(employee.id)}
                    onChange={() => toggleEmployeeSelection(employee.id)}
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {employee.name}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.email}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.role}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.skills}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {employee.lastActive}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.level}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      employee.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm relative">
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() =>
                      setShowActionMenu(
                        showActionMenu === employee.id ? null : employee.id,
                      )
                    }
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </button>

                  {showActionMenu === employee.id && (
                    <div className="absolute right-0 z-10 mt-1 w-48 bg-white border border-gray-200 rounded shadow-lg">
                      <div className="py-1">
                        <button
                          onClick={() => handleActionClick(employee.id, "view")}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </button>
                        <button
                          onClick={() => handleActionClick(employee.id, "edit")}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleActionClick(employee.id, "delete")
                          }
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">11</span> of{" "}
              <span className="font-medium">500</span> employees
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                1
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                2
              </button>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                3
              </button>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                8
              </button>
              <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
