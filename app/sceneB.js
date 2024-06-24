class SceneB extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneB' });
    }


    preload() {

        this.load.image('fondo', 'assets/img/fondo2.png');
        this.load.image('ground', 'assets/img/platform 1.png');
        this.load.image('platform3', 'assets/img/platform3.png');
        this.load.image('platform2', 'assets/img/platform3_1.png');
        this.load.image('platform3_2', 'assets/img/platform3_2.png');
        this.load.image('platform3_3', 'assets/img/platform3_3.png');
        this.load.image('platform_police', 'assets/img/platform_police.png');
        this.load.image('platform_police1', 'assets/img/platform_police1.png');
        this.load.spritesheet('speaker',
            'assets/img/speaker.png',
            { frameWidth: 92, frameHeight: 93 }
        )
        this.load.image('graffiti', 'assets/img/graffiti.png');
        this.load.image('graffiti1', 'assets/img/graffiti1.png');
        this.load.image('graffiti2', 'assets/img/graffiti2.png');
        this.load.image('graffiti3', 'assets/img/graffiti3.png');
        this.load.image('metro', 'assets/img/metro.png')
        this.load.image('metro_right', 'assets/img/metro_right.png')
        this.load.image('star', 'assets/img/spay.png');
        this.load.spritesheet('policia',
            'assets/img/policia2.png',
            { frameWidth: 60, frameHeight: 52.26 }
        );
        this.load.spritesheet('dude',
            'assets/img/dude3.png',
            { frameWidth: 40, frameHeight: 43.33 }
        );
        this.load.spritesheet('game_over',
            'assets/img/game_over.png',
            { frameWidth: 291, frameHeight: 68 }
        );
        this.load.spritesheet('you_win',
            'assets/img/you_win.png',
            { frameWidth: 229, frameHeight: 68 })


    };

    // Recupera la variable score de la pantalla anterior
    init(data) {
        this.score = data.score;
    }



    create() {


        // Array de preguntas
        const preguntas = [
            "¡Corre!",
            "¡por ahí viene el guardia!",
            "Una pieza más...",
            "Pásame el plata",
            "Menudo piezote"

            // Agrega más preguntas aquí
        ];


        /**
         * CURSOR
         */
        this.cursors = this.input.keyboard.createCursorKeys();



        /**
        * CIELO
        */
        // el orden de las capas va en funcion de cuando se hayan cargado, es decir de arriba a abajo

        // para posicionar la imagen en la esquina superior izquierda.
        //  this.add.image(0, 0, 'sky').SetOrigin(0, 0) 
        this.fondo = this.add.image(400, -300, 'fondo');

        // animación de entrada del fondo
        this.tweens.add({
            targets: this.fondo,
            y: 300,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                console.log('Fondo ha aparecido completamente');
                // Iniciar otra animación aquí
            }

        })


        /**
        *  GRAFFITIS
        */

        const graffitis = {
            graffiti: this.add.image(400, 800, 'graffiti'),
            graffiti1: this.add.image(400, 800, 'graffiti1'),
            graffiti2: this.add.image(400, 800, 'graffiti2'),
            graffiti3: this.add.image(400, 800, 'graffiti3')
        };



        /**
        *  PLATAFORMAS
        */
        // añadimos el SISTEMA DE FÍSICAS Arcade (añadido previamente en la config del juego)
        // Esta línea crea un nuevo grupo de elementos estáticos con física y lo asigna a la variable local platforms
        this.platforms = this.physics.add.staticGroup();

        // Ahora podemos usar el Grupo platforms para crear las plataformas
        // La llamada a refreshBody() es necesaria ya que se ha escalado un cuerpo físico estático,
        // por lo que es necesario avisar al sistema de físicas sobre los cambios que hicimos.
        this.platforms.create(400, 590, 'ground').setScale(2).refreshBody();

        this.platforms.create(610, 425, 'platform3');
        this.platforms.create(70, 428, 'platform3');
        this.platforms.create(328, 428, 'platform2');
        this.platforms.create(760, 315, 'platform2');
        this.platforms.create(465, 300, 'platform2');
        this.platforms.create(220, 305, 'platform3_2');
        this.platforms.create(220, 158, 'platform3_2');
        this.platforms.create(55, 160, 'platform3_2');
        this.platforms.create(540, 155, 'platform3_3');
        this.platforms.setVisible(false);

        // Plataformas que solo afectan al grupo POLICIAS
        // Estas 
        this.platform_police = this.physics.add.staticGroup()
        this.platform_police.create(365, 290, 'platform_police');
        this.platform_police.create(170, 140, 'platform_police');
        this.platform_police.setVisible(false);

        this.platform_police1 = this.physics.add.sprite(613, 309, 'platform_police1')
        this.platform_police1.body.allowGravity = false;
        this.platform_police1.body.immovable = true;
        this.platform_police1.setVisible(false);





        /**
        * JUGADOR
        */
        this.player = this.physics.add.sprite(100, -450, 'dude');

        // Animación entrada en escena
        this.tweens.add({
            targets: this.player,
            y: 450,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                console.log('player ha aparecido completamente');
                // Iniciar otra animación aquí
            }

        })

        this.player.setDepth(100);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravity(40)

        // Animaciones jugador
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 6 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'up',
            frames: [{ key: 'dude', frame: 7 }],
            frameRate: 20

        })

        this.anims.create({
            key: 'up_left',
            frames: [{ key: 'dude', frame: 7 }],
            frameRate: 10

        })

        this.anims.create({
            key: 'up_right',
            frames: [{ key: 'dude', frame: 8 }],
            frameRate: 10

        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 11, end: 14 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'graff',
            frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 10 }),
            frameRate: 60,
            repeat: -1
        })

        // FISICAS PLAYER
        this.physics.add.collider(this.player, this.platforms);



        /**
        * POLICIAS
        */
        this.policias = this.physics.add.group();

        // Animaciones Policía
        this.anims.create({
            key: 'policia_left',
            frames: this.anims.generateFrameNumbers('policia', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'policia_right',
            frames: this.anims.generateFrameNumbers('policia', { start: 6, end: 14 }),
            frameRate: 10,
            repeat: -1
        });

        // Desactivar cuerpo de cada policia
        this.policias.children.iterate(function (policia) {

            policia.disableBody(true, true);

            policia.setDepth(200);
        });


        // Función para la colisión Player-Policia
        function hitPolicia(player, policia) {
            this.physics.pause();

            this.player.setTint(0xff0000);

            this.player.anims.play('turn');
            policia.setAccelerationX()

            //GAMEOVER
            const game_over = this.add.sprite(400, 300, 'game_over');
            this.anims.create({
                key: 'game_over_anim',
                frames: this.anims.generateFrameNumbers('game_over', { start: 0, end: 1 }),
                frameRate: 2,
                repeat: -1
            }),
            game_over.setDepth(300)
            game_over.anims.play('game_over_anim');

            this.gameOver = true;
        }

        // SI el policia choca con la plataforma de la izq da la vuelta hacia la derecha
        function touchPlatformLeft(policia, platforms) {
            policia.setVelocity(160);
            policia.anims.play('policia_right'); 
            policia.setDepth(200);
        }


        // FISICAS POLICIA
        this.physics.add.collider(this.player, this.policias, hitPolicia, null, this);
        this.physics.add.collider(this.policias, this.platforms);
        this.physics.add.collider(this.policias, this.platform_police1);
        this.physics.add.collider(this.policias, this.platform_police, touchPlatformLeft, null, this);





        /**
        * SPRAYS (creados en el grupo stars)
        */

        this.stars = this.physics.add.group();
        this.stars.create(420, 135, 'star');
        this.stars.create(250, 235, 'star');
        this.stars.create(650, 411, 'star');
        this.tweens.add({
            targets: this.stars,
            y: 450,
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
                console.log('player ha aparecido completamente');
                // Iniciar otra animación aquí
            }

        })
        // Recorre todos los elementos del grupo
        // y le da a cada uno un valor de rebote de Y aleatorio entre 0,4 y 0,8.
        this.stars.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

        });

        // colision sprays/plataforma
        this.physics.add.collider(this.stars, this.platforms);

        // comprobamos si el personajee se superpone a algun spray, si tienen contacto se ejecuta collectStar()
        this.physics.add.overlap(this.player, this.stars, collectStar, null, this);




        function collectStar(player, star) {
            // //(inactiva, invisible)
            star.disableBody(true, true);
            this.scoreText.setVisible(true)

            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);



            // Desactivamos el cuerpo del jugador
            player.disableBody(true, false);

            // reactivar el cuerpo del jugador tras 400ms
            this.time.delayedCall(400, () => {
                player.enableBody(true, player.x, player.y, true, true);

            });

            if (this.stars.countActive(true) === 0) {

                //  +SPRAY
                // Genera nuevos Sprays
                for (let i = 0; i < 4; i++) {
                    // Añade nuevas Sprays al grupo
                    let newStar = this.stars.create(Phaser.Math.Between(50, 600), Phaser.Math.Between(0, 500), 'star');

                }

                // VARIABLE Y
                var y = (this.player.y < 300) ? Phaser.Math.Between(300, 400) : Phaser.Math.Between(0, 300);
                var x
                var policiasLenght = this.policias.getLength();

                // POSICION Y para cada policia 
                if (policiasLenght == 0) {
                    y = Phaser.Math.Between(50, 100)
                } else if (policiasLenght == 1) {
                    x = Phaser.Math.Between(400, 800)
                    y = Phaser.Math.Between(250, 150)
                } else if (policiasLenght == 2) {
                    y = Phaser.Math.Between(500, 400)
                }  else if (policiasLenght == 3) {
                    y = Phaser.Math.Between(500, 400)
                }  else if (policiasLenght == 4) {
                    y = Phaser.Math.Between(50, 100)
                }else {
                    //YOU WIN
                    //si hay + de 5 policías ganas el nivel del juego
                    const you_win = this.add.sprite(400, 300, 'you_win');
                    this.anims.create({
                        key: 'you_win_anim',
                        frames: this.anims.generateFrameNumbers('you_win', { start: 0, end: 1 }),
                        frameRate: 2,
                        repeat: -1
                    }),

                    you_win.setDepth(300)
                    you_win.anims.play('you_win_anim');

                    this.physics.pause();
                    this.player.setTint(0x00ff00);

                    /**
                    * CAMBIO DE ESCENA -> LOAD1
                    */
                    setTimeout(() => {
                        this.scene.stop('SceneB');
                        this.scene.switch('SceneLoad1');
                    }, 3000); // 5000 milisegundos = 5 segundos de retraso


                }

                var x = Phaser.Math.Between(0, 800)

                // CREAR NUEVO POLICIA en grupo de policias
                this.policias.create(this.player.x + Phaser.Math.Between(90, 150), y, 'policia')

                this.policias.children.iterate(function (policia) {
                    // las coordenadas x e y donde se activa el cuerpo del policía
                    policia.enableBody(true, policia.x, policia.y, true, true);
                    policia.setCollideWorldBounds(true);
                    policia.body.setGravityY(40);
                    policia.setVelocityX(100);
                    policia.setAccelerationX(10)
                    policia.setDepth(200)
                    // reproducimos animación del sprite
                    policia.anims.play('policia_right');
                });

            }



            /**
             * MOSTRAR GRAFFITI ALEATORIO
             */
            function mostrarGraffiti(graffiti, scene, player) {

                // Crear un cuadro de texto para mostrar la pregunta
                const graffitiImg = scene.add.image(player.x, player.y - 30, graffiti).setOrigin(0.5);
                graffitiImg.setDepth(0)

            }

            function mostrarGraffitiAleatorio(scene, player) {
                const graffitiAleatorio = Phaser.Math.RND.pick(Object.keys(graffitis));
                mostrarGraffiti(graffitiAleatorio, scene, player);
            }

            // Mostrar el graffiti en pantalla
            mostrarGraffitiAleatorio(this, this.player);





            /**
             * MOSTRAR PREGUNTA ALEATORIa
             */
            function mostrarPregunta(pregunta, scene) {
                // Crear un cuadro de texto para mostrar la pregunta
                const preguntaText = scene.add.text(250, 450, pregunta, {
                    fontSize: '18px',
                    fontWeight: 'black',
                    fontFamily: 'arial',
                    fill: 'black',
                    backgroundColor: 'gray',
                    padding: { x: 20, y: 10 },
                    fixedWidth: 250, // Ancho fijo del texto para envolverlo si es necesario
                    wordWrap: { width: 380 } // Envolver el texto si excede el ancho fijo
                }).setOrigin(0.5);


                // Ocultar el cuadro de texto después de un tiempo (por ejemplo, 3 segundos)
                scene.time.delayedCall(2000, () => {
                    preguntaText.destroy(); // Destruir el cuadro de texto después de 3 segundos

                });
            }


            // Seleccionar una pregunta aleatoria
            const preguntaAleatoria = Phaser.Math.RND.pick(preguntas);
            // Mostrar la pregunta en pantalla
            mostrarPregunta(preguntaAleatoria, this);


            /**
            * SPEAKER
            */
            const speaker = this.add.sprite(80, 490, 'speaker');

            // Animacion del speaker
            this.anims.create({
                key: 'speak',
                frames: this.anims.generateFrameNumbers('speaker', { start: 0, end: 7 }),
                frameRate: 6,
                repeat: -1
            }),

                speaker.anims.play('speak');

            this.time.delayedCall(2000, () => {
                speaker.anims.play('speak').destroy(); // Destruir el cuadro de texto después de 3 segundos

            });

        }




        /**
         * PUNTUACIÓN
         */
        this.scoreText = this.add.text(40, 20, 'score: 0', {
            fontSize: '28px',
            fill: 'white', fontFamily:
                'helvetica',
            backgroundColor: 'black',
            padding: { x: 20, y: 10 },

        });

        this.scoreText.setVisible(false)
        this.text = this.add.text(400, 300, 'HOLA', { fontSize: '1rem', fontFamily: 'Helvetica', backgroundColor: 'yellow', borderRadius: { x: 8, y: 8 }, color: 'black', padding: { x: 10, y: 10 } }).setOrigin(0.5);
        this.text.setVisible(false)


    };
    //  /create()






    update() {

        /**
         * LÓGICA DEL CURSOR
         */
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play('left', true);

        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play('right', true);

        }
        else {
            this.player.setVelocityX(0);

            this.player.anims.play('turn');
        }


        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);

        }
        if (!this.player.body.touching.down && this.cursors.left.isDown) {

            this.player.anims.play('up_left', true);

        } else if (this.cursors.right.isDown && !this.player.body.touching.down) {

            this.player.anims.play('up_right', true);

        }





        // Si el policia colisiona con los bordes del canvas -->
        if (this.policias && this.policias.getLength() > 0) {

            // Iterar sobre cada sprite del grupo
            this.policias.children.iterate(function (policia) {

                // Si el policía alcanza el borde derecho de la escena, cambia su velocidad hacia la izquierda
                if (policia.x >= 800 - policia.width / 2) {
                    policia.setVelocityX(-160); // Cambia la velocidad hacia la izquierda
                    policia.setVelocityY(-60);
                    policia.setAccelerationY(-5);
                    policia.anims.play('policia_left');
                    policia.setDepth(200)
                }
                // Si el policía alcanza el borde izquierdo de la escena, cambia su velocidad hacia la derecha
                else if (policia.x <= policia.width / 2) {
                    policia.setVelocityX(160); // Cambia la velocidad hacia la derecha
                    // policia.setAccelerationX (5);
                    policia.anims.play('policia_right');
                    policia.setDepth(200)
                }

            });

        }


        /**
        * GAME OVER
        */
        if (this.gameOver == true) {
            this.score = 0;
            this.stars.clear();
            this.policias.clear();

            setTimeout(() => {
                this.scene.stop('SceneB')
                this.scene.start('SceneLoad1');
            }, 5000); // 5000 milisegundos = 5 segundos de retraso
        }


        if (!this.player.body.enable) {
            this.player.anims.play('graff', true);
        }

    }
    //  /update()


}
//  /class SceneB
