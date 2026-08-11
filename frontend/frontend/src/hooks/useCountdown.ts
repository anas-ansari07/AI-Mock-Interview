import { useEffect, useState } from "react";

interface UseCountdownProps {
  duration: number;
  isRunning: boolean;
}

export default function useCountdown({
  duration,
  isRunning,
}: UseCountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    if (!isRunning) return;

    setSecondsLeft(duration);
  }, [duration, isRunning]);

  useEffect(() => {
    if (!isRunning) return;

    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, isRunning]);

  return secondsLeft;
}