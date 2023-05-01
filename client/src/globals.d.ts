declare module "react-step-progress-bar" {
  interface ProgressBarProps {
    percent?: number;
    filledBackground?: any;
    height?: string | number;
    width?: string | number;
    stepPositions?: number;
    text?: string;
  }

  interface StepProps {
    transition?: any;
    position?: any;
  }
  class ProgressBar extends React.Component<ProgressBarProps, any> {}
  class Step extends React.Component<StepProps, any> {}
}
