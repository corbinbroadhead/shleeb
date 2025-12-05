import { useEffect, useRef, useState } from "react";

export default function useNextWait(game) {
  const [waiting, setWaiting] = useState(false);
  const [ready, setReady] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    console.log("[useNextWait] game changed to:", game);
    // Only run when entering NEXT
    if (game === "NEXT" || game === "ACTIVE") {
      console.log("[useNextWait] Starting 3-second wait");
      setWaiting(true);
      setReady(false);

      // Start 3-second timer
      timerRef.current = setTimeout(() => {
        console.log("[useNextWait] Wait complete, ready!");
        setWaiting(false);
        setReady(true);
      }, 3000);
    } else {
      console.log("[useNextWait] Not NEXT/ACTIVE, clearing");
      // Clear everything if leaving NEXT
      setWaiting(false);
      setReady(false);
    }

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [game]);

  return { waiting, ready };
}
