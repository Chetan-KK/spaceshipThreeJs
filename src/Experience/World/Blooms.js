import * as THREE from 'three';
import Experience from '../Experience';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';

import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader';

export default class Blooms {
    constructor () {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.renderer = this.experience.renderer.instance;
        this.composer = new EffectComposer(this.renderer);
        this.composer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.composer.setSize(this.experience.sizes.width, this.experience.sizes.height);
        this.camera = this.experience.camera.instance;
        this.setBloom();
    }
    setBloom() {
        this.renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(this.renderPass);

        this.glitchPass = new GlitchPass();
        this.glitchPass.enabled = true;
        this.glitchPass.goWild = true;
        this.composer.addPass(this.glitchPass);

        this.bloomPass = new BloomPass();
        this.composer.addPass(this.bloomPass);

        this.luminosityPass = new ShaderPass(LuminosityShader);
        this.composer.addPass(this.luminosityPass);
    }
    update() {
        this.composer.render();
    }
}