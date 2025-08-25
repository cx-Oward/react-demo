import { useEffect, useRef, useState } from "react";
import type { EllipsisTextProps_multiple } from "./type.ts";
import { globalResizeObserver, debounce } from "@/utils";
import { Tooltip } from "antd";

const EllipsisText: React.FC<EllipsisTextProps_multiple> = (props) => {
  const {
    text,
    rows = 3,
    tooltipProps,
    textClassName,
    textStyle,
  } = props;
  const textRef = useRef<HTMLDivElement>(null);
  const [isEllipsis, setIsEllipsis] = useState(false);

  const checkEllipsis = useRef(() => {
    if (textRef.current) {
      const { scrollHeight, clientHeight } = textRef.current;
      if (scrollHeight > clientHeight) {
        setIsEllipsis(true);
      } else {
        setIsEllipsis(false);
      }
    }
  }).current;

  useEffect(() => {
    if (textRef.current) {
      globalResizeObserver.observe(
        textRef.current,
        debounce(checkEllipsis, 300)
      );
    }
  }, []);

  if (!text) return null;
  return (
    <Tooltip title={text} open={isEllipsis ? undefined : false} {...tooltipProps}>
      <div
        className={textClassName}
        style={{
          width: "100%",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: rows,
          wordBreak: "break-all",
          ...textStyle || {},
        }}
        ref={textRef}
      >
        {text}
      </div>
    </Tooltip>
  );
};

export default EllipsisText;
