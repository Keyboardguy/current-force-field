import { useRef, useEffect } from 'react';
import styles from '../../styles/page.module.css';
import { direction, charge } from './helper';

type directionOrNull = direction | null;


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
    
   // useEffect(() => {
  //    draw_diagram(canvasRef.current, data);
  //  }, [data]);
    
    return (
		<canvas ref={canvasRef} className={styles.canvas} width="1200" height="600">
			<p> There is supposed to be a diagram here, but it doesn&apos;t work on your device for some reason. </p>
			<p> I don&apos;t take engineering, so you might have to ask me to fix it otherwide I wont notice. </p>
	    </canvas>
    )
}