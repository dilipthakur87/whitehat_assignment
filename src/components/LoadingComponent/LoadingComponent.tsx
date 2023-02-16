import React from "react";
import { Alert, Spin } from "antd";
import { LoadingComponentProps } from "../../constants/interface/ComponentsInterface";

const LoadingComponent = (props: LoadingComponentProps) => (
  <Spin tip={`${props.spinnerText}...`}>
    <Alert
      message={props.alertMessage}
      description={props.alertDescription}
      type={props.alertType}
    />
  </Spin>
);

export default LoadingComponent;
