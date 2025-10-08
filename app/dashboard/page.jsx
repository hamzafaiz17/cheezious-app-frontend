"use client";
import { SectionCards } from "./components/main/card-section";
import { ChartAreaInteractive } from "./components/main/chart";
import DataTable from "./components/main/data-table";
import fetchOrders from "./api/orders/fetch-orders";
import fetchUsers from "./api/users/fetchUsers";
import { useState, useEffect } from "react";
export default function Dashboard() {
  let [orders, setOrders] = useState([]);
  let [users, setUsers] = useState([]);
  let apiEndpoint =
    process.env.NEXT_PUBLIC_API_BASE_URL + process.env.NEXT_PUBLIC_API_VERSION;

  useEffect(() => {
    fetchOrders(apiEndpoint + "orders", orders, setOrders);
    fetchUsers(apiEndpoint + "auth/users", users, setUsers);
  }, []);

  const filteredOrders = orders.filter(
    (order) => order.status === "pending" || order.status === "completed"
  );
  let totalSale = filteredOrders.reduce(
    (sum, order) => sum + (order.totalPrice || 0),
    0
  );
  let totalCompletedOrders = orders.filter((o) => o.status === "completed");
  let activeUsers = users.filter(
    (user) => user.status === "active" && user.role === "user"
  );

  const getNewUsersWeek = (users) => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return users.filter((u) => new Date(u.createdAt) >= weekAgo);
  };
  let newUsers = getNewUsersWeek(users);

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards
              total={totalSale}
              activeUsers={activeUsers.length}
              newUsers={newUsers.length}
              CompletedOrders={totalCompletedOrders.length}
            />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable orders={orders} setOrders={setOrders} />
          </div>
        </div>
      </div>
    </>
  );
}
