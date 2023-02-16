import React from "react";
import { Alert, Spin } from "antd";

const LoadingComponent: React.FC = () => (
  <Spin tip="Loading...">
    <Alert
      message="Please wait"
      description="We are currently fetching your data."
      type="info"
    />
  </Spin>
);

export default LoadingComponent;
