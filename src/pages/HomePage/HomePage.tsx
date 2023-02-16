import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Table } from "antd";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import { useWallet } from "../../hooks/useWallet";
import { getTestDataService } from "../../services/getTestDataService";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { columns, TEST_DATA } from "../../constants/HomePageConstants";
import "./HomePage.css";
import { useWeb3React } from "@web3-react/core";

const HomePage = () => {
  const { walletAddress, disconnectFromWallet } = useWallet();

  // using react-query to fetch data and manage the state/status
  const { data, error, isLoading } = useQuery(TEST_DATA, getTestDataService);

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
      <div className="container">
        {isLoading ? (
          <LoadingComponent
            spinnerText="Loading"
            alertMessage="Please wait"
            alertDescription="We are currently fetching your data."
            alertType="info"
          />
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
