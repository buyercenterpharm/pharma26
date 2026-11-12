import * as THREE from 'three';

// Symbolic great-circle-like paths; these are not offices, partners or shipping lanes.
const routes = [
  [[18,-75],[38,35]], [[-18,-48],[48,5]], [[52,-105],[20,70]],
  [[-25,20],[42,98]], [[38,35],[-10,110]], [[5,-25],[50,80]],
  [[30,-110],[-20,35]], [[-35,145],[30,75]], [[55,-20],[0,50]],
];
const ease = (a:number,b:number,t:number) => THREE.MathUtils.smoothstep(t,a,b);
function point(lat:number,lon:number,r=2) {
  const phi=THREE.MathUtils.degToRad(90-lat), theta=THREE.MathUtils.degToRad(lon+180);
  return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta),r*Math.cos(phi),r*Math.sin(phi)*Math.sin(theta));
}
function glowTexture() {
  const canvas=document.createElement('canvas'); canvas.width=canvas.height=64;
  const ctx=canvas.getContext('2d')!;
  const gradient=ctx.createRadialGradient(32,32,0,32,32,32);
  gradient.addColorStop(0,'rgba(255,244,212,1)'); gradient.addColorStop(.15,'rgba(244,213,153,.9)');
  gradient.addColorStop(.45,'rgba(198,166,106,.18)'); gradient.addColorStop(1,'rgba(198,166,106,0)');
  ctx.fillStyle=gradient;ctx.fillRect(0,0,64,64);
  return new THREE.CanvasTexture(canvas);
}

