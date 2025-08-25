import { useEffect, useRef, useState } from "react";
import type { EllipsisTextProps_single } from "./type.ts";
import { globalResizeObserver, debounce } from "@/utils";
import { Tooltip } from "antd";

const EllipsisText: React.FC<EllipsisTextProps_single> = (props) => {
  const {
    text,
    tooltipProps,
    wrapperClassName,
    wrapperStyle,
    textClassName,
    textStyle,
  } = props;
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isEllipsis, setIsEllipsis] = useState(false);

  const getPadding = (el: HTMLElement) => {
    const style = window.getComputedStyle(el, null);
    const paddingLeft = Number.parseInt(style.paddingLeft, 10) || 0;
    const paddingRight = Number.parseInt(style.paddingRight, 10) || 0;
    const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
    const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
    return {
      pdleft: paddingLeft,
      pdRight: paddingRight,
      pdTop: paddingTop,
      pdBottom: paddingBottom,
    };
  };

  const checkEllipsis = useRef(() => {
    if (contentRef.current && textRef.current) {
      const { pdleft, pdRight } = getPadding(contentRef.current);
      const horizontalPadding = pdleft + pdRight;
      if (
        contentRef.current.clientWidth <=
        textRef.current.offsetWidth + horizontalPadding
      ) {
        setIsEllipsis(true);
      } else {
        setIsEllipsis(false);
      }
    }
  }).current;

  useEffect(() => {
    if (contentRef.current) {
      globalResizeObserver.observe(
        contentRef.current,
        debounce(checkEllipsis, 300)
      );
    }
  }, []);

  if (!text) return null;
  return (
    <Tooltip
      title={text}
      open={isEllipsis ? undefined : false}
      {...tooltipProps}
    >
      <div
        className={wrapperClassName}
        style={{
          width: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          ...(wrapperStyle || {}),
        }}
        ref={contentRef}
      >
        <span ref={textRef} className={textClassName} style={textStyle}>
          {text}
        </span>
      </div>
    </Tooltip>
  );
};

export default EllipsisText;
