import { useState, useEffect } from "react";

export function useDeviceCapabilities() {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    // Check if window and navigator are available (client-side)
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      let lowEnd = false;

      // 1. Device Memory (RAM) <= 4GB
      if ("deviceMemory" in navigator) {
        if ((navigator as any).deviceMemory <= 4) {
          lowEnd = true;
        }
      }

      // 2. Hardware Concurrency (CPU Cores) <= 4
      if ("hardwareConcurrency" in navigator) {
        if (navigator.hardwareConcurrency <= 4) {
          lowEnd = true;
        }
      }

      // 3. Network Information API (Data Saver or Slow Connection)
      if ("connection" in navigator) {
        const conn = (navigator as any).connection;
        if (conn) {
          if (conn.saveData) {
            lowEnd = true;
          }
          if (["slow-2g", "2g", "3g"].includes(conn.effectiveType)) {
            lowEnd = true;
          }
        }
      }

      setIsLowEnd(lowEnd);
    }
  }, []);

  return { isLowEnd };
}
