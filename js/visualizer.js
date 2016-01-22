/*
    =================================================
                 - Current visualizers - 
    =================================================
    
    1. Simple image height and width change (logo)
    
    =================================================
                     - Coming soon -
    =================================================
        - Spinning Particles
*/

function Visualizer() {};

Visualizer.prototype.visualize = function(settings, el, buffer, volume) {
    var src = undefined;

    switch(settings.visualizer) {
        case 1:
            logo.create('#mount', "assets/images/logo.png");
            src = Visualizer.logo(el, buffer, volume);
            break;
        case 2:
            src = Visualizer.particles(el, buffer, volume);
            break;
    }

    soundManager.play(src);
}

Visualizer.prototype.logo = function(el, buffer, volume) {
    this._prevVal = 0;
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    var analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    var bufferLength = analyser.fftSize;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    function draw() {
        drawVisual = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        if(((dataArray[20] * 2) > this._prevVal - 1 || (dataArray[20] * 2) < this._prevVal + 1) && (dataArray[20] * 2) > 150){
            console.log(dataArray[10] * 2)
            el.css({
                width: dataArray[10] * 2,
                height: dataArray[10] * 2,
                marginTop: -dataArray[10],
                marginLeft: -dataArray[10]
            })
        }

        this._prevVal = dataArray[20];
    }

    var gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    src.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(ctx.destination);

    draw();
    return src; 
};

Visualizer.prototype.particles = function(container, buffer, volume) {
    var container;
    var camera, scene, renderer, group, particle;
    var mouseX = 0, mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var src = ctx.createBufferSource();
    src.buffer = buffer;
    var analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    var bufferLength = analyser.fftSize;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);

    init();
    animate();

    function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );
        camera.position.z = 1000;

        scene = new THREE.Scene();

        var PI2 = Math.PI * 2;
        var program = function ( context ) {

            context.beginPath();
            context.arc( 0, 0, 0.5, 0, PI2, true );
            context.fill();

        };

        group = new THREE.Group();
        scene.add( group );

        for ( var i = 0; i < 1000; i++ ) {

            var material = new THREE.SpriteCanvasMaterial( {
                color: Math.random() * 0x808008 + 0x808080,
                program: program
            } );

            particle = new THREE.Sprite( material );
            particle.position.x = Math.random() * 2000 - 1000;
            particle.position.y = Math.random() * 2000 - 1000;
            particle.position.z = Math.random() * 2000 - 1000;
            particle.scale.x = particle.scale.y = Math.random() * 20 + 10;
            group.add( particle );
        }

        console.log(group);

        renderer = new THREE.CanvasRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );


        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

    //

    function onDocumentMouseMove( event ) {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }

    function onDocumentTouchStart( event ) {

        if ( event.touches.length === 1 ) {

            event.preventDefault();

            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

    }

    function onDocumentTouchMove( event ) {

        if ( event.touches.length === 1 ) {

            event.preventDefault();

            mouseX = event.touches[ 0 ].pageX - windowHalfX;
            mouseY = event.touches[ 0 ].pageY - windowHalfY;

        }

    }

    function animate() {

        requestAnimationFrame( animate );

        render();

    }

    function render() {

        camera.position.x += ( mouseX - camera.position.x ) * 0.05;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
        camera.lookAt( scene.position );

        group.rotation.x += 0.01;
        group.rotation.y += 0.02;

        analyser.getByteTimeDomainData(dataArray);

        console.log(Math.ceil(dataArray[10] / 100) + Math.ceil(Math.random(1, 5)));

        _.each(group.children, function(child) {
            child.scale = {
                x: dataArray[200] / 100,
                y: dataArray[200] / 100,
                z: dataArray[200] / 100
            }
        })

        renderer.render( scene, camera );

    }

    var gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    src.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(ctx.destination);
        console.log(group);
    return src;
};