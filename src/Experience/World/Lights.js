import * as THREE from 'three';
import Experience from '../Experience';

export default class Lights {
    constructor () {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;


        this.setSunLight();
        this.setAmbientLight();
    }

    setSunLight() {
        this.sunLight = new THREE.DirectionalLight(0xffffff, 1);
        this.sunLight.position.set(-2, 3, -2);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 15;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = .05;

        this.sunligntHelper = new THREE.PointLightHelper(this.sunLight);
        this.scene.add(this.sunLight);
    }
    setAmbientLight() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
        this.scene.add(this.ambientLight);
    };
    update() {

    }
}