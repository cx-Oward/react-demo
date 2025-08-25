import type { TooltipProps } from "antd";

interface CommonProps {
  tooltipProps?: TooltipProps;
  textClassName?: string;
  textStyle?: React.CSSProperties;
}

export interface EllipsisTextProps_single extends CommonProps {
  text?: string;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
}

export interface EllipsisTextProps_multiple extends CommonProps {
  text?: string;
  rows?: number;
}
