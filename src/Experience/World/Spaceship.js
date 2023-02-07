import * as THREE from 'three';
import Experience from '../Experience';
import gsap from 'gsap';

export default class Spaceship {
    constructor () {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resurces = this.experience.resources;
        this.spaceshipModel = this.resurces.items["mainSpaceshipModel"].scene;

        this.updateMaterial();
        this.setSpaceship();
        this.gsap();
    }
    setSpaceship() {
        this.spaceshipModel.scale.set(.05, .05, .04);
        this.spaceshipModel.position.set(1, 0, 0);
        this.spaceshipModel.rotation.set(0, -1, 0);
        this.scene.add(this.spaceshipModel);
    }
    updateMaterial() {
        this.spaceshipModel.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.material.metalness = 1;
                child.material.roughness = 0;
            }
        });

    }
    update() {
        this.spaceshipModel.rotation.set(0, -1, (Math.sin(this.time.elapsed / 600)) / 45);
    }
    gsap() {
        gsap.from(this.spaceshipModel.position, {
            duration: 4,
            x: 20,
            y: 0,
            z: -15,
            ease: "Power3.easeOut"
        });
    }
}