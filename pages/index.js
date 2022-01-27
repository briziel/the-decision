import Head from "next/head";
import Confetti from "react-confetti";
import ReactCanvasConfetti from "react-canvas-confetti";
import ConfettiExplosion from "react-confetti-explosion";
import { useWindowSize } from "react-use";
import { useEffect, useRef, useState } from "react";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

export default function Home() {
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const { width, height } = useWindowSize();
  const [clickType, setClickType] = useState();
  const animationInstance = useRef(null);

  useEffect(() => {
    if (getCookie("clicked")) {
      setClickType(getCookie("clicked"));
    }
  });

  const makeShot = (particleRatio, opts) => {
    animationInstance &&
      animationInstance.current &&
      animationInstance.current({
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      });
  };

  const fire = (xPx, yPx, _clickType) => {
    const opts = {
      origin: {
        x: xPx / window.innerWidth,
        y: yPx / window.innerHeight,
      },
      colors:
        _clickType === "kickstarter"
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

  const handleFire = (event, _clickType) => {
    setClickType(_clickType);
    fire(event.pageX, event.pageY, _clickType);
    document.cookie = `clicked=${_clickType}`;
  };

  const getInstance = (instance) => {
    animationInstance.current = instance;
  };

  return (
    <div className="container">
      <Head>
        <title>Du </title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
          rel="stylesheet"
        />
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

        <div className="result">
          {clickType ? (
            <>
              <span className="money">255€</span>
              <span className="purpose">
                {clickType === "kickstarter"
                  ? "Für deine Kickstarter-Kampagne"
                  : "Für ein Restaurant deiner Wahl*"}
              </span>
              {clickType === "essen" && (
                <span>
                  * Wenn du magst natürlich auch einen Teil für deine Kampagne
                </span>
              )}
              <span className="goldConfetti">
                <ConfettiExplosion
                  colors={["#B38930", "#FDF452", "#EDC845", "#FBE84F"]}
                  particleSize={35}
                  floorWidth={1200}
                  floorHeight={900}
                  force={1}
                />
              </span>
            </>
          ) : (
            <img src="/box.png" alt="?" />
          )}
        </div>

        <div className="buttonWrapper">
          <button
            className={`button blue ${clickType === "essen" && "active"}`}
            onClick={(e) => handleFire(e, "essen")}
            disabled={clickType === "kickstarter"}
          >
            Essen
            {clickType === "essen" ? "!" : "?"}
          </button>
          <button
            className={`button red ${clickType === "kickstarter" && "active"}`}
            onClick={(e) => handleFire(e, "kickstarter")}
            disabled={clickType === "essen"}
          >
            Zocken{clickType === "kickstarter" ? "!" : "?"}
          </button>
        </div>
      </main>
    </div>
  );
}
