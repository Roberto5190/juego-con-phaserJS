class SceneLoad2 extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneLoad2' });
    }

    preload() {
        this.load.image('fondo_load2', '../assets/img/fondo_load.png')
        this.load.image('cartel', '../assets/img/fondo_load2-2.png')
        this.load.spritesheet('dude_load',
            '../assets/img/dude_load.png',
            { frameWidth: 77.5, frameHeight: 85 }
        );

        this.load.image('sky', '../assets/img/sky3.png');
        this.load.image('ground', '../assets/img/platform 1.png');
        this.load.image('platform1', '../assets/img/platform1.png');
        this.load.image('platform2_1', '../assets/img/platform2_1.png');
        this.load.image('platform2_2', '../assets/img/platform2_2.png');
        this.load.spritesheet('speaker',
            '../assets/img/speaker.png',
            { frameWidth: 92, frameHeight: 93 }
        )
        this.load.image('graffiti', '../assets/img/graffiti.png');
        this.load.image('graffiti1', '../assets/img/graffiti1.png');
        this.load.image('graffiti2', '../assets/img/graffiti2.png');
        this.load.image('graffiti3', '../assets/img/graffiti3.png');
        this.load.image('metro', '../assets/img/metro.png')
        this.load.image('metro_right', '../assets/img/metro_right.png')
        this.load.image('star', '../assets/img/spay.png');
        this.load.spritesheet('policia',
            '../assets/img/policia2.png',
            { frameWidth: 60, frameHeight: 52.26 }
        );
        this.load.spritesheet('dude',
            '../assets/img/dude3.png',
            { frameWidth: 40, frameHeight: 43.33 }
        );
        this.load.spritesheet('game_over',
            '../assets/img/game_over.png',
            { frameWidth: 291, frameHeight: 68 }
        );
        this.load.spritesheet('you_win',
            '../assets/img/you_win.png',
            { frameWidth: 229, frameHeight: 68 })
    }

    init(data) {
        this.score = data.score;
    }


    create() {

        /**
         * CURSOR
         */
        this.cursors = this.input.keyboard.createCursorKeys();
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.fondoLoad = this.add.image(0, 0, 'fondo_load2').setOrigin(0, 0);
        this.tweens.add({
            targets: this.fondoLoad,
            y: -199,
            duration: 3000,
            ease: 'Power2',
            onComplete: () => {
                console.log('Fondo ha aparecido completamente');
                // Iniciar otra animación aquí
                mostrarPlayBtn(this.playBtn, this);

            }
        })

        this.cartel = this.add.image(0, 300, 'cartel').setOrigin(0, 0);
        this.tweens.add({
            targets: this.cartel,
            y: -200,
            duration: 3000,
            ease: 'Power2',
            onComplete: () => {
                console.log('Fondo ha aparecido completamente');
                // Iniciar otra animación aquí


            }
        })

                /**
         *  PLATAFORMAS
         */
        // añadimos el SISTEMA DE FÍSICAS Arcade (añadido previamente en la config del juego)
        // Esta línea crea un nuevo grupo de elementos estáticos con física y lo asigna a la variable local platforms
        this.platforms = this.physics.add.staticGroup();

        // Ahora podemos usar el Grupo platforms para crear las plataformas
        // La llamada a refreshBody() es necesaria ya que se ha escalado un cuerpo físico estático,
        // por lo que es necesario avisar al sistema de físicas sobre los cambios que hicimos.
        this.platforms.create(400, 610, 'ground').setScale(2).refreshBody();

        this.platforms.setVisible(false)


        this.playBtn = this.physics.add.sprite(20, 400, 'dude_load')
        this.anims.create({
            key: 'dude_load_anim',
            frames: this.anims.generateFrameNumbers('dude_load', { start: 0, end: 32  }),
            frameRate: 7,
            repeat: -1
        });
        this.playBtn.anims.play('dude_load_anim');

        this.playBtn.setVisible(false);
        //
        this.playBtn.setDepth(200);

        this.physics.add.collider(this.playBtn, this.platforms);

        // this.playBtn = this.add.sprite(430, 540, 'dude')
        // this.anims.create({
        //     key: 'dude_load_anim',
        //     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 18 }),
        //     frameRate: 4,
        //     repeat: -1
        // });

        // this.playBtn.setVisible(false);
        // //
        // this.playBtn.setDepth(200);




        function mostrarPlayBtn(playBtn, scene) {
            playBtn.setVelocityX(110);
            playBtn.setVisible(true);

            setTimeout(() => {
                mostrarPlayText(scene) 
            }, 3500); // 3000 milisegundos = 5 segundos de retraso
            console.log('mostrar play butn');

        };

        function mostrarPlayText(scene) {

            console.log('mostrar play butn');
            scene.add.text(410, 510, 'Pulsa Enter', {
                fontSize: '1.5rem',
                fontWeight: 'black',
                fontFamily: 'arial',
                // backgroundColor: 'green',
                borderRadius: { x: 8, y: 8 },
                color: '#0087E9',
                padding: { x: 10, y: 10 }
    
            }).setOrigin(0.5)
        };


        console.log('se ha cargado escena Load');



    }


    update() {
        if (this.enterKey.isDown) {
            this.scene.stop('SceneLoad2');
            this.scene.start('SceneB', { score: this.score });
        }

        if (this.playBtn.x >= 770 - this.playBtn.width / 2) {
            this.playBtn.x = 100;
            this.playBtn.setVelocityX(110);
            this.playBtn.anims.play('dude_load_anim');

        }


    }
}