import * as THREE from 'three';
import Camera from './Camera';
import Renderer from './Renderer';
import Resources from './Utils/Resources';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import World from './World/World';
import sources from './sources';

let instance = null;

export default class Experience {
    constructor (canvas) {
        if (instance) {
            return instance;
        }

        instance = this;

        this.canvas = canvas;
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.resources = new Resources(sources);
        this.camera = new Camera();
        this.world = new World();
        this.renderer = new Renderer();

        this.sizes.on('resize', () => {
            this.resize();
        });

        this.time.on('tick', () => {
            this.update();
        });
    }
    resize() {
        this.camera.resize();
        this.renderer.resize();
    }
    update() {
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }
}