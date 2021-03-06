 import * as RODIN from 'rodin/core';
 import {VPcontrolPanel} from './VPcontrolPanel.js';
 RODIN.start();

 let player = new RODIN.MaterialPlayer({
 HD: "https://cdn.rodin.io/resources/video/PedraBonita1k.mp4",
 SD: "https://cdn.rodin.io/resources/video/PedraBonita1k.mp4",
 default: "HD"
 });

 let material = new THREE.MeshBasicMaterial({
 map: player.getTexture()
 });


 let sphere = new RODIN.Sculpt(new THREE.Mesh(new THREE.SphereBufferGeometry(90, 720, 4), material));
 sphere.scale.set(1, 1, -1);
 sphere.rotation.y = Math.PI/2;
 RODIN.Scene.add(sphere);

 RODIN.Scene.preRender(function () {
 player.update(RODIN.Time.delta);
 });

 let controlPanel = new VPcontrolPanel({
 player : player,
 title: "A sample 360° video",
 cover: "img/rodin.jpg",
 distance: 2,
 width: 3
 });

 controlPanel.on(RODIN.CONST.READY, (evt) => {
 RODIN.Scene.add(evt.target);
 evt.target.position.y = 1.6;
 if(evt.target.coverEl){
 evt.target.coverEl.rotation.y = -Math.PI/2;
 }

 console.log(evt.target.panel.globalPosition);
 });
/*
import * as RODIN from 'rodin/core';
RODIN.start();

const elements = [];
const types = [RODIN.Sphere, RODIN.Box];
const mainContainer = new RODIN.Sculpt();
mainContainer.on('ready', () => {
    RODIN.Scene.add(mainContainer);
});

let draggedObjectOriginalPosition = new THREE.Vector3();
let mouseOriginalPosition = new THREE.Vector3();
let mouseGamepad = null;
let plane = new THREE.Plane();



const mouseToWorld = () => {
    if (!mouseGamepad) return null;

    const intersection = new THREE.Vector3();
    mouseGamepad.raycaster.ray.intersectPlane(plane, intersection);
    return intersection;
};


const buttonReady = function(evt){
    const obj = evt.target;
    obj.position.x = Math.random() * 20 - 10;
    obj.position.y = Math.random() * 20 - 10;
    obj.position.z = Math.random() * 20 - 10;
    obj.parent = mainContainer;
};

const buttonDown = function(evt){
    const obj = evt.target;
    if (evt.gamepad.navigatorGamePadId === 'mouse') {
        navigator.mouseGamePad.stopPropagationOnMouseMove = true;
        mouseGamepad = evt.gamepad;
        plane.setFromNormalAndCoplanarPoint(
            RODIN.Scene.activeCamera.getWorldDirection(),
            obj.position);
        mouseOriginalPosition = mouseToWorld();
        draggedObjectOriginalPosition = obj.position.clone();
        obj.dragging = true;
        evt.stopPropagation();
    } else if (evt.gamepad.navigatorGamePadId === 'cardboard') {
        //not ready yet, working on this :) sorry...
        return;
    }else {
        if (obj.oldParent) return;
        obj.oldParent = obj.parent;
        console.log(evt.gamepad);
        obj.parent = evt.gamepad.sculpt;
    }
};

const buttonUp = function(evt){
    const obj = evt.target;
    if (evt.gamepad.navigatorGamePadId === 'mouse') {
        navigator.mouseGamePad.stopPropagationOnMouseMove = false;
        obj.dragging = false;
    } else if (obj.oldParent) {
        obj.parent = obj.oldParent;
        delete obj.oldParent;
    }
};

const update = function(evt){
    const obj = evt.target;
    if (!obj.dragging) return;
    const mousePos = mouseToWorld();

    obj.position = new THREE.Vector3(
        draggedObjectOriginalPosition.x - mouseOriginalPosition.x + mousePos.x,
        draggedObjectOriginalPosition.y - mouseOriginalPosition.y + mousePos.y,
        draggedObjectOriginalPosition.z - mouseOriginalPosition.z + mousePos.z
    );
};


for (let i = 0; i < 40; i++) {
    elements.push(new types[parseInt(Math.random()+0.5)](.7, .7, .7, new THREE.MeshNormalMaterial()));
    elements[i].on(RODIN.CONST.READY,  buttonReady);
    elements[i].on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, buttonDown);
    elements[i].on(RODIN.CONST.GAMEPAD_BUTTON_UP, buttonUp);
    elements[i].on(RODIN.CONST.UPDATE, update);
}
*/
