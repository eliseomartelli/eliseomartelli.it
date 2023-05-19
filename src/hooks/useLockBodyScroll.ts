import { useLayoutEffect } from "react";

// @see https://usehooks.com/useLockBodyScroll.
export function useLockBody() {
  useLayoutEffect((): (() => void) => {
    const { overflow, paddingRight } = window.getComputedStyle(document.body);
    const { innerWidth } = window;
    const { clientWidth } = document.documentElement;
    if (paddingRight === "0px") {
      document.body.style.paddingRight = `${innerWidth - clientWidth}px`;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = "0px";
    };
  }, []);
}