export async function createGlobeScene(host:HTMLElement, signal:AbortSignal, onFailure:()=>void) {
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.4;
  renderer.setClearColor(0x0a192f,0);
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(42,1,.1,50);
  const globe=new THREE.Group();scene.add(globe);
  let frame=0,disposed=false;
  const textures:THREE.Texture[]=[];
  const geometries:THREE.BufferGeometry[]=[];
  const materials:THREE.Material[]=[];
  const geometry=<T extends THREE.BufferGeometry>(value:T)=>{geometries.push(value);return value;};
  const material=<T extends THREE.Material>(value:T)=>{materials.push(value);return value;};
  function dispose() {
    if(disposed)return; disposed=true;cancelAnimationFrame(frame);
    resizeObserver.disconnect();renderer.domElement.removeEventListener('webglcontextlost',lost);
    textures.forEach(t=>t.dispose());geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());
    renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
    signal.removeEventListener('abort',dispose);
  }
  function lost(event:Event){event.preventDefault();onFailure();dispose();}
  renderer.domElement.addEventListener('webglcontextlost',lost);
  const resize=()=>{const {width,height}=host.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();};
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  signal.addEventListener('abort',dispose,{once:true});
  if(signal.aborted){dispose();throw new Error('Cancelled');}
  try {
    const loader=new THREE.TextureLoader();
    const load=async(url:string)=>{const texture=await loader.loadAsync(url);if(disposed){texture.dispose();throw new Error('Cancelled');}textures.push(texture);return texture;};
    const [map,bump]=await Promise.all([load('/textures/earth-land.webp'),load('/textures/earth-relief.png')]);
    map.colorSpace=THREE.SRGBColorSpace;map.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
    const surface=material(new THREE.MeshStandardMaterial({map,bumpMap:bump,bumpScale:.035,roughness:.55,metalness:.42}));
    globe.add(new THREE.Mesh(geometry(new THREE.SphereGeometry(2,96,64)),surface));
    scene.add(new THREE.AmbientLight(0x8cabc5,.45));
    const key=new THREE.DirectionalLight(0xffe5b0,4.5);key.position.set(-3,4,4);scene.add(key);
    const edge=new THREE.DirectionalLight(0x7898c5,2);edge.position.set(4,0,-3);scene.add(edge);
    const atmosphere=material(new THREE.ShaderMaterial({
      uniforms:{tint:{value:new THREE.Color('#C6A66A')}},transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.BackSide,
      vertexShader:'varying vec3 n; varying vec3 v; void main(){ vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal); v=normalize(-p.xyz); gl_Position=projectionMatrix*p; }',
      fragmentShader:'varying vec3 n; varying vec3 v; uniform vec3 tint; void main(){ float rim=pow(1.-abs(dot(normalize(n),normalize(v))),3.5); gl_FragColor=vec4(tint,rim*.2); }',
    }));
    globe.add(new THREE.Mesh(geometry(new THREE.SphereGeometry(2.025,64,48)),atmosphere));
    const glow=glowTexture();textures.push(glow);
    const paths=routes.map(([from,to],index)=>{
      const a=point(...from as [number,number]),b=point(...to as [number,number]);
      const points=Array.from({length:97},(_,i)=>{const t=i/96;return a.clone().lerp(b,t).normalize().multiplyScalar(2.025+Math.sin(Math.PI*t)*(.22+index%3*.09));});
      const path=geometry(new THREE.BufferGeometry().setFromPoints(points));path.setDrawRange(0,0);
      const ink=material(new THREE.LineBasicMaterial({color:0xdcbf83,transparent:true,opacity:0}));
      globe.add(new THREE.Line(path,ink));
      const spark= new THREE.Sprite(material(new THREE.SpriteMaterial({map:glow,color:0xffe0a2,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0})));
      spark.scale.setScalar(.18);globe.add(spark);
      return {path,ink,spark,points,index};
    });
    // Deterministic ambient dust, without external textures or a particle engine.
    const dustPositions=new Float32Array(90*3);
    for(let i=0;i<90;i++){const angle=i*2.399963;dustPositions[i*3]=Math.cos(angle)*(3+i%7*.45);dustPositions[i*3+1]=Math.sin(angle)*(2+i%5*.35);dustPositions[i*3+2]=-2-(i%9)*.5;}
    const dustGeometry=geometry(new THREE.BufferGeometry());dustGeometry.setAttribute('position',new THREE.BufferAttribute(dustPositions,3));
    const dust=new THREE.Points(dustGeometry,material(new THREE.PointsMaterial({map:glow,color:0xc6a66a,size:.035,transparent:true,opacity:.6,depthWrite:false,blending:THREE.AdditiveBlending})));scene.add(dust);
    host.append(renderer.domElement);resize();
    camera.position.set(.35,.3,8.3);camera.lookAt(0,0,0);
    globe.rotation.set(.08,-.35,-.12);
    renderer.render(scene,camera);
    let started=0,previous=0,slowFrames=0;
    function tick(now:number){
      if(disposed)return;
      if(!started)started=now; const t=(now-started)/1000;
      if(previous && now-previous>110)slowFrames++;else slowFrames=Math.max(0,slowFrames-1);previous=now;
      if(slowFrames>10){onFailure();dispose();return;}
      const convergence=ease(3,4.45,t);
      globe.rotation.y=-.35+t*.055;globe.rotation.z=-.12+t*.008;
      camera.position.set(.35*(1-convergence),.3-.15*convergence,8.3-.6*ease(0,3,t)-.65*convergence);camera.lookAt(0,0,0);
      paths.forEach(({path,ink,spark,points,index})=>{
        const reveal=ease(1.3+index*.075,2.4+index*.075,t);
        path.setDrawRange(0,Math.floor(reveal*97));ink.opacity=.8*reveal;
        const step=((Math.max(0,t-1.35-index*.075)*.4)%1)*96;
        const position=points[Math.min(96,Math.floor(step))].clone();
        // Arcs retain their geometry; luminous heads converge toward camera-facing center.
        const target=new THREE.Vector3(0,0,2.5).applyAxisAngle(new THREE.Vector3(0,1,0),-globe.rotation.y);
        position.lerp(target,convergence);spark.position.copy(position);spark.material.opacity=reveal*(1-.6*convergence);
        spark.scale.setScalar(.1+.1*convergence);
      });
      dust.rotation.z=t*.008;
      key.intensity=4.5+convergence*1.2;
      renderer.render(scene,camera);
      frame=requestAnimationFrame(tick);
    }
    return {start:()=>{if(!disposed)frame=requestAnimationFrame(tick);},dispose};
  }catch(error){dispose();throw error;}
}
