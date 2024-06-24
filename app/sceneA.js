class SceneA extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneA' });
    };



    preload() {

        // LOS RECURSOS SE CARGAN EN LA PANTALLA DE CARGA --> SceneLoad1

    };







    create() {

        // Aquí creamos una variable para la puntuación real y otra para el objeto
        this.score = 0;
        this.scoreText;

        // Array de preguntas
        const preguntas = [
            "¡Corre! ¡Corre!",
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
        this.add.image(400, 300, 'sky');


        // /**
        //  *  GRAFFITIS
        //  */

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
        this.platforms.create(400, 610, 'ground').setScale(2).refreshBody();

        this.platforms.create(370, 435, 'platform1');
        this.platforms.create(195, 320, 'platform2_1');
        this.platforms.create(625, 320, 'platform2_2');
        this.platforms.create(435, 165, 'platform1');
        this.platforms.setVisible(false);



        /**
         * JUGADOR
         */
        this.player = this.physics.add.sprite(100, 450, 'dude');

        this.player.setDepth(100);
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravity(40)

        // Animaciones jugador
        this.anims.create({
            key: 'dude_load',
            frames: this.anims.generateFrameNumbers('dude', { start: 8, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

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
            //(inactiva, invisible)
            policia.disableBody(true, true);

            policia.setDepth(200);
        });


        // Función para la colisión Player-Policia
        function hitPolicia(player, policia) {
            this.physics.pause();

            this.player.setTint(0xff0000);

            this.player.anims.play('turn');

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


        // FISICAS POLICIA
        this.physics.add.collider(this.player, this.policias, hitPolicia, null, this);
        this.physics.add.collider(this.policias, this.platforms);





        /**
         * SPRAYS (creados en el grupo stars)
         */

        this.stars = this.physics.add.group();
        this.stars.create(250, 135, 'star');
        this.stars.create(550, 235, 'star');
        this.stars.create(400, 435, 'star');
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
            //(inactiva, invisible)
            star.disableBody(true, true);
            this.scoreText.setVisible(true);

            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            this.scoreText.setDepth(300);

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
                    // Añade nuevos Sprays al grupo
                    let newStar = this.stars.create(Phaser.Math.Between(50, 750), Phaser.Math.Between(0, 500), 'star');

                }

                // VARIABLE Y
                var y = (this.player.y < 300) ? Phaser.Math.Between(300, 400) : Phaser.Math.Between(0, 300);

                var policiasLenght = this.policias.getLength();

                // POSICION Y para cada policia 
                if (policiasLenght == 0) {
                    y = Phaser.Math.Between(50, 100)
                } else if (policiasLenght == 1) {
                    y = Phaser.Math.Between(250, 150)
                } else if (policiasLenght == 2) {
                    y = Phaser.Math.Between(500, 400)
                } else {
                    //YOU WIN
                    //si hay + de 3 policías ganas el nivel del juego
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
                    * CAMBIO DE ESCENA -> B
                    */
                    setTimeout(() => {
                        this.scene.stop('sceneA')
                        this.scene.start('SceneLoad2', { score: this.score });
                    }, 4000); // 5000 milisegundos = 5 segundos de retraso


                }

                // CREAR NUEVO POLICIA en grupo de policias
                this.policias.create(this.player.x + Phaser.Math.Between(90, 150), y, 'policia')

                this.policias.children.iterate(function (policia) {
                    // las coordenadas x e y donde se activa el cuerpo del policía
                    policia.enableBody(true, policia.x, policia.y, true, true);
                    policia.setCollideWorldBounds(true);
                    policia.body.setGravityY(40);
                    policia.setVelocityX(100);
                    policia.setAccelerationX(5)
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
        // /collectStar()




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
    // /create()




    /**
     * RESETEAR JUEGO
     */
    restartGame() {
        // Restablecer variables de puntuación y estado del juego
        this.score = 0;
        this.scoreText.setText('Score: ' + this.score);
        this.gameOver = false;

        // Reactivar elementos del juego que hayan sido desactivados
        this.player.setActive(true);
        this.player.setVisible(true);
        this.player.clearTint();

        // Reactivar estrellas y policías
        this.stars.children.iterate(function (star) {
            star.setActive(true);
            star.setVisible(true);
        });
        this.policias.children.iterate(function (policia) {
            policia.setActive(true);
            policia.setVisible(true);
        });
    };



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
                    // policia.setAccelerationX (-5);
                    policia.anims.play('policia_left'); // También podrías cambiar la animación si es necesario
                    policia.setDepth(200)
                }
                // Si el policía alcanza el borde izquierdo de la escena, cambia su velocidad hacia la derecha
                else if (policia.x <= policia.width / 2) {
                    policia.setVelocityX(160); // Cambia la velocidad hacia la derecha
                    // policia.setAccelerationX (5);
                    policia.anims.play('policia_right'); // También podrías cambiar la animación si es necesario
                    policia.setDepth(200)
                }

            });

        }

        /**
        * GAME OVER
        */
        if (this.gameOver == true) {

            setTimeout(() => {
                this.restartGame();
                this.scene.stop('sceneA');
                this.scene.switch('SceneLoad1');
            }, 5000);
        }


        if (!this.player.body.enable) {
            this.player.anims.play('graff', true);
        }


    }
    // /update()


}
//  /class SceneA