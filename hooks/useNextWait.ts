import { useEffect, useRef, useState } from "react";

export default function useNextWait(game) {
  const [waiting, setWaiting] = useState(false);
  const [ready, setReady] = useState(false);

  const timerRef = useRef(null);

  useEffect(() => {
    // Only run when entering NEXT
    if (game === "NEXT" || game === "ACTIVE") {
      setWaiting(true);
      setReady(false);

      // Start 3-second timer
      timerRef.current = setTimeout(() => {
        setWaiting(false);
        setReady(true);
      }, 3000);
    } else {
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
