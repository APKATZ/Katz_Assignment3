//Adam Katz 
//3-2-21
//I made a cool td square out of four triangles, and it is colerd to look kind of 3d
//Proposed points: 8. I tried to get the second shader to work for hours and couldnt figure it out,
// I left the code commented out and any feedback on why it does not work would be greatly appreciated



"use strict";

var canvas;
var gl;

var theta = 0.0;
var thetaLoc;
var direction = true;
var speed = 0;
var vertices;
var vertices1;
var program;
var program1;
var colors;





window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) alert( "WebGL 2.0 isn't available" );


    //
    //  Configure WebGL
    //
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 1.0);

    //  Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    thetaLoc = gl.getUniformLocation(program, "utheta");
    //This is the second program that did not work: 
    program1 = initShaders(gl, "vertex-shader-still", "fragment-shader");
     vertices = [

        vec2(0, .5),
        vec2(-.5 ,0),
        vec2(.5, 0),

        vec2(0, -.5),
        vec2(.5 ,0),
        vec2(-.5, 0),

        vec2(0, .25),
        vec2(-.25, 0),
        vec2(.25, 0),

        vec2(0, -.25),
        vec2(.25, 0),
        vec2(-.25, 0)

       

        
    ];

     colors = [
        vec3(0,0,0),
        vec3(1,1,1),
        vec3(0,0,0),

        vec3(0,0,0),
        vec3(1,1,1),
        vec3(0,0,0),

        vec3(0,0,1),
        vec3(.5,0,.5),
        vec3(.5,0,.5),

        vec3(1,0,0),
        vec3(.5,0,.5),
        vec3(.5,0,.5)
    ];
    vertices1 = [
       vec2(-1, 1),
        vec2(-.90, 1),
        vec2(-1, .90)
    ];

    //The botton to stop and start rotation
    document.getElementById("Direction").onclick = function()
    {
        console.log("pressed button");
        if (speed == 0)
        speed = .1
        else 
        speed = 0
    }
    //The slider to change speed
    document.getElementById("slider").onchange = function(event)
    {
        speed = parseFloat(event.target.value);
        console.log("slider!!!", speed);
    }
    //menu 
    document.getElementById("Controls"),onclick = function(event)
    {
        switch(event.target.index)
        {
            case 0:
                direction = !direction;
                break;
            case 1:
                if (speed != 0)
                speed += .1;
                else 
                speed = .01
        }
    }
    window.onkeydown=function(event)
    {
        //keyboard inputs 
        var key = String.fromCharCode(event.keyCode);
        switch( key ) 
        {
            case 'D':
            case 'd':
                direction = !direction;
                break;
            case 'F':
            case 'f':
                if (speed != 0)
                    speed += .1;
                    break;
            case 'S':
            case 's':
               speed -= .1;
                if (speed <0)
                {
                    speed = 0.01;
                }
                break; 

        }
    }
    
    render();
};


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    let cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    let colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);


    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    // Associate out shader variables with our data bufferData

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    if (direction == true)
    theta += speed;
    else 
    theta -= speed;

    gl.uniform1f(thetaLoc, theta);

    gl.drawArrays(gl.TRIANGLES, 0, vertices.length);

    //The not working code: 

    gl.useProgram(program1);

    var bufferId2 = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId2);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices1), gl.STATIC_DRAW);

    var positionLoc2 = gl.getAttribLocation(program1, "aPosition");
    gl.vertexAttribPointer(positionLoc2, 2, gl.FLOAT, false, 0,0);
    gl.enableVertexAttribArray(positionLoc2);

    gl.drawArrays(gl.TRIANGLES, 0, vertices1.length);
    requestAnimationFrame(render);
}


