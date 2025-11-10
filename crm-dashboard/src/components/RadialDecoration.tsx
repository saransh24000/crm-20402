import React from "react";

// Radial fan of glossy capsules that closely mimics the reference
type Props = {
  isLoading?: boolean;
  loadingHueDeg?: number; // base hue when loading starts
  cycleColors?: boolean;  // animate hue rotation while loading
};

export default function RadialDecoration({ isLoading = false, loadingHueDeg = 120, cycleColors = true }: Props) {
  const [progress, setProgress] = React.useState(0);
  const count = 6; // denser to complete half circle
  // lighter on the left, darker on the right
  const colors = ["#F0F7FF", "#E6F3FF", "#D8EDFF", "#C7E5FF", "#A9D7FF", "#7EC2FF", "#4DA9FA", "#1D83EB"];
  // Bottom half-circle rotated slightly left so ends are near-horizontal
  const start = -180; // rotate left (was around -180)
  const end = 0;    // right end slightly up
  const angles = Array.from({ length: count }, (_, i) => start + (i * (end - start)) / (count - 1));

  // Animate progress from 0 to 100% when loading
  React.useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const duration = 700; // Match the refresh duration
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min(100, (elapsed / duration) * 100);
        setProgress(newProgress);
        if (newProgress >= 100) {
          clearInterval(interval);
        }
      }, 16); // ~60fps
      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  return (
    <div className="relative w-full flex justify-center mt-0">
      <svg width="740" height="320" viewBox="0 0 740 320" fill="none">
        <defs>
          {/* blue inner core with slight vertical depth */}
          <linearGradient id="capsInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B9E0FF" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#2F8FE9" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0A5FC0" stopOpacity="0.75" />
          </linearGradient>
          {/* diagonal specular highlight */}
          <linearGradient id="capsSpec" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodOpacity="0.18" />
          </filter>
          {/* background halo */}
          <radialGradient id="halo" cx="50%" cy="70%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
          {/* gradient for loading arc (green -> blue) */}
          <linearGradient id="loadGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#10B981" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.95" />
          </linearGradient>
          {/* Progress bar gradient for cylinders - bright white to blue */}
          <linearGradient id="progressGradBase" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#93C5FD" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.85" />
          </linearGradient>
          <filter id="blurGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>

        {/* soft halo behind capsules */}
        <ellipse cx="370" cy="250" rx="250" ry="150" fill="url(#halo)" />

        {angles.map((angle, i) => {
          const r = 110;
          const cx = 370 + Math.cos((angle * Math.PI) / 180) * r;
          const cy = 325 + Math.sin((angle * Math.PI) / 180) * r;
          const rot = angle + 90;
          const body = colors[i] || colors[colors.length - 1];
          const sideOpacity = 0.45 + (i / (count - 1)) * 0.25; // darker towards right
          const progressWidth = (progress / 100) * 50; // 50 is the width of the cylinder
          return (
            <g key={i} transform={`translate(${cx}, ${cy}) rotate(${rot})`} filter="url(#soft)" className={isLoading ? "animate-cyl" : undefined}>
              {/* glass body */}
              <rect x={-23} y={-92} rx={18} width={50} height={180} fill={body} stroke="#E6F3FF" strokeWidth={1} />
              {/* inner core tilted slightly */}
              <g transform="skewX(-10)">
                <rect x={-14} y={-75} rx={12} width={32} height={140} fill="url(#capsInner)" />
              </g>
              {/* Progress bar overlay - fills from left to right */}
              {isLoading && progress > 0 && (
                <g>
                  {/* Progress fill rectangle with gradient - appears on top of body */}
                  <rect 
                    x={-23} 
                    y={-64} 
                    rx={18} 
                    width={Math.min(50, progressWidth)} 
                    height={152} 
                    fill="url(#progressGradBase)"
                    opacity={0.9}
                  />
                  {/* Bright highlight at the progress edge */}
                  {progressWidth < 50 && (
                    <rect 
                      x={-23 + Math.min(50, progressWidth)} 
                      y={-64} 
                      rx={18} 
                      width={5} 
                      height={152} 
                      fill="#FFFFFF"
                      opacity={1}
                    />
                  )}
                </g>
              )}
              {/* white rounded cap - on top */}
              <rect x={-23} y={-92} rx={18} width={50} height={28} fill="#FFFFFF" opacity={0.95} />
              {/* long specular along left edge */}
              <rect x={-23} y={-92} rx={18} width={20} height={160} fill="url(#capsSpec)" opacity={sideOpacity} />
            </g>
          );
        })}

        {/* Loading arc overlay following the same half-circle path */}
        {isLoading && (
          <g>
            {/* the path is a half-ellipse matching the soft halo center */}
            <path
              d="M120 250 A250 150 0 0 1 620 250"
              stroke="url(#loadGrad)"
              strokeWidth="10"
              strokeLinecap="round"

              fill="none"
              className="animate-dash"
              style={{ strokeDasharray: "160 820" }}
            />
            {/* subtle glow under the arc */}
            <path
              d="M120 250 A250 150 0 0 1 620 250"
              stroke="#22C55E"
              strokeWidth="14"
              strokeLinecap="round"
              opacity="0.12"
              filter="url(#blurGlow)"
              fill="none"
              className="animate-dash"
              style={{ strokeDasharray: "160 820" }}
            />
          </g>
        )}
      </svg>

      {/* local animation keyframes */}
      {isLoading && (
        <style>
          {`
            @keyframes dash-move { to { stroke-dashoffset: -980; } }
            .animate-dash { animation: dash-move 1.8s linear infinite; }
            @keyframes cyl-pulse { 0% { filter: brightness(1) } 50% { filter: hue-rotate(25deg) brightness(1.08) } 100% { filter: brightness(1) } }
            .animate-cyl { animation: cyl-pulse 1.6s ease-in-out infinite; }
          `}
        </style>
      )}
    </div>
  );
}



