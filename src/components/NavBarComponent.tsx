import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import "../App.css";

interface NavBarComponentProps {
  walletAddress: string | null;
  onClick: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => Promise<void>;
  loading?: boolean;
  disabled?: boolean;
}

const NavBarComponent = (props: NavBarComponentProps) => {
  return (
    <nav className="menuBar">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="logo">
          <img
            src="https://whitehatengineering.com/wp-content/uploads/2020/04/whitehat-1.png"
            alt="Logo"
          />
        </div>

        <div className="menuCon">
          <label>
            {props.walletAddress ? "Address: " + props.walletAddress : "null"}
          </label>
          <LogoutOutlined
            key="logout"
            spin={props?.loading}
            disabled={props?.disabled}
            style={{ fontSize: "25px", color: "#000", padding: "20px" }}
            title="Logout/Disconnect"
            onClick={(event: React.MouseEvent<HTMLSpanElement, MouseEvent>) =>
              props.onClick(event)
            }
          />
        </div>
      </div>
    </nav>
  );
};
export default NavBarComponent;
