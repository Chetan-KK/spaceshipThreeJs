import * as THREE from 'three';
import EventEmitter from 'events';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class Resources extends EventEmitter {
    constructor (sources) {
        super();

        this.sources = sources;

        this.items = {};
        this.toLoad = this.sources.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }
    setLoaders() {
        this.loaders = {
            gltfLoader: new GLTFLoader(),
            textureLoader: new THREE.TextureLoader(),
            cubeTextureLoader: new THREE.CubeTextureLoader()
        };
    }
    startLoading() {
        for (const source of this.sources) {
            switch (source.type) {
                case 'texture':
                    this.loaders.textureLoader.load(source.path, (file) => {
                        this.loadedSource(source, file);
                    });
                    break;
                case 'cubeTexture':
                    this.loaders.cubeTextureLoader.load(source.path, (file) => {
                        this.loadedSource(source, file);
                    });
                    break;
                case 'gltfModel':
                    this.loaders.gltfLoader.load(source.path, (file) => {
                        this.loadedSource(source, file);
                    });
                    break;
                default:
                    console.log('wronge type of importing model/ texture');
            }
        }
    }
    loadedSource(source, file) {
        this.items[source.name] = file;

        this.loaded++;

        if (this.loaded === this.toLoad) {
            this.emit('loaded');
        }
    }
}