
// Configuración de phaser
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game_container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        }
    },
    scene: [SceneLoad1,
        SceneLoad2,
        SceneA,
        SceneB
    ]
};

const game = new Phaser.Game(config);

const arteConceptualSlides = [
    {
        dataId: "1",
        slideTitle: "Pantalla de carga 1",
        slideText: `La pantalla de carga está pensada para introducir al jugador en el nivel de una forma gráfica y efectiva. En este caso se utiliza la ciudad de fondo en tonos oscuros para que destaque menos que la entrada de metro, que se encuentra en primer plano indicando el nivel que se va a jugar y haciendo referencia al escenario.`,
        slideImg: "assets/img/slide_fondo1.png",
    },
    {
        dataId: "2",
        slideTitle: "Escenario 1",
        slideText: `En este nivel se pretende hacer un escenario donde las plataformas sean sencillas y continuas para que el usuario se acostumbre a la jubigabilidad y las físicas del juego. Esto se consigue haciendo unos andenes de metro que actúan a modo de plataforma por donde irán el personaje y el  ain posibilidad de caer a un nivel inferior. Por otro lado el concepto de estación de metro nos permite relacionar este escenario con el lugar en el que se desarrolla el juego, que es la ciudad.`,
        slideImg: "assets/img/escenario_1.png"
    },
    {
        dataId: "3",
        slideTitle: "Pantalla de carga 2",
        slideText: `Esta pantalla de carga introduce al jugador en una atmósfera urbana mientras carga el segundo nivel, que se desarrolla en la calle. 
        La ciudad de fondo es la ilustración de la idea original del videojuego, y se le superpone una marquesina de metro indicando el nivel en el que el jugador se encuenta.`,
        slideImg: "assets/img/slide_fondo2.png"
    },
    {
        dataId: "4",
        slideTitle: "Escenario 2",
        slideText: `En el segundo escenario se dificulta la jugabilidad haciendo plataformas discontinuas donde se tiene que saltar de una a otra. Tiene más detalles como sombras o profundidad, así como letreros luminosos, marquesinas o tiendas. La intención es reflejar un escenario de ciudad nocturna sin gente donde el jugador pueda recoger los puntos que necesita evitando a los guardias y pudiendo caer fácilmente hacia los niveles inferiores, al contrario que pasaba en el escenario anterior.`,
        slideImg: "assets/img/escenario_2.png"
    },
    {
        dataId: "5",
        slideTitle: "Player",
        slideText: `Este jugador es un duende que se dedica a pintar. Está vestido con un abrigo de plumas y unos pantalones anchos, una gorra y una riñonera. Es el personaje principal y el protagonista del juego, el objetivo es que le jugador se sienta representado con él. Tiene diferentes expreseiones para decir frases distintas a la hora de realizar acciones.`,
        slideImg: "assets/img/slide_player_img.png"
    },
    {
        dataId: "6",
        slideTitle: "Player",
        slideText: `Jugador 1 más detallado y con 6 diferentes poses de cuerpo y expresiones, una de ellas destacando su personalidad adolescente o desenfadada (la más grande).`,
        slideImg: "assets/img/player2.png"
    },
    {
        dataId: "7",
        slideTitle: "Policía",
        slideText: `Este enemigo es el matón estandar de la mafia PIGS que intentará agarrarte para que no pintes y llevarte a su fábrica de artistas para explotar tu creatividad. Está realizado con distintas poses y acciones como saltar, sacar la porra o iluminar con la linterna.`,
        slideImg: "assets/img/pig1.png"
    },
    {
        dataId: "8",
        slideTitle: "Policía",
        slideText: `Jugador Enemigo más detallado con 6 diferentes poses de cuerpo y expresiones, una de ellas destacando su personalidad de canalla o de mafioso, sujetando una rosquilla que referencia de manera simbólica la vagancia y la dejadez.`,
        slideImg: "assets/img/pig2.png"
    }
]

