import React, { useState } from "react";
import { Card, Avatar } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";

import { useWallet } from "../../hooks/useWallet";
import logo from "../../assets/logo.svg";
import {
  META_DESCRIPTION,
  META_TITLE,
} from "../../constants/LoginPageConstants";
import "./LoginPage.css";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const { Meta } = Card;

const LoginPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useLocalStorage(
    "WALLET_ADDRESS",
    null
  );

  const { connectToWallet } = useWallet();

  const handleClick = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      await connectToWallet();
      setIsProcessing(false);
      <Navigate to={"/home"} replace />;
    } catch (e: any) {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container">
      <Card
        bordered={true}
        style={{ width: 300 }}
        cover={<img alt="Logo" src={logo} />}
        actions={[
          <LoginOutlined
            key="login"
            spin={isProcessing}
            style={{ fontSize: "25px", color: "#08c" }}
            title="Login/Connect"
            onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
              handleClick(event)
            }
          />,
        ]}
      >
        <Meta
          avatar={<Avatar src={logo} />}
          title={META_TITLE}
          description={META_DESCRIPTION}
        />
      </Card>
    </div>
  );
};

export default LoginPage;
