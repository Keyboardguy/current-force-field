"use client"
import styles from '../../styles/page.module.css';
import { useState } from 'react';
import Canvas from './canvas';
import { direction, charge } from './helper';

type directionOrNull = direction | null;
type chargeOrNull = charge | null;

function Header() {
  return <h1>PAIN</h1>
}

function Details({
  field, 
  current,
  force,
  charge, 
  handleFieldChange,
  handleCurrentChange,
  handleForceChange,
  handleChargeChange
}: {
  field: directionOrNull,
  current: directionOrNull,
  force: directionOrNull,
  charge: chargeOrNull,
  handleFieldChange: (x:directionOrNull) => void;
  handleForceChange: (x:directionOrNull) => void;
  handleCurrentChange: (x:directionOrNull) => void;
  handleChargeChange: (x:chargeOrNull) => void;
}) {
  const used_directions = [field, current, force];
  return (
    <div>
      <p> 
        <label htmlFor="field">Magnetic field:</label>
        <UniqueDirectionSelect id="field"
                               used_directions={used_directions}
                               selected={field}
                               onChange={handleFieldChange} />
      </p>
  
      <p> 
        <label htmlFor="current">Current:</label>
        <UniqueDirectionSelect id="current"
                               used_directions={used_directions}
                               selected={field}
                               onChange={handleFieldChange} />
      </p>
      
      <p> 
        <label htmlFor="force">Force:</label>
        <UniqueDirectionSelect id="force"
                               used_directions={used_directions}
                               selected={field}
                               onChange={handleFieldChange} />
      </p>
    </div> 
   )
}

function UniqueDirectionSelect({
   used_directions, 
   selected,
   onChange,
   id
}: {
   used_directions: (directionOrNull)[],
   selected: directionOrNull,
   onChange: (x: directionOrNull) => void,
   id: string
  }) {
  return (
    <select aria-label="select a direction"
            value={selected ?? ""}
            onChange={e => e.target.value === "" 
                           ? onChange(null) 
                           : onChange(e.target.value as direction)} 
            required 
            id={id}>
      <option value=""></option>
      <AvailableDirections used_directions={used_directions} />
    </select>
  )
}

type linked_direction = [direction, direction];

function create_linked_direction(x:direction, y:direction): linked_direction {
  return [x,y];
}
function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function AvailableDirections({ used_directions }: { used_directions: (directionOrNull)[] }) {
  const linked_directions = [ 
    create_linked_direction("left", "right"),
    create_linked_direction("up", "down"),
    create_linked_direction("out the page", "in the page")
  ]

  let available = "";

  for (const ld of linked_directions) {
    if (!(used_directions.includes(ld[0]) || used_directions.includes(ld[1]))) {
      available += (
        <>
          <option key={ld[0]} value={ld[0]}>{capitalize(ld[0])}</option>
          <option key={ld[1]} value={ld[1]}>{capitalize(ld[1])}</option>
        </>
      )
    }
  }

  return available;
}

export default function App() {
  const [field, setField] = useState<directionOrNull>(null);
  const [current, setCurrent] = useState<directionOrNull>(null);
  const [force, setForce] = useState<directionOrNull>(null);
  const [charge, setCharge] = useState<chargeOrNull>(null);


  return (
    <main className={styles.main}>
      <Header />
      <Canvas field={field} force={force} current={current} charge={charge} />
      <Details 
        field={field}
        current={current}
        force={force}
        charge={charge}
        handleFieldChange={(d:directionOrNull) => setField(d)}
        handleCurrentChange={(d:directionOrNull) => setCurrent(d)}
        handleForceChange={(d:directionOrNull) => setForce(d)}
        handleChargeChange={(charge:chargeOrNull) => setCharge(charge)}
      />
    </main>
  )
}


