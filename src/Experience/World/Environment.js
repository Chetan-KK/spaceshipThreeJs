import * as THREE from 'three';
import Experience from '../Experience';
import Lights from './Lights';
import Blooms from './Blooms';

export default class Environment {
    constructor () {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;

        this.lights = new Lights();
        this.blooms = new Blooms();
        this.setEnvironmentMap();
    }
    setEnvironmentMap() {
        this.environmentMap = {
            texture: this.resources.items['environmentMapTexture'],
            intensity: .5
        };
        this.scene.environment = this.environmentMap.texture;

        this.setEnvironmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture;
                    child.material.envMapIntensity = this.environmentMap.intensity;
                    child.material.needsUpdate = true;
                }
            });
        };

        this.setEnvironmentMap.updateMaterials();
    }
    update() {
        this.lights.update();
        // this.blooms.update();
    }
}