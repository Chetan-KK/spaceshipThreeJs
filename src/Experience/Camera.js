import * as THREE from 'three';
import Experience from './Experience';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Camera {
    constructor () {
        this.experience = new Experience();

        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;

        this.setInstance();
        this.setOrbitControls();
    }
    setInstance() {
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height);
        this.instance.position.set(0, 2, 4);
        this.experience.scene.add(this.instance);
    }
    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.experience.canvas);
        this.controls.enableDamping = true;
    }
    resize() {
        this.instance.aspect = this.sizes.aspect;
        this.instance.updateProjectionMatrix();
    }
    update() {
        this.controls.update();
    }
}