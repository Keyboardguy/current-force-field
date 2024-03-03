"use client"
import styles from './page.module.css';
import { useState } from 'react';
import Canvas from './canvas';
import { direction, charge } from './helper';
import get_missing_vector from './calculations';

type directionOrNull = direction | null;
type chargeOrNull = charge | null;
type linkedDirection = [direction, direction];

const linkedDirections = [ 
  createLinkedDirection("left", "right"),
  createLinkedDirection("up", "down"),
  createLinkedDirection("out the page", "in the page")
]

function createLinkedDirection(x:direction, y:direction): linkedDirection {
  return [x,y];
}

function Header() {
  return <h1>Right hand rule calculator</h1>
}

function Details({
  field, 
  current,
  force,
  charge, 
  handleFieldChange,
  handleCurrentChange,
  handleForceChange,
  handleChargeChange,
  calculateMissingVector
}: {
  field: directionOrNull,
  current: directionOrNull,
  force: directionOrNull,
  charge: chargeOrNull,
  handleFieldChange: (x:directionOrNull) => void,
  handleForceChange: (x:directionOrNull) => void,
  handleCurrentChange: (x:directionOrNull) => void,
  handleChargeChange: (x:chargeOrNull) => void,
  calculateMissingVector: () => void
}) {
  const usedDirections = [field, current, force];
  return (
    <div className={styles.twoBoxSplit}>
      <div>
        <p className={styles.valueSelect}> 
          <label htmlFor="field">Magnetic field:</label>
          <UniqueDirectionSelect id="field"
                                usedDirections={usedDirections}
                                selected={field}
                                onChange={handleFieldChange} />
        </p>
    
        <p className={styles.valueSelect}> 
          <label htmlFor="current">Current:</label>
          <UniqueDirectionSelect id="current"
                                usedDirections={usedDirections}
                                selected={current}
                                onChange={handleCurrentChange} />
        </p>
        
        <p className={styles.valueSelect}> 
          <label htmlFor="force">Force:</label>
          <UniqueDirectionSelect id="force"
                                usedDirections={usedDirections}
                                selected={force}
                                onChange={handleForceChange} />
        </p>
        <p className={styles.valueSelect}> 
          <label htmlFor="charge">Charge:</label>
          <select aria-label="select a charge"
                  value={charge ?? ""}
                  onChange={e => e.target.value === "" 
                                ? handleChargeChange(null) 
                                : handleChargeChange(e.target.value.toLowerCase() as charge)}>
            <option value="">?</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
          </select>
        </p>
      </div>
      <div>
        <p>
          <CalculateButton calculateMissingVector={calculateMissingVector} />
        </p>
        
        <p>
          <RandomCombinationButton
            handleChargeChange={handleChargeChange}
            handleForceChange={handleForceChange}
            handleFieldChange={handleFieldChange}
            handleCurrentChange={handleCurrentChange}
          />
        </p>
      </div>
    </div> 
   )
}

function CalculateButton({ calculateMissingVector }: { calculateMissingVector: () => void }) {
  return <button onClick={calculateMissingVector} className={styles.bigButton}>
    Calculate missing thing
  </button>
} 

function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray<Type>(array: Type[]): Type[]  {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
  }
  return shuffledArray;
}

function RandomCombinationButton({ 
  handleFieldChange,
  handleCurrentChange,
  handleForceChange,
  handleChargeChange,
}: {
  handleFieldChange: (x:directionOrNull) => void,
  handleForceChange: (x:directionOrNull) => void,
  handleCurrentChange: (x:directionOrNull) => void,
  handleChargeChange: (x:chargeOrNull) => void,
}) {
  return (
  <button onClick={() => setRandomCombination(handleFieldChange, handleForceChange, handleCurrentChange, handleChargeChange)} className={styles.bigButton}>
    Generate random combination
  </button>)
}


function setRandomCombination(
  handleFieldChange: (x:directionOrNull) => void,
  handleForceChange: (x:directionOrNull) => void,
  handleCurrentChange: (x:directionOrNull) => void,
  handleChargeChange: (x:chargeOrNull) => void,
) {
  const randomChoices = shuffleArray(linkedDirections.map(linked_direction => linked_direction[randomInt(0,1)]));
  const excludedChoice = randomInt(0,3);
  const choiceOrder = [
    handleFieldChange,
    handleCurrentChange,
    handleForceChange]

  for (let i = 0; i < 3; i++) {
    if (i === excludedChoice) {
      choiceOrder[i](null);
    } else {
      choiceOrder[i](randomChoices[i]);
    }
  }

  if (excludedChoice === 3) {
    handleChargeChange(null);
  } else {
    handleChargeChange(randomInt(0,1) === 0 ? "negative" : "positive");
  }
}


function UniqueDirectionSelect({
   usedDirections, 
   selected,
   onChange,
   id
}: {
   usedDirections: (directionOrNull)[],
   selected: directionOrNull,
   onChange: (x: directionOrNull) => void,
   id: string
  }) {
  return (
    <select aria-label="select a direction"
            value={selected ?? ""}
            onChange={e => e.target.value === "" 
                           ? onChange(null) 
                           : onChange(e.target.value.toLowerCase() as direction)} 
            required 
            id={id}>
      <option value="">?</option>
      <AvailableDirections usedDirections={usedDirections} selected={selected} />
    </select>
  )
}

function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function AvailableDirections({ usedDirections, selected }: { usedDirections: (directionOrNull)[], selected: directionOrNull }) {
  let available: JSX.Element[] = [];

  // the selected one needs to be an option.

  for (const ld of linkedDirections) {
    // if the direction pair has not been used already, or if the selected direction is in the direction pair
    // im ignoring the error since it doesnt matter if selected is null or not.
    if (!(usedDirections.includes(ld[0]) || usedDirections.includes(ld[1])) || (selected && ld.includes(selected))) {
      available.push(<option key={ld[0]} value={ld[0]}>{capitalize(ld[0])}</option>);
      available.push(<option key={ld[1]} value={ld[1]}>{capitalize(ld[1])}</option>);
    }
  }

  return available;
}

export default function App() {
  const [field, setField] = useState<directionOrNull>(null);
  const [current, setCurrent] = useState<directionOrNull>(null);
  const [force, setForce] = useState<directionOrNull>(null);
  const [charge, setCharge] = useState<chargeOrNull>(null);

  function calculate_missing_vector() {
    const missing_vector = get_missing_vector(field, current, force, charge);

    switch (missing_vector[0]) {
      case "none":
        return;
      case "force":
        setForce(missing_vector[1]);
        break;
      case "charge":
        setCharge(missing_vector[1]);
        break;
      case "current":
        setCurrent(missing_vector[1]);
        break;
      case "field":
        setField(missing_vector[1]);
        break;
    }
  }

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
        calculateMissingVector={calculate_missing_vector}
      />
    </main>
  )
}


