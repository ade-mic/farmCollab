import React, { useState, useEffect } from "react";
import { getUserProfile, getUserProjects, getUserInventory, getUserFarms, getUserOrders } from "../api";
import FarmerHome from "./FarmerHome";
import GeneralUserHome from "./GeneralUserHome";
import { getSellerOrders } from "../api";

const UserHome = () => {
  const [data, setData] = useState({
    user: null,
    projects: 0,
    inventory: 0,
    farms: 0,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileResponse = await getUserProfile();
        const userProjectsResponse = await getUserProjects();
        const userInventoryResponse = await getUserInventory();
        const userFarmsResponse = await getUserFarms();
        const userOrderResponse = await getUserOrders();
        const SellerOrdersResponse = await getSellerOrders();

        setData({
          user: userProfileResponse.data.data,
          projects: userProjectsResponse.data.projects.length,
          inventory: userInventoryResponse.data.inventory.length,
          farms: userFarmsResponse.data.farms.length,
          orders: userOrderResponse.data.orders.length,
          sales: SellerOrdersResponse.data.orders.length,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const firstName = data.user?.name.split(" ")[0];
  const role = data.user?.role;

  return role === "Farmer" ? (
    <FarmerHome data={data} firstName={firstName} />
  ) : (
    <GeneralUserHome firstName={firstName} />
  );
};

export default UserHome;
