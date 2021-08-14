/**
 * Model containing hook for obtaining window dimensions
 */

import { useState, useEffect } from "react";

/**
 * Returns the current dimensions of the window
 * @returns {{width: number, height: number}}
 */
function getWindowDimensions(): { width: number; height: number } {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

/**
 * Returns the reactive current window dimensions
 * @returns {{ width: number; height: number }}
 */
export default function useWindowDimensions(): {
  width: number;
  height: number;
} {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
