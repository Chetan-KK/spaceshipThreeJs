import * as THREE from 'three';
import { Mesh } from 'three';
import Experience from '../Experience';
import Environment from './Environment';
import Spaceship from './Spaceship';
import Stars from './Stars';

export default class World {
    constructor () {
        this.experience = new Experience();
        this.allLoad = false;
        this.resources = this.experience.resources;


        this.resources.on('loaded', () => {
            this.environment = new Environment();
            this.spaceship = new Spaceship();
            // this.stars = new Stars();
            this.allLoad = true;
        });

    }
    update() {
        if (this.allLoad) {
            this.environment.update();
            this.spaceship.update();
            // this.stars.update();
        }
    }
}