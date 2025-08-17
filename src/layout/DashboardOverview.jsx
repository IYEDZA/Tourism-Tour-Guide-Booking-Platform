import React from "react";
import { Card } from "react-daisyui";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardOverview = () => {
  // Example stats
  const stats = [
    { title: "Total Users", value: 1200, icon: "👥" },
    { title: "Total Tours", value: 340, icon: "🗺️" },
    { title: "Total Guides", value: 45, icon: "🧑‍✈️" },
    { title: "Total Bookings", value: 890, icon: "📑" },
  ];

  // Bar chart data (Bookings per month)
  const bookingsData = [
    { month: "Jan", bookings: 120 },
    { month: "Feb", bookings: 90 },
    { month: "Mar", bookings: 150 },
    { month: "Apr", bookings: 200 },
    { month: "May", bookings: 170 },
  ];

  // Pie chart data (Tour Categories)
  const categoriesData = [
    { name: "Adventure", value: 40 },
    { name: "Cultural", value: 25 },
    { name: "Nature", value: 20 },
    { name: "Luxury", value: 15 },
  ];

  const COLORS = ["#2563eb", "#facc15", "#22c55e", "#ef4444"]; // Primary + theme-friendly

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-primary"
      >
        📊 Dashboard Overview
      </motion.h2>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="shadow-xl bg-base-100 border-t-4 border-primary">
              <div className="p-4 text-center space-y-2">
                <div className="text-4xl">{stat.icon}</div>
                <h3 className="text-lg font-semibold">{stat.title}</h3>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bar Chart */}
        <Card className="shadow-xl bg-base-100">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-primary">📈 Monthly Bookings</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart */}
        <Card className="shadow-xl bg-base-100">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4 text-primary">🥇 Tour Categories</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoriesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
