import { useRef, useEffect } from 'react';
import styles from './page.module.css';
import { direction, charge } from './helper';

type directionOrNull = direction | null;

function deg_to_rad(x: number) {
	return x * (Math.PI / 180);
}

function draw_diagram(canvas:HTMLCanvasElement, field: directionOrNull, current: directionOrNull, force: directionOrNull, charge: charge | null) {
	function draw_line(x1:number, y1:number, x2:number, y2:number) {
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}
  
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

	function draw_stroke_circle(x: number, y: number, radius: number) {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.stroke();
	}

	function draw_fill_circle(x: number, y: number, radius: number)  {
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.fill();
	}

  function draw_x(x: number, y: number, radius: number)  {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(deg_to_rad(45));
    draw_line(0, -radius, 0, radius);
    draw_line(-radius, 0, radius, 0);
    ctx.restore();
	}

  function draw_field() {
    function draw_circle_in_page(x: number, y: number, radius: number) {
      draw_stroke_circle(x, y, radius);
      draw_fill_circle(x, y, radius / 5);
    }

    function draw_circle_out_page(x: number, y: number, radius: number) {
      draw_stroke_circle(x, y, radius);
      draw_x(x, y, radius);
    }

    function draw_circles(spacing: number,
                          radius: number,
                          draw_circle: (x:number, y: number, radius: number) => void) {
      ctx.save();
      // these are just used to keep track of how much its been offset so far.
      // don't actully use them when translating, apart from the one there.
      const initial_offset: [number, number] = [radius + 5, radius + 5];

      let total_x_offset = initial_offset[0];
      let total_y_offset = initial_offset[1];
      ctx.translate(...initial_offset);
    
      while (total_y_offset < canvas.height) {
        // each column
        ctx.save();
        while (total_x_offset < canvas.width) {
          // each row
          draw_circle(0, 0, radius);
          ctx.translate(spacing, 0);
          total_x_offset += spacing;
        }
        ctx.restore();
        ctx.translate(0, spacing);
        total_x_offset = initial_offset[0];
        total_y_offset += spacing;
      }
      ctx.restore();
    }

    const margin: [number, number] = [15, 15];

    function draw_arrows_vertically(offset: number, reverse:boolean) {
      ctx.save();
      const arrow_length = canvas.height - 2 * margin[1];
      let total_x_offset = margin[0];
      ctx.translate(...margin);

      while (total_x_offset < canvas.width - margin[0]) {
        if (reverse) {
          draw_arrow(0, arrow_length, 0, 0);
        } else {
          draw_arrow(0, 0, 0, arrow_length);
        }
        ctx.translate(offset, 0); 
        total_x_offset += offset;
      }
    }

    function draw_arrows_horizontally(offset: number, reverse: boolean) {
      ctx.save();
      const arrow_length = canvas.width - 2 * margin[0]
      let total_y_offset = margin[1];
      ctx.translate(...margin);
    
      while (total_y_offset < canvas.height - margin[1]) {
        if (reverse) {
          draw_arrow(arrow_length, 0, 0, 0);
        } else {
          draw_arrow(0, 0, arrow_length, 0); 
        }
        ctx.translate(0, offset); 
        total_y_offset += offset;
      }
      ctx.restore();
    }

    ctx.save();
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "blue";
    switch (field) {
      case "left":
        draw_arrows_horizontally(100, true);
        break;
      case "right":
        draw_arrows_horizontally(100, false);
        break;
      case "up":
        draw_arrows_vertically(100, true);
        break;
      case "down":
        draw_arrows_vertically(100, false);
        break;
      case "in the page":
        draw_circles(100, 15, draw_circle_in_page);
        break;
      case "out the page":
        draw_circles(100, 15, draw_circle_out_page);
        break;
    }
    ctx.restore();
    return;
  }

  function draw_current() {

  }

  function draw_force() {

  }

  function draw_particle() {
    function draw_charge
    function draw_particle
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
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "#000000";

  draw_field();
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