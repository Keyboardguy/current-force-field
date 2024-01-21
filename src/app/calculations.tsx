import { direction, charge } from './helper';

interface vector3d {
    x: number;
    y: number;
    z: number;
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

function get_vector_direction(v: vector3d): direction {
    if (v.x === 1) {
        return "right";
    } else if (v.x === -1) {
        return "left";
    } else if (v.y === 1) {
        return "up";
    } else if (v.y === -1) {
        return "down";
    } else if (v.z === 1) {
        return "out the page";
    } else if (v.z === -1) {
        return "in the page";
    } else {
        throw new Error("The vector is malformed - " + v);
    }
}

// a = magnetic field, b = current, a x b (cross product) = force/
// z axis is positive out the monitor. 

const a = create_vector3d(0,0,1)
const b = create_vector3d(1,0,0);
const c = create_vector3d(0,1,0);

function test_function(): void {
    console.log(cross_product(b,c));
}

export default test_function;