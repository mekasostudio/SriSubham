import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import modelAsset from '@/assets/bunk-bed.asset.json';

type Vec = [number, number, number];
type Palette = { wall:string;wood:string;sage:string;linen:string;light:string;metal:string };
function Box({ size, at, color, map }: { size: Vec; at: Vec; color: string; map?: THREE.Texture }) {
  return <mesh position={at} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} map={map ?? null} roughness={0.85}/></mesh>;
}
function Bunk({ x }: { x: number }) {
  const { scene } = useGLTF(modelAsset.url);
  const clone = useMemo(() => {
    const object = scene.clone(true);
    const box = new THREE.Box3().setFromObject(object);
    const center = box.getCenter(new THREE.Vector3());
    object.position.set(-center.x, -box.min.y, -center.z);
    object.traverse(o => { if (o instanceof THREE.Mesh) { o.castShadow = true; o.receiveShadow = true; } });
    return object;
  }, [scene]);
  return <group position={[x,0.06,-0.1]}><primitive object={clone}/></group>;
}
function Architecture({ palette }: { palette: Palette }) {
  const room = useRef<THREE.Group>(null);
  const reduced = useRef(false);
  const scroll = useRef(0);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { reduced.current = media.matches; };
    const onScroll = () => { scroll.current = Math.min(window.scrollY / 650, 1); };
    update(); media.addEventListener('change',update); window.addEventListener('scroll',onScroll,{ passive:true });
    return () => { media.removeEventListener('change',update); window.removeEventListener('scroll',onScroll); };
  },[]);
  useFrame(({ pointer, gl }, delta) => {
    if (!room.current) return;
    const damp = 1-Math.exp(-3*Math.min(delta,0.05));
    room.current.rotation.y += ((reduced.current ? 0 : pointer.x*0.09 + scroll.current*0.10)-room.current.rotation.y)*damp;
    room.current.rotation.x += ((reduced.current ? 0 : -pointer.y*0.025)-room.current.rotation.x)*damp;
    gl.domElement.dataset['rotation'] = room.current.rotation.y.toFixed(3);
  });
  const grain = useMemo(() => {
    const canvas = document.createElement('canvas'); canvas.width=512;canvas.height=512;
    const ctx=canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle=palette.wood;ctx.fillRect(0,0,512,512);
      for(let row=0;row<8;row++) { ctx.strokeStyle=palette.metal;ctx.globalAlpha=.28;ctx.strokeRect(0,row*64,512,64);for(let i=0;i<16;i++){ctx.globalAlpha=.035+(i%3)*.02;ctx.beginPath();ctx.moveTo(0,row*64+i*4);ctx.bezierCurveTo(170,row*64+i*4-3,300,row*64+i*4+4,512,row*64+i*4);ctx.stroke();} }
    }
    const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
  },[palette]);
  useEffect(() => () => grain.dispose(),[grain]);
  return <group ref={room} position={[0,-0.9,0]}>
    <Box size={[4.4,.16,3.65]} at={[0,-.02,0]} color={palette.wood} map={grain}/>
    <Box size={[4.4,2.6,.10]} at={[0,1.3,-1.83]} color={palette.wall}/>
    <Box size={[.10,2.6,3.65]} at={[-2.2,1.3,0]} color={palette.wall}/>
    <Box size={[.10,.28,3.65]} at={[2.2,.14,0]} color={palette.wall}/>
    <Box size={[1.4,.025,1.95]} at={[0,.08,.3]} color={palette.sage}/>
    <Box size={[1.75,1.32,.045]} at={[0,1.65,-1.75]} color={palette.light}/>
    <Box size={[.035,1.32,.08]} at={[0,1.65,-1.70]} color={palette.wood}/>
    <Box size={[1.75,.035,.08]} at={[0,1.65,-1.70]} color={palette.wood}/>
    {[-.95,.95].map(x=><Box key={x} size={[.18,1.9,.10]} at={[x,1.47,-1.68]} color={palette.linen}/>)}
    <Suspense fallback={null}><Bunk x={-1.4}/><Bunk x={1.4}/></Suspense>
    <Box size={[1.68,.075,.55]} at={[0,.82,-1.38]} color={palette.wood} map={grain}/>
    {[-.74,.74].map(x=><Box key={x} size={[.065,.8,.065]} at={[x,.4,-1.38]} color={palette.wood}/>)}
    <Box size={[.48,.08,.44]} at={[0,.46,-.94]} color={palette.linen}/>
    <Box size={[.48,.50,.055]} at={[0,.74,-.75]} color={palette.linen}/>
    {[-.19,.19].map(x=><Box key={x} size={[.045,.45,.045]} at={[x,.23,-.94]} color={palette.wood}/>)}
    <Box size={[.68,1.35,.42]} at={[1.7,.72,1.40]} color={palette.wood} map={grain}/>
    {[.38,1.04].map(y=><Box key={y} size={[.015,.012,.44]} at={[1.7,y,1.40]} color={palette.metal}/>)}
    {[.39,1.05].map(y=><Box key={y} size={[.025,.10,.025]} at={[1.93,y,1.62]} color={palette.metal}/>)}
    <mesh position={[-1.82,.22,1.36]} castShadow><cylinderGeometry args={[.17,.12,.32,20]}/><meshStandardMaterial color={palette.wall}/></mesh>
    <mesh position={[-1.82,.61,1.36]}><cylinderGeometry args={[.013,.013,.55,8]}/><meshStandardMaterial color={palette.sage}/></mesh>
    {[0,1,2,3,4,5].map(i=><mesh key={i} position={[-1.82+Math.sin(i*2)*.17,.54+i*.045,1.36+Math.cos(i*2)*.17]} rotation={[.4,i*2,.8]} scale={[.12,.27,.025]} castShadow><sphereGeometry args={[1,12,8]}/><meshStandardMaterial color={palette.sage}/></mesh>)}
    {[-1.4,1.4].flatMap(x=>[.55,1.5].map(y=><mesh key={`${x}-${y}`} position={[x,y,-1.66]}><sphereGeometry args={[.042,12,8]}/><meshStandardMaterial color={palette.light} emissive={palette.light} emissiveIntensity={1.5}/></mesh>))}
  </group>;
}
export default function RoomScene() {
  const [palette,setPalette]=useState<Palette|null>(null);
  useEffect(()=>{
    const css=getComputedStyle(document.documentElement);
    const token=(key:string)=>css.getPropertyValue(`--scene-${key}`).trim();
    setPalette({wall:token('wall'),wood:token('wood'),sage:token('sage'),linen:token('linen'),light:token('light'),metal:token('metal')});
  },[]);
  if(!palette) return null;
  return <Canvas shadows dpr={[1,1.5]} camera={{ position:[6.8,6,9.5],fov:34 }} gl={{ antialias:true,alpha:true }} onCreated={({camera})=>camera.lookAt(0,.15,0)} aria-label="Interactive concept room with two bunk-bed units and four sleeping spaces">
    <ambientLight intensity={.8}/><directionalLight position={[2,7,5]} intensity={2.4} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-left={-5} shadow-camera-right={5} shadow-camera-top={5} shadow-camera-bottom={-5}/>
    <Environment resolution={64}><Lightformer intensity={2} position={[0,5,0]} scale={[10,10,1]}/><Lightformer intensity={1} position={[-5,2,0]} rotation-y={Math.PI/2} scale={[8,5,1]}/></Environment>
    <Architecture palette={palette}/>
  </Canvas>;
}