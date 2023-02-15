import React, { useEffect, useState } from "react";
import { Card, Avatar } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import logo from "../logo.svg";

const { Meta } = Card;

const LoginPage: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const { connectToWallet } = useAuth();

  useEffect(() => {
    console.log(" asdafdsfa = ", isProcessing);
  }, [isProcessing]);

  const handleClick = async (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    event.preventDefault();
    setIsProcessing(true);

    try {
      connectToWallet();
      setIsProcessing(false);

      <Navigate to={"/home"} replace />;
    } catch (e: any) {
      console.log(" error connecting == ", e);
      setIsProcessing(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        bordered={true}
        style={{ width: 300 }}
        cover={<img alt="Logo" src={logo} />}
        actions={[
          <LoginOutlined
            key="Login/Connect"
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
          title="Whitehat Assignment"
          description="A react application that demonstrates react-hooks, react-query, and Web3
            implementation. Please click the button below to connect to your Metamask wallet."
        />
      </Card>
    </div>
  );
};

export default LoginPage;
