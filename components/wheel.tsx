import { DEFAULT_COLORS } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

interface WheelProps {
  options: string[];
  multiplier: number;
  spinning: boolean;
  setSpinning: (spinning: boolean) => void;
}

export default function Wheel({
  options,
  multiplier,
  spinning,
  setSpinning,
}: WheelProps) {
  const [rotation, setRotation] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const easeOutCubic = (t: number) => {
    return 1 - Math.pow(1 - t, 3);
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);

    const randomRotation = Math.PI * (2 * Math.random() + 50);
    const spinDuration = 5000;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsedTime = time - startTime;
      const progress = easeOutCubic(Math.min(elapsedTime / spinDuration, 1));
      setRotation(rotation + randomRotation * progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
      }
    };

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const radius = canvas.width / 2;
    const angle = (Math.PI * 2) / (options.length * multiplier);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < options.length * multiplier; i++) {
      // segment
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(
        radius,
        radius,
        radius,
        rotation + angle * i,
        rotation + angle * (i + 1),
      );
      ctx.fillStyle = DEFAULT_COLORS[i % DEFAULT_COLORS.length];
      ctx.fill();
      ctx.save();

      // text
      ctx.translate(radius, radius);
      ctx.rotate(rotation + angle * i + angle / 2);
      ctx.fillStyle = "black";
      ctx.font = "32px Arial";
      ctx.fillText(options[i % options.length], radius / 3, 10);
      ctx.restore();
    }

    // arrow
    ctx.beginPath();
    ctx.moveTo(radius * 2, radius - 10);
    ctx.lineTo(radius * 2, radius + 10);
    ctx.lineTo(radius * 2 - 20, radius);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
  }, [rotation, options, multiplier]);

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={1000}
      onClick={spin}
      className={`w-full max-w-lg aspect-square ${
        spinning ? "cursor-default" : "cursor-pointer"
      }`}
    ></canvas>
  );
}
