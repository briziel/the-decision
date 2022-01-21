import Head from "next/head";
import Confetti from "react-confetti";
import ReactCanvasConfetti from "react-canvas-confetti";
import { useWindowSize } from "react-use";
import { useRef, useState } from "react";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

export default function Home() {
  const { width, height } = useWindowSize();
  const [clickType, setClickType] = useState();
  const animationInstance = useRef(null);

  const makeShot = (particleRatio, opts) => {
    console.log(animationInstance.current);

    animationInstance &&
      animationInstance.current &&
      animationInstance.current({
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      });
  };

  const fire = (xPx, yPx) => {
    const opts = {
      origin: {
        x: xPx / window.innerWidth,
        y: yPx / window.innerHeight,
      },
      colors:
        clickType === "kickstarter"
          ? ["#A82D00", "#5C2D1C", "#DB3900", "#E16E44", "#5C1800"]
          : ["#0068A8", "#1C435C", "#0087DB", "#44A5E1", "#00395C"],
    };

    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
      ...opts,
    });

    makeShot(0.2, {
      spread: 60,
      ...opts,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
      ...opts,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
      ...opts,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
      ...opts,
    });
  };

  const handleFire = (event, clickType) => {
    setClickType(clickType);
    fire(event.pageX, event.pageY);
  };

  const getInstance = (instance) => {
    animationInstance.current = instance;
  };

  return (
    <div className="container">
      <Head>
        <title>Du </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {clickType && (
          <Confetti
            width={width}
            height={height}
            colors={
              clickType === "kickstarter"
                ? ["#A82D00", "#5C2D1C", "#DB3900", "#E16E44", "#5C1800"]
                : ["#0068A8", "#1C435C", "#0087DB", "#44A5E1", "#00395C"]
            }
          ></Confetti>
        )}
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        <div className="buttonWrapper">
          <button className="button blue" onClick={(e) => handleFire(e, "essen")}>Essen gehen</button>
          <button className="button red" onClick={(e) => handleFire(e, "kickstarter")}>
            Kickstarter Kampagne unterstützen
          </button>
        </div>
      </main>
    </div>
  );
}
