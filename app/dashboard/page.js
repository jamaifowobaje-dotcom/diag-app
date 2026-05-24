"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label,
} from "recharts";

const stats = [
  {
    label: "TOTAL REVENUE",
    value: "\u20A624,000.00",
    change: "+20%",
    changeColor: "text-green-600",
  },
  {
    label: "CHURNED REVENUE",
    value: "\u20A62,000.00",
    change: "-5%",
    changeColor: "text-red-600",
  },
  {
    label: "ACTIVE USERS",
    value: "400",
    change: "+20%",
    changeColor: "text-green-600",
  },
];

const monthlyRevenueData = {
  "Oct 2024": [
    { date: "Oct 1", revenue: 0 },
    { date: "Oct 3", revenue: 8000 },
    { date: "Oct 6", revenue: 20000 },
    { date: "Oct 9", revenue: 35000 },
    { date: "Oct 10", revenue: 55000 },
    { date: "Oct 15", revenue: 40000 },
    { date: "Oct 16", revenue: 24000 },
    { date: "Oct 17", revenue: 30000 },
    { date: "Oct 18", revenue: 20000 },
  ],
  "Sep 2024": [
    { date: "Sep 1", revenue: 5000 },
    { date: "Sep 5", revenue: 12000 },
    { date: "Sep 10", revenue: 18000 },
    { date: "Sep 15", revenue: 22000 },
    { date: "Sep 20", revenue: 30000 },
    { date: "Sep 25", revenue: 25000 },
    { date: "Sep 30", revenue: 20000 },
  ],
  "Aug 2024": [
    { date: "Aug 1", revenue: 3000 },
    { date: "Aug 5", revenue: 9000 },
    { date: "Aug 10", revenue: 15000 },
    { date: "Aug 15", revenue: 20000 },
    { date: "Aug 20", revenue: 18000 },
    { date: "Aug 25", revenue: 22000 },
    { date: "Aug 30", revenue: 17000 },
  ],
};

const plansData = [
  { plan: "Free", users: 290 },
  { plan: "Pro", users: 190 },
  { plan: "Business", users: 150 },
  { plan: "Enterprise", users: 150 },
];

const countryData = [
  { name: "Nigeria", value: 160, color: "#4F46E5" },
  { name: "UK", value: 80, color: "#a5b4fc" },
  { name: "US", value: 120, color: "#38bdf8" },
  { name: "Others", value: 40, color: "#86efac" },
];

const totalUsers = countryData.reduce((sum, entry) => sum + entry.value, 0);

const signupsData = [
  {
    name: "Adebanjo Promise",
    email: "Adebanjo@gmail.com",
    plan: "Free",
    joined: "3 days ago",
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
  },
  {
    name: "Daniel Ololade",
    email: "Daniel@gmail.com",
    plan: "Premium",
    joined: "4 days ago",
    status: "Trial expire",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
  },
  {
    name: "Daniel Ololade",
    email: "Daniel@gmail.com",
    plan: "Premium",
    joined: "4 days ago",
    status: "In-active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
  },
  {
    name: "Adebanjo Promise",
    email: "Adebanjo@gmail.com",
    plan: "Free",
    joined: "3 days ago",
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
  },
  {
    name: "Daniel Ololade",
    email: "Daniel@gmail.com",
    plan: "Premium",
    joined: "4 days ago",
    status: "Trial expire",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
  },
  {
    name: "Daniel Ololade",
    email: "Daniel@gmail.com",
    plan: "Premium",
    joined: "4 days ago",
    status: "In-active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6",
  },
  {
    name: "Adebanjo Promise",
    email: "Adebanjo@gmail.com",
    plan: "Free",
    joined: "3 days ago",
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=7",
  },
  {
    name: "Daniel Ololade",
    email: "Daniel@gmail.com",
    plan: "Premium",
    joined: "4 days ago",
    status: "Trial expire",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=8",
  },
];

const rowsPerPage = 4;
const months = Object.keys(monthlyRevenueData);

const darkTooltip = {
  contentStyle: {
    backgroundColor: "#4F46E5",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
  },
  labelStyle: { color: "#e5e7eb", fontWeight: "600" },
  itemStyle: { color: "#fff" },
};

