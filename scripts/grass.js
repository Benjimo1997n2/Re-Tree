const generateGrass = function(scene, ground) {
    // Grass from https://playground.babylonjs.com/#NZDFUB#1

    // Create a grass material
    const grassMaterial = new BABYLON.StandardMaterial("grassMaterial", scene);

    // Load the grass texture
    const grassTexture = new BABYLON.Texture("./assets/grass.jpeg", scene);
    grassMaterial.diffuseTexture = grassTexture;

    // Set the specular color to black to remove shininess
    grassMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    
    // // Apply the grass material to the ground mesh
    ground.material = grassMaterial;

    BABYLON.Effect.ShadersStore['grassVertexShader'] = `
        precision highp float;

        attribute vec3 position;
        attribute vec2 uv;
        attribute vec4 color;

        
        uniform mat4 viewProjection;
        uniform mat4 worldViewProjection;

        uniform vec3 spherePosition;

        uniform float time;
        attribute float frequency;
        attribute float waveLength;
        attribute float waveSize;

        uniform float radius;
        uniform float yOffset;
        uniform float maxWidth;

        varying vec4 vColor;

        #include<instancesDeclaration>

        void main(void) {
            #include<instancesVertex>
            vec3 pos = position;
            vec4 worldPos = finalWorld * vec4(pos,1.0);
            
            //https://www.reddit.com/r/Unity3D/comments/6re9e5/using_vertex_animation_shaders_to_make_grass_and/
            pos.x += sin((color.r + time * frequency) / waveLength) * waveSize;

            //https://gist.github.com/ArieLeo/df86a89eae57536c9f51620b70dec337
            float dis = distance(spherePosition, worldPos.xyz); // distance for radius
            float dradius = 1. - clamp(dis/radius, 0.0, 1.0); // in world radius based on objects interaction radius
            vec3 sphereDisp = worldPos.xyz-spherePosition; // position comparison
            sphereDisp *= dradius; // position multiplied by radius for falloff
            pos.xz += clamp(sphereDisp.xz * step(yOffset, color.r), -maxWidth,maxWidth);// vertex movement based on falloff and clamped
            gl_Position = viewProjection * finalWorld * vec4(pos.xyz,2.0);
            vColor = color;
            vColor.g = vColor.r;
            vColor.r = 0.2;
        }
    `;
    BABYLON.Effect.ShadersStore['grassFragmentShader'] = `
        precision highp float;

        varying vec4 vColor;

        void main(void) {
            gl_FragColor = vColor;
        }
    `;

    const shaderMaterial = new BABYLON.ShaderMaterial("grassMaterial", scene, "grass",
    {
        attributes: ["position", "normal", "uv", "color", "frequency", "waveLength", "waveSize"],
        uniforms: ["world", "worldView",  "worldViewProjection", "view", "projection", "viewProjection", "radius", "yOffset", "maxWidth"]
    });


    var assetsManager = new BABYLON.AssetsManager(scene);

    var meshTask = assetsManager.addMeshTask("task", "", "https://raw.githubusercontent.com/RaggarDK/Baby/baby/", "grass.babylon");

    meshTask.onSuccess = function (task) {
        const grassMesh = task.loadedMeshes[0];
        grassMesh.material = shaderMaterial;
        const numInstances = 15000;
        const bufferMatrices = new Float32Array(16 * numInstances);
        const bufferFrequency = new Float32Array(numInstances);
        const bufferWaveLength = new Float32Array(numInstances);
        const bufferWaveSize = new Float32Array(numInstances);
        for(let i=0;i<numInstances;++i){
            const matrix = BABYLON.Matrix.Translation(Math.random()*10-5, 0, Math.random()*10-5);
            matrix.copyToArray(bufferMatrices, i*16);
            bufferFrequency[i] = 0.008 + (Math.random() - 0.5) / 400;
            bufferWaveLength[i] = 0.05 + (Math.random() - 0.5) / 40;
            bufferWaveSize[i] = 0.02 + (Math.random() - 0.5) / 80;
        }

        grassMesh.thinInstanceSetBuffer("matrix", bufferMatrices);
        grassMesh.thinInstanceSetBuffer("frequency", bufferFrequency, 1);
        grassMesh.thinInstanceSetBuffer("waveLength", bufferWaveLength, 1);
        grassMesh.thinInstanceSetBuffer("waveSize", bufferWaveSize, 1);

        let frequency = 0.008;
        let waveLength = 0.05;
        let waveSize = 0.02;

        let radius = 1.0;
        let yOffset = 0.2;
        let maxWidth = 0.5;

        //shaderMaterial.setFloat("frequency", frequency);
        //shaderMaterial.setFloat("waveLength", waveLength);
        //shaderMaterial.setFloat("waveSize", waveSize);

        shaderMaterial.setFloat("radius", radius);
        shaderMaterial.setFloat("yOffset", yOffset);
        shaderMaterial.setFloat("maxWidth", maxWidth);

        let time = 0;
        scene.registerBeforeRender((e) => {
            time += e.deltaTime ? e.deltaTime*0.01 : 0; 
            // shaderMaterial.setVector3("spherePosition", sphere.position);
            shaderMaterial.setFloat("time", time);
            
        });
    }

    assetsManager.load();
}