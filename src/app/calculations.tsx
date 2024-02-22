import { direction, charge } from './helper';

type directionOrNull = direction | null;

interface vector3d {
    x: number;
    y: number;
    z: number;
}

interface unit_vector extends vector3d {
    x: 1 | 0 | -1;
    y: 1 | 0 | -1;
    z: 1 | 0 | -1;
}

type direction_map = {
    [k in direction]: unit_vector;
}


function create_vector3d(x: number, y:number, z:number): vector3d {
    return { x,y,z }
}

function cross_product(a: vector3d, b: vector3d): vector3d {
    return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x
    };
}

function reverse_vector(v: vector3d) {
    v.x = -v.x;
    v.y = -v.y;
    v.z = -v.z;
    return v;
}

const i = { x: 1, y: 0, z: 0 } as unit_vector
const negative_i = { x: -1, y: 0, z: 0 } as unit_vector
const j = { x: 0, y: 1, z: 0 } as unit_vector;
const negative_j = { x: 0, y: -1, z: 0 } as unit_vector;
const k = { x: 0, y: 0, z: 1 } as unit_vector;
const negative_k = {x: 0, y: 0, z: -1 } as unit_vector;

const direction_vector_map: direction_map = {
    "right": i,
    "left": negative_i,
    "up": j,
    "down": negative_j,
    "out the page": k,
    "in the page": negative_k
}


function unit_vector_to_direction(v: unit_vector): direction {
    for (const property in direction_vector_map) {
        if (is_equal_vector(direction_vector_map[property as direction], v)) {
            return property as direction;
        } 
    }
    throw new Error("Invalid unit vector to turn into direction.");
}

function direction_to_unit_vector(d: direction): unit_vector {
    return direction_vector_map[d] ?? Error("An invalid direction somehow was entered."); 
}

function is_equal_vector(a: vector3d, b: vector3d): boolean {
    return a.x === b.x && a.y === b.y && a.z === b.z;
}

function direction_cross_product(a:direction, b:direction): unit_vector {
    // crossing two unit vectors at 90 deg will always end up with a unit vector as well.
    return cross_product(direction_to_unit_vector(a), direction_to_unit_vector(b)) as unit_vector;
}

function generic_find_missing_direction(a: direction, b: direction, charge: charge): direction {
    const result = direction_cross_product(a, b);
    if (charge === "positive") {
        return unit_vector_to_direction(reverse_vector(result) as unit_vector);
    } 
    return unit_vector_to_direction(result);
}

function get_missing_vector(field: directionOrNull, current: directionOrNull,
                            force: directionOrNull, charge: charge | null): ["charge*", charge] | ["field" | "current" | "force", direction] | ["none", null] {
    if ([field, current, force, charge].filter(x => x === null).length !== 1) {
        return ["none", null];
    }  

    if (charge === null) {
        // there is only 1 null. so if charge is null, these three must be not null. likewise with every other thing. this is why im using exclamation marks so wildly.
        return ["charge", is_equal_vector(direction_cross_product(field!, current!), direction_to_unit_vector(force!)) ? "negative" : "positive"];
    } else if (force === null) {
        return ["force", generic_find_missing_direction(field!, current!, charge!)];
    } else if (current === null) {
        return ["current", generic_find_missing_direction(force!, field!, charge!)];
    } else if (field === null) {
        return ["field", generic_find_missing_direction(current!, force!, charge!)];
    }

    return ["none", null];
}

// a = magnetic field, b = current, a x b (cross product) = force/
// z axis is positive out the monitor. 

const a = create_vector3d(0,0,1)
const b = create_vector3d(1,0,0);
const c = create_vector3d(0,1,0);

function test_function(): void {
    console.log(cross_product(b,c));
}

export default get_missing_vector;