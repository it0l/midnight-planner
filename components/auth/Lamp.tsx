export default function Lamp() {
    return (
      <div className="absolute top-0 left-1/2 -translate-x-1/2">
        <svg
          width="120"
          height="90"
          viewBox="0 0 120 90"
          fill="none"
        >
          <path
            d="M30 20C30 5 90 5 90 20L75 50H45L30 20Z"
            fill="#1e1e1e"
            stroke="#444"
          />
  
          <rect
            x="55"
            y="50"
            width="10"
            height="15"
            fill="#333"
          />
        </svg>
      </div>
    );
  }