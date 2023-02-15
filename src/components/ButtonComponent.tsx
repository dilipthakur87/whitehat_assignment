import React from "react";
import { Button } from "antd";

interface ButtonComponentProps {
  text: string;
  onClick?: (event?: any) => void;
  loading?: boolean;
  disabled?: boolean;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  return (
    <Button
      type="primary"
      loading={props?.loading}
      onClick={props?.onClick}
      disabled={props?.disabled}
    >
      {props.text}
    </Button>
  );
};

export default ButtonComponent;