function getStatusClass(status) {
  if (status === "Active") return "bg-green-100 text-green-700";
  if (status === "Trial expire") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-600";
}

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const currentMonth = "Oct 2024";
  const [selectedRevenueMonth, setSelectedRevenueMonth] =
    useState(currentMonth);
  const [selectedPlansMonth, setSelectedPlansMonth] = useState(currentMonth);
  const [revenueDropdownOpen, setRevenueDropdownOpen] = useState(false);
  const [plansDropdownOpen, setPlansDropdownOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userId = localStorage.getItem("diag_user_id");

        if (!userId) {
          return;
        }

        const response = await fetch(`/api/user/${userId}`);

        if (!response.ok) {
          const err = await response.json();
          console.error("API error:", err);
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user.", error);
      }
    }

    fetchUser();
  }, []);

  const userName = user?.name || "there";

  const currentUserRow = user
    ? {
        name: user.name || "—",
        email: user.email || "—",
        plan: "Free",
        joined: "Just now",
        status: "Active",
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name || "user")}`,
      }
    : null;

  const tableData = currentUserRow
    ? [currentUserRow, ...signupsData]
    : signupsData;
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const pageStart = (currentPage - 1) * rowsPerPage;
  const currentRows = tableData.slice(pageStart, pageStart + rowsPerPage);
  const revenueData = monthlyRevenueData[selectedRevenueMonth];

  return (
    <AnimatePresence>
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-gray-100"
    >
      <DashboardSidebar
        activePage="Dashboard"
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((o) => !o)}
        onClose={() => setSidebarOpen(false)}
      />
      <DashboardNavbar
        userName={userName}
        sidebarOpen={sidebarOpen}
        user={user}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />
      <section
        className={`pt-16 transition-all duration-300 ml-0 ${sidebarOpen ? "lg:ml-64" : "lg:ml-16"}`}
      >
        <div className="p-8 space-y-8">
          <h1 className="text-3xl font-bold text-gray-950">
            Welcome {userName}
          </h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: -30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 20,
                  delay: index * 0.15,
                }}
                className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200"
              >
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  {stat.label}
                </p>
                <div className="mt-4 flex items-end justify-between gap-4">
                  <p className="text-2xl font-bold text-gray-950">
                    {stat.value}
                  </p>
                  <p className={`text-sm font-semibold ${stat.changeColor}`}>
                    {stat.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Revenue Over Time */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.3,
              }}
              className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Revenue Over Time
                </p>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setRevenueDropdownOpen((o) => !o)}
                    className="flex items-center gap-1 text-xs font-semibold text-[#4F46E5]"
                  >
                    {selectedRevenueMonth === currentMonth
                      ? "THIS MONTH"
                      : selectedRevenueMonth}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m6 9 6 6 6-6"
                      />
                    </svg>
                  </button>
                  {revenueDropdownOpen && (
                    <div className="absolute right-0 top-6 z-10 rounded-md border border-gray-200 bg-white shadow-lg">
                      {months.map((month) => (
                        <button
                          key={month}
                          type="button"
                          onClick={() => {
                            setSelectedRevenueMonth(month);
                            setRevenueDropdownOpen(false);
                          }}
                          className={`block w-full px-4 py-2 text-left text-xs font-medium hover:bg-gray-50 ${selectedRevenueMonth === month ? "text-[#4F46E5]" : "text-gray-700"}`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                  <YAxis
                    tick={{ fontSize: 10 }}
                    tickFormatter={(v) => `\u20A6${v / 1000}k`}
                  />
                  <Tooltip
                    {...darkTooltip}
                    formatter={(value) => [
                      `\u20A6${value.toLocaleString()}`,
                      "Revenue",
                    ]}
                    labelFormatter={(label) => `${label} 2024`}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#4F46E5"
                    fill="url(#revenueGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Top Performing Plans */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.3,
              }}
              className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200"
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  Top Performing Plans
                </p>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPlansDropdownOpen((o) => !o)}
                    className="flex items-center gap-1 text-xs font-semibold text-[#4F46E5]"
                  >
                    {selectedPlansMonth === currentMonth
                      ? "THIS MONTH"
                      : selectedPlansMonth}

                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m6 9 6 6 6-6"
                      />
                    </svg>
                  </button>

                  {plansDropdownOpen && (
                    <div className="absolute right-0 top-6 z-10 rounded-md border border-gray-200 bg-white shadow-lg">
                      {months.map((month) => (
                        <button
                          key={month}
                          type="button"
                          onClick={() => {
                            setSelectedPlansMonth(month);
                            setPlansDropdownOpen(false);
                          }}
                          className={`block w-full px-4 py-2 text-left text-xs font-medium hover:bg-gray-50 ${
                            selectedPlansMonth === month
                              ? "text-[#4F46E5]"
                              : "text-gray-700"
                          }`}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={plansData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="plan" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip {...darkTooltip} />
                  <Bar dataKey="users" fill="#a5b4fc" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* User Distribution */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.3,
              }}
              className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200"
            >
              <p className="mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                User Distribution by Country
              </p>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    dataKey="value"
                  >
                    {countryData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                    <Label
                      value={`${totalUsers}`}
                      position="centerBottom"
                      className="text-lg font-bold"
                      fill="#111827"
                      fontSize={18}
                      fontWeight="bold"
                      dy={-4}
                    />
                    <Label
                      value="Total users"
                      position="centerTop"
                      fill="#6b7280"
                      fontSize={11}
                      dy={14}
                    />
                  </Pie>
                  <Tooltip {...darkTooltip} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {countryData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-xs text-gray-600">
                      {entry.name} ({entry.value})
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Latest Signups */}
          <section>
            <h2 className="mb-4 text-xl font-bold text-gray-950">
              Latest Signups
            </h2>
            <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
              <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-200">
                  <tr>
                    {["NAME", "EMAIL", "PLAN", "JOINED", "STATUS"].map(
                      (col) => (
                        <th
                          key={col}
                          className="px-6 py-4 text-xs font-bold tracking-widest text-gray-400 uppercase"
                        >
                          {col}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {currentRows.map((signup, index) => (
                    <tr
                      key={`${signup.name}-${pageStart + index}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={signup.avatar}
                            alt={signup.name}
                            width={36}
                            height={36}
                            className="rounded-full bg-gray-100"
                          />
                          <span className="text-sm font-semibold text-gray-900">
                            {signup.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {signup.email}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-700">
                        {signup.plan}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {signup.joined}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(signup.status)}`}
                        >
                          {signup.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  &lt;
                </button>
                <span className="text-sm font-medium text-gray-600">
                  page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-md border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  &gt;
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </motion.main>
    </AnimatePresence>
  );
}