const guionSlides = [
    {
        dataId: "1",
        slideTitle: "Guión literario",
        slideText: `Este juego está basado en un adolescente artista que se dedica a pintar por la ciudad en un mundo donde no es ilegal. A pesar de no ser ilegal, existe una mafia llamada PIGS que se dedica a cazar artistas para usarlos en proyectos corporativos y explotarlos día y noche. No permitas que te cojan y llena de colores la ciudad hasta que pases de nivel!`,
        slideImg: "assets/img/logo.png"
    }

]

// var GLOBALES
let currentSlide = 0
let currentArray = guionSlides;

window.addEventListener("load", (ev) => {

    renderSlides(currentArray, currentSlide)
    guionBtn.classList.add("active")
});

// FUNCIONES
const renderSlides = (selectionSlides, index) => {
    const slider = document.querySelector(".section_slides");
    slider.innerHTML = "";


    const slideContainer = document.createElement("div");
    slideContainer.classList.add("slides");
    slideContainer.innerHTML += `
            <div class="slides_left">
                <title class="slides_left_title">${selectionSlides[index].slideTitle}</title>
                <p class="slides_left_text">${selectionSlides[index].slideText}</p>
            </div>
            <div class="slides_right">
                <img src=${selectionSlides[index].slideImg} alt="">
            </div>


        `;
    slider.appendChild(slideContainer);

    createSliderButtons();
    // BOTONES SLIDER

}



// HEADER MENU
const guionBtn = document.querySelector(".header_menu_item_1");
const arteConceptualBtn = document.querySelector(".header_menu_item_2");
const juegoBtn = document.querySelector(".header_menu_item_3");

const sectionTitle = document.querySelector(".section_title")
sectionTitle.innerHTML = "Guión"
// RENDER contenido de guion primero


guionBtn.addEventListener("click", (ev) => {
    sectionTitle.innerHTML = "Guión"
    changeArray(guionSlides);
    guionBtn.classList.add("active")
    arteConceptualBtn.classList.remove("active")
    juegoBtn.classList.remove("active")
})

arteConceptualBtn.addEventListener("click", (ev) => {
    sectionTitle.innerHTML = "Arte conceptual"
    changeArray(arteConceptualSlides);
    arteConceptualBtn.classList.add("active")
    guionBtn.classList.remove("active")
    juegoBtn.classList.remove("active")
})

juegoBtn.addEventListener("click", (ev) => {
    sectionTitle.innerHTML = "Guión"
    renderSlides(currentArray, currentSlide)
    juegoBtn.classList.add("active")
    arteConceptualBtn.classList.remove("active")
    guionBtn.classList.remove("active")

    const sectionGame = document.querySelector('.game');
    sectionGame.scrollIntoView({ behavior: 'smooth' });


})


// BOTONES SLIDER
const createSliderButtons = () => {
    const prevBtn = document.createElement("button");
    prevBtn.classList.add("btn_left_slides");
    prevBtn.innerHTML = '<img src="assets/img/arrow_left.png" alt="">';
    prevBtn.addEventListener('click', () => {
        if (currentArray.length)
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = currentArray.length - 1; // Volver al último elemento del array
        }
        renderSlides(currentArray, currentSlide)
        console.log(currentSlide);


    });

    const nextBtn = document.createElement("button");
    nextBtn.classList.add("btn_right_slides");
    nextBtn.innerHTML = '<img src="assets/img/arrow_right.png" alt="">';
    nextBtn.addEventListener('click', () => {

        currentSlide++
        if (currentSlide >= currentArray.length) {
            currentSlide = 0; // Volver al primer elemento del array
        }
        renderSlides(currentArray, currentSlide)
        console.log(currentSlide);
    });

    const slideContainer = document.querySelector(".slides");
    slideContainer.appendChild(prevBtn);
    slideContainer.appendChild(nextBtn);
};

// Función para cambiar el array seleccionado
const changeArray = (newArray) => {
    currentArray = newArray; // Actualiza el valor de currentArray con el nuevo array seleccionado
    currentSlide = 0; // Reinicia el slide actual al cambiar de array
    renderSlides(currentArray, currentSlide); // Renderiza el primer slide del nuevo array seleccionado
};