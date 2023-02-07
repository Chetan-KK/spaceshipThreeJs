import * as THREE from 'three';
import Experience from './Experience';

export default class Renderer {
    constructor () {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera.instance;

        this.setInstance();
    }
    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.experience.canvas,
            alpha: true,
            antialias: true
        });
        this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        this.instance.toneMapping = THREE.CineonToneMapping;
        this.instance.toneMappingExposure = 1.75;
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFShadowMap;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.render(this.scene, this.camera);
    }
    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
        this.instance.render(this.scene, this.camera);

    }
    update() {
        this.instance.render(this.scene, this.camera);
    }
}