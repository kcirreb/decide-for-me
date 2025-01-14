"use client";

import { useEffect, useRef, useState } from "react";

const options = ["A", "B", "C", "D", "E", "F", "G", "H"];
const colors = ["#E74C3C", "#3498DB", "#27AE60", "#F1C40F"];

export default function Wheel() {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const easeOutCubic = (t: number) => {
    return 1 - Math.pow(1 - t, 3);
  };

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const randomRotation = Math.PI * (2 * Math.random() + 30);
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
    const angle = (Math.PI * 2) / options.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < options.length; i++) {
      // slice
      ctx.beginPath();
      ctx.moveTo(radius, radius);
      ctx.arc(
        radius,
        radius,
        radius,
        rotation + angle * i,
        rotation + angle * (i + 1)
      );
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.save();

      // text
      ctx.translate(radius, radius);
      ctx.rotate(rotation + angle * i + angle / 2);
      ctx.fillStyle = "black";
      ctx.font = "32px Arial";
      ctx.fillText(options[i], radius / 2, 10);
      ctx.restore();
    }

    // arrow
    ctx.beginPath();
    ctx.moveTo(radius - 10, 0);
    ctx.lineTo(radius + 10, 0);
    ctx.lineTo(radius, 20);
    ctx.closePath();
    ctx.fillStyle = "white";
    ctx.fill();
  }, [rotation]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={576}
        height={576}
        className="w-72 h-72"
      ></canvas>
      <button onClick={spin} disabled={spinning} className="mt-4">
        spin
      </button>
    </div>
  );
}
