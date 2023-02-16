import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { NavBarComponentProps } from "../../constants/interface/ComponentsInterface";
import "./NavBarComponent.css";

const NavBarComponent = (props: NavBarComponentProps) => {
  return (
    <nav className="menuBar">
      <div className="menuContainer">
        <div className="logo">
          <img
            src="https://whitehatengineering.com/wp-content/uploads/2020/04/whitehat-1.png"
            alt="Logo"
          />
        </div>

        <div className="menuCon">
          <label>
            {props.walletAddress
              ? "Address: " + props.walletAddress
              : "--------"}
          </label>
          <LogoutOutlined
            key="logout"
            spin={props?.loading}
            disabled={props?.disabled}
            className="logoutLogo"
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
