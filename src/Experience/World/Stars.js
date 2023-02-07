import * as THREE from 'three';
import Experience from '../Experience';

export default class Stars {
    constructor () {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.count = 1000;
        this.multiplier = 40;

        this.setStars();
    }
    setStars() {
        this.starsGeometry = new THREE.BufferGeometry();

        this.starsMaterial = new THREE.PointsMaterial({
            size: .4,
            color: 0xffffff,
            transparent: true,
            alphaMap: this.resources.items["starTexture"],
            depthWrite: false
        });

        this.starsPosition = new Float32Array(this.count * 3);

        for (let i = 0; i < this.count; i++) {
            this.starsPosition[i * 3] = (Math.random() - .5) * this.multiplier;
            this.starsPosition[i * 3 + 1] = (Math.random() - .5) * this.multiplier;
            this.starsPosition[i * 3 + 2] = (Math.random() - .5) * this.multiplier;
        }

        this.attribute = new THREE.BufferAttribute(this.starsPosition, 3);

        this.starsGeometry.setAttribute('position', this.attribute);

        this.stars = new THREE.Points(this.starsGeometry, this.starsMaterial);

        this.scene.add(this.stars);
    }
    update() {
        this.stars.rotation.y = this.time.elapsed / 8000;
    }
}