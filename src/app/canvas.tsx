import { useRef, useEffect } from 'react';
import styles from './page.module.css';
import { direction, charge } from './helper';

type directionOrNull = direction | null;

function draw_diagram(canvas:HTMLCanvasElement, field: directionOrNull, current: directionOrNull, force: directionOrNull, charge: charge | null) {
  function draw_arrow(fromx: number, fromy: number, tox: number, toy: number) {
    ctx.beginPath();
    const headlen = 8; // length of head in pixels
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.stroke();
  }

  function draw_field() {
    function draw_circles
    switch (field) {
      case "left":
        console.log("unimplemenmted");
        break;
      case "right":
        console.log("unimplemenmted");
        break;
      case "up":
        console.log("unimplemenmted");
        break;
      case "down":
        console.log("unimplemenmted");
        break;
      case "in the page":
        console.log("unimplemenmted");
        break;
      case "out the page":
        console.log("unimplemenmted");
        break;
    }

    return;
  }

  function draw_current() {

  }

  function draw_force() {

  }

  function draw_particle() {

  }

  // ive asserted it's not null, but i still check for it. It's just to get rid of the errors above.
	const ctx = canvas.getContext("2d")!;

  if (!ctx) {
    throw new Error("The canvas doesn't exist");
  }


  const centre: [number, number] = [canvas.width / 2, canvas.height / 2];

	ctx.font = "20px Helvetica";
	ctx.textBaseline = "middle";
	ctx.textAlign = "center";
	ctx.fillStyle = "#FFFFFF";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";
    
}

export default function Canvas({
  field,
  current,
  force,
  charge
}: {
  field: directionOrNull,
  current: directionOrNull,
  force: directionOrNull,
  charge: charge | null
}) {

  const canvasRef = useRef(null);
  
  useEffect(() => {
    draw_diagram(canvasRef.current!, field, current, force, charge);
  }, [field, current, force, charge]);
  
  return (
  <canvas ref={canvasRef} className={styles.canvas} width="1200" height="600">
    <p> There is supposed to be a diagram here, but it doesn&apos;t work on your device for some reason. </p>
    <p> I don&apos;t take engineering, so you might have to ask me to fix it otherwide I wont notice. </p>
    </canvas>
  )
}