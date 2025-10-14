import React, { useEffect } from "react";
import "./SplashScreen.css";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // Dura 3 segundos

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div id="splash-mask">
      <div className="mask-overlay"></div>
    </div>
  );
}
