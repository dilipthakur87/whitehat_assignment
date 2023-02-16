import React from "react";
import { Navigate } from "react-router-dom";
import NavBarComponent from "../components/NavBarComponent";
import { useQuery } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { getTestDataService } from "../services/getTestDataService";
import LoadingComponent from "../components/LoadingComponent";
import { Table } from "antd";

const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
];

const HomePage = () => {
  const { walletAddress, disconnectFromWallet } = useAuth();

  // using react-query to fetch data and manage the state/status
  const { data, error, isLoading } = useQuery(
    "RANDOM_FACTS_TEST",
    getTestDataService
  );

  const handleDisconnect = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.preventDefault();
    try {
      await disconnectFromWallet();
      <Navigate to={"/"} replace />;
    } catch (e: any) {
      console.log(" error disconnecting == ", e);
    }
  };

  return (
    <div>
      <NavBarComponent
        walletAddress={walletAddress ? walletAddress : "null"}
        onClick={(e: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
          handleDisconnect(e)
        }
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {isLoading ? (
          <LoadingComponent />
        ) : error ? (
          <div> Error! </div>
        ) : (
          <Table dataSource={data ? data : undefined} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
