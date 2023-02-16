export interface LoadingComponentProps {
  spinnerText: string;
  alertMessage: string;
  alertDescription: string;
  alertType: "success" | "info" | "warning" | "error";
}

export interface NavBarComponentProps {
  walletAddress: string | null;
  onClick: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => Promise<void>;
  loading?: boolean;
  disabled?: boolean;
}
