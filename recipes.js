// Base de datos de recetas de SaludaApp
// cat: verduras | frutas | proteinas | lacteos | despensa | otros

// Fotos reales de Pexels (licencia gratuita, sin atribución requerida).
// Si una foto no carga, la tarjeta cae automáticamente en el emoji del plato.
function pexUrl(id){
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=700`;
}
const FOTO = {
  avocado_toast: pexUrl(4062617),
  salmon_toast: pexUrl(9671541),
  oatmeal: pexUrl(27850094),
  oatmeal2: pexUrl(33103094),
  yogur_bowl: pexUrl(4220141),
  yogur_bowl2: pexUrl(28766046),
  huevos: pexUrl(14941249),
  huevos2: pexUrl(4552980),
  pollo_verduras: pexUrl(6210764),
  pollo_verduras2: pexUrl(2116094),
  salmon: pexUrl(5463886),
  salmon2: pexUrl(4013723),
  sopa: pexUrl(1707270),
  sopa2: pexUrl(5737247),
  guiso: pexUrl(772518),
  tofu_wok: pexUrl(2347311),
  tofu: pexUrl(6811335),
  quinoa: pexUrl(9893176),
  quinoa2: pexUrl(9893127),
  quinoa3: pexUrl(34227771),
  hummus: pexUrl(14930604),
  ensalada: pexUrl(4198015),
  ensalada2: pexUrl(5966438),
  smoothie: pexUrl(12049998),
  fruta: pexUrl(838846),
  fruta2: pexUrl(15305308),
  fruta3: pexUrl(20035198),
  pasta: pexUrl(4730661),
  pasta2: pexUrl(6327594),
  gambas: pexUrl(27603332),
  gambas2: pexUrl(921367),
  pescado: pexUrl(1510714),
  pescado2: pexUrl(8956671),
  mediterranea: pexUrl(1211887),
  tacos: pexUrl(36498703),
  wraps: pexUrl(5112578),
  poke: pexUrl(15913416),
  guacamole: pexUrl(5737448),
  guacamole2: pexUrl(7227467),
};

const RECETAS = [
// ---------------- DESAYUNOS ----------------
{
  id:"r1", nombre:"Tostada de aguacate y huevo poché", emoji:"🥑", comida:"desayuno",
  tags:["vegetariano","rapido"], tiempo:10, kcal:340, macros:{p:16,c:28,g:19}, raciones:1, foto:FOTO.avocado_toast,
  ingredientes:[
    {n:"Pan integral", q:2, u:"rebanadas", cat:"despensa"},
    {n:"Aguacate", q:1, u:"ud", cat:"verduras"},
    {n:"Huevos", q:1, u:"ud", cat:"proteinas"},
    {n:"Zumo de limón", q:1, u:"cucharadita", cat:"otros"},
    {n:"Copos de guindilla", q:1, u:"pizca", cat:"despensa"},
  ],
  pasos:[
    "Tuesta el pan integral hasta que esté crujiente.",
    "Machaca el aguacate con el zumo de limón, sal y pimienta.",
    "Escalfa el huevo 3 minutos en agua casi hirviendo con un chorrito de vinagre.",
    "Unta el aguacate sobre el pan, coloca el huevo encima y añade la guindilla."
  ]
},
{
  id:"r2", nombre:"Porridge de avena con frutos rojos", emoji:"🥣", comida:"desayuno",
  tags:["vegetariano","rapido","vegano"], tiempo:8, kcal:310, macros:{p:11,c:52,g:7}, raciones:1, foto:FOTO.oatmeal,
  ingredientes:[
    {n:"Copos de avena", q:50, u:"g", cat:"despensa"},
    {n:"Bebida de avena", q:200, u:"ml", cat:"lacteos"},
    {n:"Frutos rojos congelados", q:80, u:"g", cat:"frutas"},
    {n:"Canela", q:1, u:"pizca", cat:"despensa"},
    {n:"Miel", q:1, u:"cucharadita", cat:"despensa"},
  ],
  pasos:[
    "Calienta la bebida de avena en un cazo a fuego medio.",
    "Añade los copos de avena y cuece 5 minutos removiendo.",
    "Incorpora los frutos rojos los últimos 2 minutos.",
    "Sirve con canela y un hilo de miel."
  ]
},
{
  id:"r3", nombre:"Bol de yogur, plátano y granola casera", emoji:"🍌", comida:"desayuno",
  tags:["vegetariano","rapido"], tiempo:5, kcal:290, macros:{p:14,c:38,g:9}, raciones:1, foto:FOTO.yogur_bowl,
  ingredientes:[
    {n:"Yogur griego natural", q:200, u:"g", cat:"lacteos"},
    {n:"Plátano", q:1, u:"ud", cat:"frutas"},
    {n:"Granola sin azúcar añadido", q:30, u:"g", cat:"despensa"},
    {n:"Nueces", q:10, u:"g", cat:"despensa"},
  ],
  pasos:[
    "Corta el plátano en rodajas.",
    "Sirve el yogur en un bol y añade el plátano encima.",
    "Termina con la granola y las nueces troceadas."
  ]
},
{
  id:"r4", nombre:"Tortilla francesa de espinacas y champiñón", emoji:"🍳", comida:"desayuno",
  tags:["vegetariano","alto-proteina","rapido"], tiempo:10, kcal:260, macros:{p:20,c:5,g:18}, raciones:1, foto:FOTO.huevos,
  ingredientes:[
    {n:"Huevos", q:3, u:"ud", cat:"proteinas"},
    {n:"Espinacas frescas", q:40, u:"g", cat:"verduras"},
    {n:"Champiñones", q:60, u:"g", cat:"verduras"},
    {n:"Aceite de oliva", q:1, u:"cucharada", cat:"despensa"},
  ],
  pasos:[
    "Saltea los champiñones laminados con el aceite hasta dorarlos.",
    "Añade las espinacas y deja que reduzcan.",
    "Bate los huevos con sal, vierte sobre las verduras y cuaja a fuego medio-bajo."
  ]
},
{
  id:"r25", nombre:"Bircher muesli de manzana y avena (de un día para otro)", emoji:"🍏", comida:"desayuno",
  tags:["vegetariano","meal-prep"], tiempo:10, kcal:320, macros:{p:12,c:48,g:9}, raciones:1, foto:FOTO.oatmeal2,
  ingredientes:[
    {n:"Copos de avena", q:50, u:"g", cat:"despensa"},
    {n:"Yogur natural", q:100, u:"g", cat:"lacteos"},
    {n:"Manzana", q:1, u:"ud", cat:"frutas"},
    {n:"Leche o bebida vegetal", q:80, u:"ml", cat:"lacteos"},
    {n:"Canela", q:1, u:"pizca", cat:"despensa"},
  ],
  pasos:[
    "Ralla la manzana con piel y mézclala con la avena, el yogur y la leche.",
    "Añade la canela y remueve bien.",
    "Tapa y deja reposar en la nevera toda la noche.",
    "Sirve frío, puedes añadir nueces o semillas por encima."
  ]
},
{
  id:"r26", nombre:"Tostada de pavo, aguacate y tomate", emoji:"🍅", comida:"desayuno",
  tags:["alto-proteina","rapido"], tiempo:8, kcal:300, macros:{p:19,c:26,g:13}, raciones:1, foto:FOTO.avocado_toast,
  ingredientes:[
    {n:"Pan integral", q:2, u:"rebanadas", cat:"despensa"},
    {n:"Pechuga de pavo en lonchas", q:60, u:"g", cat:"proteinas"},
    {n:"Aguacate", q:0.5, u:"ud", cat:"verduras"},
    {n:"Tomate", q:1, u:"ud", cat:"verduras"},
  ],
  pasos:[
    "Tuesta el pan integral.",
    "Machaca el aguacate y extiéndelo sobre las tostadas.",
    "Añade el pavo y rodajas de tomate por encima.",
    "Sazona con sal, pimienta y un chorrito de aceite de oliva."
  ]
},
{
  id:"r27", nombre:"Bowl de skyr con fresas y nueces", emoji:"🍓", comida:"desayuno",
  tags:["vegetariano","alto-proteina","rapido"], tiempo:5, kcal:270, macros:{p:22,c:24,g:8}, raciones:1, foto:FOTO.yogur_bowl2,
  ingredientes:[
    {n:"Skyr o yogur griego 0%", q:200, u:"g", cat:"lacteos"},
    {n:"Fresas", q:100, u:"g", cat:"frutas"},
    {n:"Nueces", q:15, u:"g", cat:"despensa"},
    {n:"Miel", q:1, u:"cucharadita", cat:"despensa"},
  ],
  pasos:[
    "Corta las fresas en trozos pequeños.",
    "Sirve el skyr en un bol y añade las fresas encima.",
    "Termina con las nueces troceadas y un hilo de miel."
  ]
},
{
  id:"r28", nombre:"Huevos rancheros ligeros", emoji:"🌶️", comida:"desayuno",
  tags:["vegetariano","alto-proteina"], tiempo:18, kcal:350, macros:{p:19,c:30,g:17}, raciones:2, foto:FOTO.huevos2,
  ingredientes:[
    {n:"Huevos", q:4, u:"ud", cat:"proteinas"},
    {n:"Tortillas de maíz", q:4, u:"ud", cat:"despensa"},
    {n:"Tomate triturado", q:200, u:"g", cat:"despensa"},
    {n:"Cebolla", q:0.5, u:"ud", cat:"verduras"},
    {n:"Guindilla o pimentón picante", q:1, u:"pizca", cat:"despensa"},
  ],
  pasos:[
    "Sofríe la cebolla picada y añade el tomate triturado con la guindilla; cocina 8 minutos.",
    "Casca los huevos sobre la salsa y cocina tapado hasta que cuajen a tu gusto.",
    "Calienta las tortillas y sirve los huevos con la salsa por encima."
  ]
},
{
  id:"r29", nombre:"Gachas de avena con manzana y canela", emoji:"🍎", comida:"desayuno",
  tags:["vegano","rapido"], tiempo:10, kcal:300, macros:{p:9,c:54,g:6}, raciones:1, foto:FOTO.oatmeal,
  ingredientes:[
    {n:"Copos de avena", q:50, u:"g", cat:"despensa"},
    {n:"Bebida de avena", q:200, u:"ml", cat:"lacteos"},
    {n:"Manzana", q:1, u:"ud", cat:"frutas"},
    {n:"Canela", q:1, u:"pizca", cat:"despensa"},
  ],
  pasos:[
    "Corta la manzana en dados pequeños.",
    "Cuece la avena con la bebida vegetal 5 minutos.",
    "Añade la manzana y la canela, cuece 2 minutos más.",
  ]
},
{
  id:"r30", nombre:"Tostada de hummus, pepino y rabanitos", emoji:"🥒", comida:"desayuno",
  tags:["vegano","rapido"], tiempo:7, kcal:250, macros:{p:10,c:32,g:9}, raciones:1, foto:FOTO.hummus,
  ingredientes:[
    {n:"Pan integral", q:2, u:"rebanadas", cat:"despensa"},
    {n:"Hummus", q:60, u:"g", cat:"despensa"},
    {n:"Pepino", q:0.5, u:"ud", cat:"verduras"},
    {n:"Rabanitos", q:4, u:"ud", cat:"verduras"},
  ],
  pasos:[
    "Tuesta el pan integral.",
    "Unta una capa generosa de hummus.",
    "Añade láminas finas de pepino y rabanito por encima."
  ]
},
{
  id:"r31", nombre:"Panqueques de avena y plátano", emoji:"🥞", comida:"desayuno",
  tags:["vegetariano"], tiempo:15, kcal:330, macros:{p:14,c:46,g:9}, raciones:2, foto:FOTO.oatmeal2,
  ingredientes:[
    {n:"Copos de avena", q:80, u:"g", cat:"despensa"},
    {n:"Plátano", q:2, u:"ud", cat:"frutas"},
    {n:"Huevos", q:2, u:"ud", cat:"proteinas"},
    {n:"Levadura química", q:1, u:"cucharadita", cat:"despensa"},
  ],
  pasos:[
    "Tritura la avena, el plátano, los huevos y la levadura hasta obtener una masa homogénea.",
    "Calienta una sartén antiadherente y vierte pequeñas porciones de masa.",
    "Cocina 2 minutos por lado hasta dorar. Sirve con fruta fresca."
  ]
},
{
  id:"r32", nombre:"Bowl de requesón con miel y nueces", emoji:"🍯", comida:"desayuno",
  tags:["vegetariano","alto-proteina","rapido"], tiempo:4, kcal:260, macros:{p:20,c:18,g:12}, raciones:1, foto:FOTO.yogur_bowl,
  ingredientes:[
    {n:"Requesón", q:180, u:"g", cat:"lacteos"},
    {n:"Nueces", q:15, u:"g", cat:"despensa"},
    {n:"Miel", q:1, u:"cucharadita", cat:"despensa"},
  ],
  pasos:[
    "Sirve el requesón en un bol.",
    "Añade las nueces troceadas y un hilo de miel por encima."
  ]
},

// ---------------- COMIDAS ----------------
{
  id:"r5", nombre:"Bowl de quinoa, garbanzos y verduras asadas", emoji:"🥗", comida:"comida",
  tags:["vegano","alto-proteina","sin-gluten"], tiempo:35, kcal:480, macros:{p:18,c:62,g:16}, raciones:2, foto:FOTO.quinoa,
  ingredientes:[
    {n:"Quinoa", q:150, u:"g", cat:"despensa"},
    {n:"Garbanzos cocidos", q:240, u:"g", cat:"proteinas"},
    {n:"Calabacín", q:1, u:"ud", cat:"verduras"},
    {n:"Pimiento rojo", q:1, u:"ud", cat:"verduras"},
    {n:"Aceite de oliva", q:2, u:"cucharadas", cat:"despensa"},
    {n:"Comino molido", q:1, u:"cucharadita", cat:"despensa"},
  ],
  pasos:[
    "Cuece la quinoa en agua con sal 12-15 minutos y escurre.",
    "Corta el calabacín y el pimiento, mézclalos con aceite, comino y sal.",
    "Asa las verduras 20 minutos a 200°C dándoles la vuelta a mitad.",
    "Mezcla la quinoa con los garbanzos y las verduras asadas."
  ]
},
{
  id:"r6", nombre:"Pechuga de pollo a la plancha con boniato", emoji:"🍗", comida:"comida",
  tags:["alto-proteina","sin-gluten"], tiempo:30, kcal:420, macros:{p:38,c:35,g:12}, raciones:2, foto:FOTO.pollo_verduras,
  ingredientes:[
    {n:"Pechuga de pollo", q:300, u:"g", cat:"proteinas"},
    {n:"Boniato", q:400, u:"g", cat:"verduras"},
    {n:"Brócoli", q:200, u:"g", cat:"verduras"},
    {n:"Pimentón dulce", q:1, u:"cucharadita", cat:"despensa"},
    {n:"Aceite de oliva", q:2, u:"cucharadas", cat:"despensa"},
  ],
  pasos:[
    "Corta el boniato en gajos, adereza con aceite y pimentón y hornea 25 min a 200°C.",
    "Cuece el brócoli al vapor 6-7 minutos.",
    "Salpimienta la pechuga y hazla a la plancha 4-5 minutos por lado.",
    "Sirve todo junto con un chorrito de aceite de oliva."
  ]
},
{
  id:"r7", nombre:"Salmón al horno con espárragos", emoji:"🐟", comida:"comida",
  tags:["alto-proteina","sin-gluten","rapido"], tiempo:20, kcal:440, macros:{p:34,c:8,g:29}, raciones:2, foto:FOTO.salmon,
  ingredientes:[
    {n:"Lomos de salmón", q:2, u:"ud", cat:"proteinas"},
    {n:"Espárragos verdes", q:1, u:"manojo", cat:"verduras"},
    {n:"Limón", q:1, u:"ud", cat:"frutas"},
    {n:"Aceite de oliva", q:1, u:"cucharada", cat:"despensa"},
    {n:"Ajo", q:2, u:"dientes", cat:"verduras"},
  ],
  pasos:[
    "Precalienta el horno a 200°C.",
    "Coloca el salmón y los espárragos en una bandeja con aceite, ajo picado, sal y rodajas de limón.",
    "Hornea 12-15 minutos hasta que el salmón esté hecho."
  ]
},
{
  id:"r8", nombre:"Lentejas estofadas con verduras", emoji:"🍲", comida:"comida",
  tags:["vegano","alto-proteina","meal-prep"], tiempo:45, kcal:390, macros:{p:22,c:56,g:8}, raciones:4, foto:FOTO.guiso,
  ingredientes:[
    {n:"Lentejas pardinas", q:300, u:"g", cat:"despensa"},
    {n:"Zanahoria", q:2, u:"ud", cat:"verduras"},
    {n:"Cebolla", q:1, u:"ud", cat:"verduras"},
    {n:"Pimiento verde", q:1, u:"ud", cat:"verduras"},
    {n:"Tomate triturado", q:200, u:"g", cat:"despensa"},
    {n:"Laurel", q:1, u:"hoja", cat:"despensa"},
  ],
  pasos:[
    "Sofríe la cebolla, el pimiento y la zanahoria picados.",
    "Añade el tomate triturado y sofríe 5 minutos más.",
    "Incorpora las lentejas, el laurel y agua hasta cubrir 2 dedos por encima.",
    "Cuece 30-35 minutos a fuego medio hasta que estén tiernas."
  ]
},
{
  id:"r9", nombre:"Wok de tofu, verduras y arroz integral", emoji:"🥢", comida:"comida",
  tags:["vegano","rapido"], tiempo:25, kcal:410, macros:{p:19,c:55,g:12}, raciones:2, foto:FOTO.tofu_wok,
  ingredientes:[
    {n:"Tofu firme", q:200, u:"g", cat:"proteinas"},
    {n:"Arroz integral", q:150, u:"g", cat:"despensa"},
    {n:"Zanahoria", q:1, u:"ud", cat:"verduras"},
    {n:"Pak choi o col", q:150, u:"g", cat:"verduras"},
    {n:"Salsa de soja", q:2, u:"cucharadas", cat:"despensa"},
    {n:"Jengibre fresco", q:1, u:"trozo", cat:"verduras"},
  ],
  pasos:[
    "Cuece el arroz integral según el envase.",
    "Corta el tofu en dados y dóralo en el wok con un poco de aceite.",
    "Añade las verduras en juliana y el jengibre, saltea 5 minutos.",
    "Incorpora la salsa de soja y sirve sobre el arroz."
  ]
},
{
  id:"r10", nombre:"Ensalada de garbanzos, atún y huevo", emoji:"🥙", comida:"comida",
  tags:["alto-proteina","rapido","sin-gluten"], tiempo:12, kcal:400, macros:{p:30,c:34,g:15}, raciones:2, foto:FOTO.ensalada,
  ingredientes:[
    {n:"Garbanzos cocidos", q:300, u:"g", cat:"proteinas"},
    {n:"Atún al natural", q:2, u:"latas", cat:"proteinas"},
    {n:"Huevo cocido", q:2, u:"ud", cat:"proteinas"},
    {n:"Tomate", q:2, u:"ud", cat:"verduras"},
    {n:"Cebolla morada", q:0.5, u:"ud", cat:"verduras"},
    {n:"Aceite de oliva", q:2, u:"cucharadas", cat:"despensa"},
  ],
  pasos:[
    "Escurre los garbanzos y el atún.",
    "Trocea el tomate y la cebolla morada.",
    "Mezcla todos los ingredientes en un bol grande.",
    "Añade el huevo cocido en cuartos, aceite, sal y pimienta."
  ]
},
{
  id:"r20", nombre:"Poke bowl de salmón marinado", emoji:"🍣", comida:"comida",
  tags:["alto-proteina","sin-gluten"], tiempo:25, kcal:460, macros:{p:29,c:52,g:14}, raciones:2, foto:FOTO.poke,
  ingredientes:[
    {n:"Salmón fresco para sashimi", q:250, u:"g", cat:"proteinas"},
    {n:"Arroz para sushi", q:200, u:"g", cat:"despensa"},
    {n:"Salsa de soja", q:3, u:"cucharadas", cat:"despensa"},
    {n:"Aguacate", q:1, u:"ud", cat:"verduras"},
    {n:"Edamame", q:100, u:"g", cat:"proteinas"},
    {n:"Pepino", q:1, u:"ud", cat:"verduras"},
  ],
  pasos:[
    "Cuece el arroz y déjalo enfriar un poco; adereza con un poco de vinagre de arroz.",
    "Corta el salmón en dados y marínalo 10 minutos en salsa de soja.",
    "Reparte el arroz en boles y añade el salmón, aguacate, edamame y pepino."
  ]
},
{
  id:"r21", nombre:"Pasta integral con pesto de espinacas y pollo", emoji:"🍝", comida:"comida",
  tags:["alto-proteina","rapido"], tiempo:20, kcal:520, macros:{p:34,c:58,g:16}, raciones:2, foto:FOTO.pasta,
  ingredientes:[
    {n:"Pasta integral", q:180, u:"g", cat:"despensa"},
    {n:"Pechuga de pollo", q:200, u:"g", cat:"proteinas"},
    {n:"Espinacas frescas", q:60, u:"g", cat:"verduras"},
    {n:"Piñones", q:20, u:"g", cat:"despensa"},
    {n:"Queso parmesano", q:20, u:"g", cat:"lacteos"},
  ],
  pasos:[
    "Cuece la pasta según el envase.",
    "Tritura las espinacas con los piñones, parmesano, aceite y sal para el pesto.",
    "Cocina el pollo en dados a la plancha.",
    "Mezcla la pasta escurrida con el pesto y el pollo."
  ]
},
{
  id:"r23", nombre:"Ensalada César ligera con pollo", emoji:"🥬", comida:"comida",
  tags:["alto-proteina","rapido"], tiempo:15, kcal:390, macros:{p:35,c:16,g:20}, raciones:2, foto:FOTO.mediterranea,
  ingredientes:[
    {n:"Pechuga de pollo", q:250, u:"g", cat:"proteinas"},
    {n:"Lechuga romana", q:1, u:"ud", cat:"verduras"},
    {n:"Yogur griego natural", q:60, u:"g", cat:"lacteos"},
    {n:"Parmesano rallado", q:20, u:"g", cat:"lacteos"},
    {n:"Pan integral para picatostes", q:1, u:"rebanada", cat:"despensa"},
  ],
  pasos:[
    "Cocina el pollo a la plancha y córtalo en tiras.",
    "Tuesta el pan en dados para los picatostes.",
    "Mezcla el yogur con parmesano, un poco de limón, ajo y anchoa opcional para el aliño.",
    "Monta la ensalada con la lechuga, el pollo, los picatostes y el aliño."
  ]
},
{
  id:"r33", nombre:"Bowl mediterráneo de garbanzos y queso feta", emoji:"🫒", comida:"comida",
  tags:["vegetariano","sin-gluten","rapido"], tiempo:15, kcal:420, macros:{p:16,c:42,g:20}, raciones:2, foto:FOTO.mediterranea,
  ingredientes:[
    {n:"Garbanzos cocidos", q:300, u:"g", cat:"proteinas"},
    {n:"Queso feta", q:80, u:"g", cat:"lacteos"},
    {n:"Pepino", q:1, u:"ud", cat:"verduras"},
    {n:"Tomate", q:2, u:"ud", cat:"verduras"},
    {n:"Aceitunas negras", q:40, u:"g", cat:"despensa"},
    {n:"Aceite de oliva", q:2, u:"cucharadas", cat:"despensa"},
  ],
  pasos:[
    "Trocea el pepino y el tomate.",
    "Mezcla los garbanzos con las verduras y las aceitunas.",
    "Añade el feta desmenuzado y el aceite de oliva por encima.",
    "Sazona con orégano, sal y pimienta."
  ]
},
{
  id:"r34", nombre:"Fajitas de pollo con pimientos", emoji:"🌮", comida:"comida",
  tags:["alto-proteina","rapido"], tiempo:20, kcal:430, macros:{p:31,c:38,g:15}, raciones:2, foto:FOTO.pollo_verduras2,
  ingredientes:[
    {n:"Pechuga de pollo", q:300, u:"g", cat:"proteinas"},
    {n:"Pimiento rojo y verde", q:2, u:"ud", cat:"verduras"},
    {n:"Cebolla", q:1, u:"ud", cat:"verduras"},
    {n:"Tortillas de trigo integral", q:4, u:"ud", cat:"despensa"},
    {n:"Pimentón y comino", q:1, u:"cucharadita", cat:"despensa"},
  ],
  pasos:[
    "Corta el pollo y las verduras en tiras.",
    "Saltea el pollo con las especias hasta dorarlo, retira.",
    "Saltea los pimientos y la cebolla 5-6 minutos.",
    "Junta todo, calienta las tortillas y sirve para montar las fajitas."
  ]
},
{
  id:"r35", nombre:"Curry de garbanzos y espinacas", emoji:"🍛", comida:"comida",
  tags:["vegano","meal-prep","sin-gluten"], tiempo:30, kcal:410, macros:{p:16,c:48,g:16}, raciones:3, foto:FOTO.sopa2,
  ingredientes:[
    {n:"Garbanzos cocidos", q:400, u:"g", cat:"proteinas"},
    {n:"Espinacas frescas", q:150, u:"g", cat:"verduras"},
    {n:"Leche de coco", q:200, u:"ml", cat:"lacteos"},
    {n:"Tomate triturado", q:200, u:"g", cat:"despensa"},
    {n:"Curry en polvo", q:2, u:"cucharaditas", cat:"despensa"},
    {n:"Cebolla", q:1, u:"ud", cat:"verduras"},
  ],
  pasos:[
    "Sofríe la cebolla picada con el curry en polvo.",
    "Añade el tomate triturado y cocina 5 minutos.",
    "Incorpora los garbanzos y la leche de coco, cuece 10 minutos.",
    "Añade las espinacas al final hasta que se ablanden."
  ]
},
{
  id:"r36", nombre:"Salteado de ternera y brócoli con arroz", emoji:"🥩", comida:"comida",
  tags:["alto-proteina","rapido"], tiempo:20, kcal:470, macros:{p:33,c:45,g:16}, raciones:2, foto:FOTO.tofu_wok,
  ingredientes:[
    {n:"Solomillo de ternera en tiras", q:250, u:"g", cat:"proteinas"},
    {n:"Brócoli", q:250, u:"g", cat:"verduras"},
    {n:"Arroz integral", q:150, u:"g", cat:"despensa"},
    {n:"Salsa de soja", q:2, u:"cucharadas", cat:"despensa"},
    {n:"Ajo", q:2, u:"dientes", cat:"verduras"},
  ],
  pasos:[
    "Cuece el arroz integral según el envase.",
    "Saltea la ternera a fuego fuerte 2-3 minutos y retira.",
    "Saltea el brócoli y el ajo 5 minutos, añade la carne y la soja.",
    "Sirve el salteado sobre el arroz."
  ]
},
{
  id:"r37", nombre:"Buddha bowl de boniato, garbanzos y tahini", emoji:"🍠", comida:"comida",
  tags:["vegano","sin-gluten"], tiempo:35, kcal:460, macros:{p:15,c:58,g:18}, raciones:2, foto:FOTO.quinoa3,
  ingredientes:[
    {n:"Boniato", q:300, u:"g", cat:"verduras"},
    {n:"Garbanzos cocidos", q:250, u:"g", cat:"proteinas"},
    {n:"Espinacas o canónigos", q:60, u:"g", cat:"verduras"},
    {n:"Tahini", q:2, u:"cucharadas", cat:"despensa"},
    {n:"Limón", q:1, u:"ud", cat:"frutas"},
  ],
  pasos:[
    "Corta el boniato en dados y hornea 25 min a 200°C con un poco de aceite.",
    "Saltea los garbanzos con comino y pimentón unos minutos.",
    "Mezcla el tahini con zumo de limón y agua para el aliño.",
    "Monta el bowl con las espinacas, el boniato, los garbanzos y el aliño."
  ]
},
{
  id:"r38", nombre:"Ensalada de pasta integral con atún", emoji:"🍝", comida:"comida",
  tags:["alto-proteina","rapido"], tiempo:18, kcal:440, macros:{p:26,c:52,g:14}, raciones:2, foto:FOTO.pasta2,
  ingredientes:[
    {n:"Pasta integral", q:180, u:"g", cat:"despensa"},
    {n:"Atún al natural", q:2, u:"latas", cat:"proteinas"},
    {n:"Tomates cherry", q:150, u:"g", cat:"verduras"},
    {n:"Aceitunas", q:40, u:"g", cat:"despensa"},
    {n:"Aceite de oliva", q:2, u:"cucharadas", cat:"despensa"},
  ],
  pasos:[
    "Cuece la pasta según el envase y enfríala bajo el grifo.",
    "Mezcla con el atún escurrido, los tomates cherry y las aceitunas.",
    "Aliña con aceite de oliva, sal y orégano."
  ]
},
{
  id:"r39", nombre:"Arroz integral con verduras, huevo y guisantes", emoji:"🍚", comida:"comida",
  tags:["vegetariano","rapido"], tiempo:20, kcal:400, macros:{p:15,c:60,g:11}, raciones:2, foto:FOTO.quinoa2,
  ingredientes:[
    {n:"Arroz integral", q:180, u:"g", cat:"despensa"},
    {n:"Huevos", q:2, u:"ud", cat:"proteinas"},
    {n:"Guisantes", q:120, u:"g", cat:"verduras"},
    {n:"Zanahoria", q:1, u:"ud", cat:"verduras"},
    {n:"Salsa de soja", q:1, u:"cucharada", cat:"despensa"},
  ],
  pasos:[
    "Cuece el arroz integral y resérvalo.",
    "Saltea la zanahoria en dados y los guisantes 5 minutos.",
    "Aparta las verduras, cuaja el huevo revuelto en la misma sartén.",
    "Mezcla todo con el arroz y la salsa de soja."
  ]
},
{
  id:"r40", nombre:"Wrap de pollo estilo César", emoji:"🌯", comida:"comida",
  tags:["alto-proteina","rapido"], tiempo:12, kcal:400, macros:{p:29,c:34,g:15}, raciones:2, foto:FOTO.wraps,
  ingredientes:[
    {n:"Tortillas de trigo integral", q:2, u:"ud", cat:"despensa"},
    {n:"Pechuga de pollo cocinada", q:200, u:"g", cat:"proteinas"},
    {n:"Lechuga", q:1, u:"puñado", cat:"verduras"},
    {n:"Yogur griego natural", q:40, u:"g", cat:"lacteos"},
    {n:"Parmesano rallado", q:15, u:"g", cat:"lacteos"},
  ],
  pasos:[
    "Corta el pollo en tiras.",
    "Mezcla el yogur con el parmesano y un poco de limón para el aliño.",
    "Rellena las tortillas con lechuga, pollo y el aliño.",
    "Enrolla bien apretado y corta por la mitad."
  ]
},
{
  id:"r41", nombre:"Poke bowl vegano de tofu y edamame", emoji:"🥢", comida:"comida",
  tags:["vegano","sin-gluten"], tiempo:20, kcal:430, macros:{p:20,c:54,g:13}, raciones:2, foto:FOTO.poke,
  ingredientes:[
    {n:"Tofu firme", q:200, u:"g", cat:"proteinas"},
    {n:"Arroz para sushi", q:180, u:"g", cat:"despensa"},
    {n:"Edamame", q:100, u:"g", cat:"proteinas"},
    {n:"Aguacate", q:1, u:"ud", cat:"verduras"},
    {n:"Zanahoria", q:1, u:"ud", cat:"verduras"},
    {n:"Salsa de soja", q:2, u:"cucharadas", cat:"despensa"},
  ],
  pasos:[
    "Cuece el arroz y déjalo templar con un poco de vinagre de arroz.",
    "Marca el tofu en dados en una sartén hasta dorarlo, añade soja.",
    "Reparte el arroz en boles y añade el tofu, edamame, aguacate y zanahoria en tiras."
  ]
},
{
  id:"r42", nombre:"Ensalada templada de lentejas y espinacas", emoji:"🥗", comida:"comida",
  tags:["vegano","alto-proteina","sin-gluten"], tiempo:15, kcal:380, macros:{p:19,c:44,g:12}, raciones:2, foto:FOTO.guiso,
  ingredientes:[
    {n:"Lentejas cocidas", q:300, u:"g", cat:"proteinas"},
    {n:"Espinacas frescas", q:80, u:"g", cat:"verduras"},
    {n:"Tomates secos", q:30, u:"g", cat:"despensa"},
    {n:"Cebolla morada", q:0.5, u:"ud", cat:"verduras"},
    {n:"Vinagre de módena", q:1, u:"cucharada", cat:"despensa"},
  ],
  pasos:[
    "Calienta las lentejas ligeramente en una sartén.",
    "Añade la cebolla en juliana y los tomates secos troceados.",
    "Incorpora las espinacas fuera del fuego para que se atemperen.",
    "Aliña con aceite de oliva y vinagre de módena."
  ]
},
{
  id:"r43", nombre:"Tacos de pescado con repollo morado", emoji:"🐟", comida:"comida",
  tags:["alto-proteina","rapido"], tiempo:18, kcal:400, macros:{p:27,c:36,g:14}, raciones:2, foto:FOTO.tacos,
  ingredientes:[
    {n:"Filetes de pescado blanco", q:250, u:"g", cat:"proteinas"},
    {n:"Tortillas de maíz", q:4, u:"ud", cat:"despensa"},
    {n:"Repollo morado", q:100, u:"g", cat:"verduras"},
    {n:"Lima", q:1, u:"ud", cat:"frutas"},
    {n:"Yogur natural", q:2, u:"cucharadas", cat:"lacteos"},
  ],
  pasos:[
    "Cocina el pescado a la plancha con sal y pimienta, luego desmígalo.",
    "Mezcla el repollo en juliana con zumo de lima.",
    "Calienta las tortillas y rellénalas con el pescado y el repollo.",
    "Termina con una cucharada de yogur."
  ]
},

// ---------------- CENAS ----------------
{
  id:"r11", nombre:"Crema de calabaza y zanahoria", emoji:"🥕", comida:"cena",
  tags:["vegano","rapido","sin-gluten"], tiempo:30, kcal:220, macros:{p:5,c:32,g:8}, raciones:3, foto:FOTO.sopa2,
  ingredientes:[
    {n:"Calabaza", q:500, u:"g", cat:"verduras"},
    {n:"Zanahoria", q:3, u:"ud", cat:"verduras"},
    {n:"Cebolla", q:1, u:"ud", cat:"verduras"},
    {n:"Caldo de verduras", q:600, u:"ml", cat:"despensa"},
    {n:"Aceite de oliva", q:1, u:"cucharada", cat:"despensa"},
  ],
  pasos:[
    "Sofríe la cebolla picada con el aceite.",
    "Añade la calabaza y la zanahoria en trozos.",
    "Cubre con el caldo y cuece 20 minutos hasta que estén tiernas.",
    "Tritura hasta obtener una crema fina."
  ]
},
{
  id:"r12", nombre:"Merluza en salsa verde con almejas", emoji:"🐠", comida:"cena",
  tags:["alto-proteina","sin-gluten"], tiempo:25, kcal:310, macros:{p:32,c:6,g:14}, raciones:2, foto:FOTO.pescado,
  ingredientes:[
    {n:"Lomos de merluza", q:2, u:"ud", cat:"proteinas"},
    {n:"Almejas", q:150, u:"g", cat:"proteinas"},
    {n:"Ajo", q:2, u:"dientes", cat:"verduras"},
    {n:"Perejil fresco", q:1, u:"manojo", cat:"verduras"},
    {n:"Vino blanco", q:50, u:"ml", cat:"despensa"},
  ],
  pasos:[
    "Sofríe el ajo picado en aceite sin que se queme.",
    "Añade el vino blanco y deja reducir un minuto.",
    "Incorpora la merluza y las almejas, tapa y cuece 8-10 minutos.",
    "Espolvorea con perejil picado antes de servir."
  ]
},
{
  id:"r13", nombre:"Revuelto de gambas y ajetes", emoji:"🦐", comida:"cena",
  tags:["alto-proteina","rapido","sin-gluten"], tiempo:12, kcal:280, macros:{p:26,c:5,g:17}, raciones:2, foto:FOTO.gambas2,
  ingredientes:[
    {n:"Huevos", q:4, u:"ud", cat:"proteinas"},
    {n:"Gambas peladas", q:200, u:"g", cat:"proteinas"},
    {n:"Ajetes", q:1, u:"manojo", cat:"verduras"},
    {n:"Aceite de oliva", q:1, u:"cucharada", cat:"despensa"},
  ],
  pasos:[
    "Saltea los ajetes troceados en el aceite hasta ablandarlos.",
    "Añade las gambas y cocina 2 minutos.",
    "Bate los huevos, vierte y revuelve a fuego bajo hasta la cuajada deseada."
  ]
},
{
  id:"r14", nombre:"Sopa de miso con tofu y algas", emoji:"🍜", comida:"cena",
  tags:["vegano","rapido"], tiempo:12, kcal:150, macros:{p:9,c:12,g:7}, raciones:2, foto:FOTO.sopa,
  ingredientes:[
    {n:"Pasta de miso", q:2, u:"cucharadas", cat:"despensa"},
    {n:"Tofu firme", q:100, u:"g", cat:"proteinas"},
    {n:"Alga wakame", q:5, u:"g", cat:"despensa"},
    {n:"Cebolleta", q:1, u:"ud", cat:"verduras"},
  ],
  pasos:[
    "Calienta 600 ml de agua sin que llegue a hervir con fuerza.",
    "Disuelve el miso en un poco de caldo aparte y luego incorpora.",
    "Añade el tofu en dados y el alga hidratada.",
    "Sirve con cebolleta picada."
  ]
},
{
  id:"r15", nombre:"Berenjenas rellenas de pavo y verduras", emoji:"🍆", comida:"cena",
  tags:["alto-proteina","sin-gluten"], tiempo:40, kcal:340, macros:{p:28,c:18,g:16}, raciones:2, foto:FOTO.pollo_verduras2,
  ingredientes:[
    {n:"Berenjenas", q:2, u:"ud", cat:"verduras"},
    {n:"Carne picada de pavo", q:250, u:"g", cat:"proteinas"},
    {n:"Cebolla", q:1, u:"ud", cat:"verduras"},
    {n:"Tomate triturado", q:100, u:"g", cat:"despensa"},
    {n:"Queso rallado light", q:40, u:"g", cat:"lacteos"},
  ],
  pasos:[
    "Corta las berenjenas por la mitad, vacía la pulpa y resérvala.",
    "Sofríe la cebolla, la pulpa de berenjena y el pavo picado.",
    "Añade el tomate triturado y cocina 10 minutos.",
    "Rellena las berenjenas, cubre con queso y hornea 20 min a 200°C."
  ]
},
{
  id:"r22", nombre:"Chili de alubias y boniato", emoji:"🌶️", comida:"cena",
  tags:["vegano","meal-prep","sin-gluten"], tiempo:35, kcal:360, macros:{p:16,c:54,g:8}, raciones:4, foto:FOTO.guiso,
  ingredientes:[
    {n:"Alubias rojas cocidas", q:300, u:"g", cat:"proteinas"},
    {n:"Boniato", q:300, u:"g", cat:"verduras"},
    {n:"Tomate triturado", q:400, u:"g", cat:"despensa"},
    {n:"Cebolla", q:1, u:"ud", cat:"verduras"},
    {n:"Pimentón picante", q:1, u:"cucharadita", cat:"despensa"},
    {n:"Comino molido", q:1, u:"cucharadita", cat:"despensa"},
  ],
  pasos:[
    "Sofríe la cebolla picada con las especias.",
    "Añade el boniato en dados pequeños y el tomate triturado.",
    "Cuece 15 minutos, incorpora las alubias y cuece 10 minutos más."
  ]
},
{
  id:"r44", nombre:"Merluza a la plancha con pisto casero", emoji:"🍆", comida:"cena",
  tags:["alto-proteina","sin-gluten"], tiempo:30, kcal:330, macros:{p:30,c:16,g:15}, raciones:2, foto:FOTO.pescado2,
  ingredientes:[
    {n:"Lomos de merluza", q:2, u:"ud", cat:"proteinas"},
    {n:"Calabacín", q:1, u:"ud", cat:"verduras"},
    {n:"Berenjena", q:1, u:"ud", cat:"verduras"},
    {n:"Pimiento rojo", q:1, u:"ud", cat:"verduras"},
    {n:"Tomate triturado", q:150, u:"g", cat:"despensa"},
  ],
  pasos:[
    "Corta todas las verduras en dados pequeños y sofríelas 15 minutos con el tomate.",
    "Salpimienta la merluza y hazla a la plancha 3-4 minutos por lado.",
    "Sirve el pescado sobre una base de pisto."
  ]
},
{
  id:"r45", nombre:"Pollo al curry ligero con leche de coco", emoji:"🍛", comida:"cena",
  tags:["alto-proteina","sin-gluten"], tiempo:25, kcal:390, macros:{p:32,c:20,g:19}, raciones:2, foto:FOTO.pollo_verduras,
  ingredientes:[
    {n:"Pechuga de pollo", q:300, u:"g", cat:"proteinas"},
    {n:"Leche de coco", q:150, u:"ml", cat:"lacteos"},
    {n:"Cebolla", q:1, u:"ud", cat:"verduras"},
    {n:"Curry en polvo", q:2, u:"cucharaditas", cat:"despensa"},
    {n:"Pimiento rojo", q:1, u:"ud", cat:"verduras"},
  ],
  pasos:[
    "Sofríe la cebolla y el pimiento con el curry en polvo.",
    "Añade el pollo en dados y dóralo 5 minutos.",
    "Incorpora la leche de coco y cuece 10-12 minutos a fuego suave."
  ]
},
{
  id:"r46", nombre:"Albóndigas de pavo en salsa de tomate", emoji:"🍝", comida:"cena",
  tags:["alto-proteina"], tiempo:35, kcal:360, macros:{p:29,c:24,g:16}, raciones:3, foto:FOTO.guiso,
  ingredientes:[
    {n:"Carne picada de pavo", q:400, u:"g", cat:"proteinas"},
    {n:"Huevo", q:1, u:"ud", cat:"proteinas"},
    {n:"Pan rallado integral", q:30, u:"g", cat:"despensa"},
    {n:"Tomate triturado", q:400, u:"g", cat:"despensa"},
    {n:"Cebolla", q:1, u:"ud", cat:"verduras"},
  ],
  pasos:[
    "Mezcla el pavo con el huevo, pan rallado, sal y especias; forma las albóndigas.",
    "Dóralas en una sartén con un poco de aceite.",
    "Sofríe la cebolla, añade el tomate y cuece 5 minutos.",
    "Incorpora las albóndigas a la salsa y cuece 15 minutos más."
  ]
},
{
  id:"r47", nombre:"Salteado de gambas y calabacín al ajillo", emoji:"🦐", comida:"cena",
  tags:["alto-proteina","rapido","sin-gluten"], tiempo:15, kcal:260, macros:{p:24,c:10,g:14}, raciones:2, foto:FOTO.gambas,
  ingredientes:[
    {n:"Gambas peladas", q:250, u:"g", cat:"proteinas"},
    {n:"Calabacín", q:2, u:"ud", cat:"verduras"},
    {n:"Ajo", q:3, u:"dientes", cat:"verduras"},
    {n:"Guindilla", q:1, u:"pizca", cat:"despensa"},
  ],
  pasos:[
    "Corta el calabacín en medias lunas.",
    "Saltea el ajo laminado y la guindilla en aceite.",
    "Añade el calabacín y cocina 5 minutos.",
    "Incorpora las gambas y saltea 2-3 minutos más."
  ]
},
{
  id:"r48", nombre:"Sopa de pollo y verduras casera", emoji:"🍲", comida:"cena",
  tags:["alto-proteina","meal-prep"], tiempo:40, kcal:240, macros:{p:22,c:18,g:8}, raciones:4, foto:FOTO.sopa,
  ingredientes:[
    {n:"Pechuga o contramuslo de pollo", q:300, u:"g", cat:"proteinas"},
    {n:"Zanahoria", q:2, u:"ud", cat:"verduras"},
    {n:"Puerro", q:1, u:"ud", cat:"verduras"},
    {n:"Apio", q:1, u:"rama", cat:"verduras"},
    {n:"Fideos finos", q:60, u:"g", cat:"despensa"},
  ],
  pasos:[
    "Cuece el pollo con las verduras troceadas en agua con sal 25 minutos.",
    "Retira el pollo, desmígalo y devuélvelo a la olla.",
    "Añade los fideos y cuece 5-6 minutos más."
  ]
},
{
  id:"r49", nombre:"Tortilla de calabacín y cebolla", emoji:"🍳", comida:"cena",
  tags:["vegetariano","rapido"], tiempo:20, kcal:290, macros:{p:17,c:12,g:19}, raciones:2, foto:FOTO.huevos,
  ingredientes:[
    {n:"Huevos", q:5, u:"ud", cat:"proteinas"},
    {n:"Calabacín", q:1, u:"ud", cat:"verduras"},
    {n:"Cebolla", q:1, u:"ud", cat:"verduras"},
    {n:"Aceite de oliva", q:2, u:"cucharadas", cat:"despensa"},
  ],
  pasos:[
    "Pocha la cebolla y el calabacín en dados con el aceite 12-15 minutos.",
    "Bate los huevos con sal e incorpora las verduras.",
    "Cuaja la tortilla en la sartén 4-5 minutos por lado."
  ]
},
{
  id:"r50", nombre:"Bacalao al horno con tomate y aceitunas", emoji:"🐟", comida:"cena",
  tags:["alto-proteina","sin-gluten"], tiempo:25, kcal:300, macros:{p:31,c:10,g:14}, raciones:2, foto:FOTO.pescado,
  ingredientes:[
    {n:"Lomos de bacalao desalado", q:2, u:"ud", cat:"proteinas"},
    {n:"Tomate triturado", q:200, u:"g", cat:"despensa"},
    {n:"Aceitunas negras", q:30, u:"g", cat:"despensa"},
    {n:"Ajo", q:2, u:"dientes", cat:"verduras"},
  ],
  pasos:[
    "Sofríe el ajo y añade el tomate triturado, cuece 10 minutos.",
    "Coloca el bacalao en una bandeja de horno y cubre con la salsa y las aceitunas.",
    "Hornea 12-15 minutos a 200°C."
  ]
},
{
  id:"r51", nombre:"Gazpacho andaluz con picatostes integrales", emoji:"🍅", comida:"cena",
  tags:["vegano","rapido","sin-gluten"], tiempo:15, kcal:180, macros:{p:4,c:22,g:8}, raciones:3, foto:FOTO.sopa2,
  ingredientes:[
    {n:"Tomate maduro", q:800, u:"g", cat:"verduras"},
    {n:"Pimiento verde", q:1, u:"ud", cat:"verduras"},
    {n:"Pepino", q:1, u:"ud", cat:"verduras"},
    {n:"Ajo", q:1, u:"diente", cat:"verduras"},
    {n:"Aceite de oliva", q:3, u:"cucharadas", cat:"despensa"},
    {n:"Pan integral para picatostes", q:1, u:"rebanada", cat:"despensa"},
  ],
  pasos:[
    "Trocea todas las verduras.",
    "Tritura junto con el aceite, un chorrito de vinagre y sal hasta que quede fino.",
    "Cuela si lo prefieres más suave y enfría en la nevera.",
    "Sirve con picatostes de pan integral tostado."
  ]
},

// ---------------- SNACKS ----------------
{
  id:"r16", nombre:"Hummus casero con crudités", emoji:"🥕", comida:"snack",
  tags:["vegano","rapido","sin-gluten"], tiempo:10, kcal:180, macros:{p:8,c:18,g:9}, raciones:4, foto:FOTO.hummus,
  ingredientes:[
    {n:"Garbanzos cocidos", q:240, u:"g", cat:"proteinas"},
    {n:"Tahini", q:2, u:"cucharadas", cat:"despensa"},
    {n:"Limón", q:1, u:"ud", cat:"frutas"},
    {n:"Ajo", q:1, u:"diente", cat:"verduras"},
    {n:"Zanahoria y apio para mojar", q:200, u:"g", cat:"verduras"},
  ],
  pasos:[
    "Tritura los garbanzos con el tahini, el zumo de limón, el ajo y un poco de agua.",
    "Ajusta de sal y consistencia con más agua si hace falta.",
    "Sirve con bastones de zanahoria y apio."
  ]
},
{
  id:"r17", nombre:"Batido de proteína, plátano y cacao", emoji:"🥤", comida:"snack",
  tags:["alto-proteina","rapido","vegetariano"], tiempo:5, kcal:260, macros:{p:24,c:30,g:5}, raciones:1, foto:FOTO.smoothie,
  ingredientes:[
    {n:"Proteína en polvo (sabor neutro/cacao)", q:1, u:"cacito", cat:"despensa"},
    {n:"Plátano", q:1, u:"ud", cat:"frutas"},
    {n:"Bebida de avena", q:250, u:"ml", cat:"lacteos"},
    {n:"Cacao puro en polvo", q:1, u:"cucharadita", cat:"despensa"},
  ],
  pasos:[
    "Pon todos los ingredientes en la batidora.",
    "Bate 30-40 segundos hasta que quede cremoso.",
    "Sirve bien frío, ideal antes o después de entrenar."
  ]
},
{
  id:"r18", nombre:"Yogur con nueces y miel", emoji:"🍯", comida:"snack",
  tags:["vegetariano","rapido"], tiempo:3, kcal:210, macros:{p:12,c:16,g:11}, raciones:1, foto:FOTO.yogur_bowl,
  ingredientes:[
    {n:"Yogur griego natural", q:150, u:"g", cat:"lacteos"},
    {n:"Nueces", q:15, u:"g", cat:"despensa"},
    {n:"Miel", q:1, u:"cucharadita", cat:"despensa"},
  ],
  pasos:[
    "Sirve el yogur en un bol.",
    "Añade las nueces troceadas y un hilo de miel."
  ]
},
{
  id:"r19", nombre:"Guacamole con totopos de maíz al horno", emoji:"🥑", comida:"snack",
  tags:["vegano","rapido"], tiempo:12, kcal:230, macros:{p:4,c:24,g:13}, raciones:2, foto:FOTO.guacamole,
  ingredientes:[
    {n:"Aguacate", q:2, u:"ud", cat:"verduras"},
    {n:"Tomate", q:1, u:"ud", cat:"verduras"},
    {n:"Lima", q:1, u:"ud", cat:"frutas"},
    {n:"Tortillas de maíz", q:4, u:"ud", cat:"despensa"},
    {n:"Cilantro fresco", q:1, u:"puñado", cat:"verduras"},
  ],
  pasos:[
    "Corta las tortillas en triángulos y hornea 8-10 min a 200°C hasta crujientes.",
    "Machaca el aguacate con el zumo de lima, sal y el tomate picado.",
    "Añade cilantro picado y sirve con los totopos."
  ]
},
{
  id:"r24", nombre:"Macedonia de fruta de temporada", emoji:"🍇", comida:"snack",
  tags:["vegano","rapido","sin-gluten"], tiempo:8, kcal:120, macros:{p:1,c:29,g:0}, raciones:2, foto:FOTO.fruta3,
  ingredientes:[
    {n:"Manzana", q:1, u:"ud", cat:"frutas"},
    {n:"Kiwi", q:2, u:"ud", cat:"frutas"},
    {n:"Uvas", q:100, u:"g", cat:"frutas"},
    {n:"Zumo de naranja", q:1, u:"ud", cat:"frutas"},
  ],
  pasos:[
    "Corta toda la fruta en trozos pequeños.",
    "Exprime la naranja por encima para que no se oxide.",
    "Mezcla bien y deja reposar 10 minutos en la nevera antes de servir."
  ]
},
{
  id:"r52", nombre:"Bastones de verdura con guacamole", emoji:"🥒", comida:"snack",
  tags:["vegano","rapido","sin-gluten"], tiempo:8, kcal:170, macros:{p:3,c:14,g:12}, raciones:2, foto:FOTO.guacamole2,
  ingredientes:[
    {n:"Aguacate", q:1, u:"ud", cat:"verduras"},
    {n:"Lima", q:0.5, u:"ud", cat:"frutas"},
    {n:"Zanahoria", q:2, u:"ud", cat:"verduras"},
    {n:"Pepino", q:1, u:"ud", cat:"verduras"},
    {n:"Pimiento rojo", q:1, u:"ud", cat:"verduras"},
  ],
  pasos:[
    "Machaca el aguacate con el zumo de lima y sal.",
    "Corta la zanahoria, el pepino y el pimiento en bastones.",
    "Sirve los bastones con el guacamole para mojar."
  ]
},
{
  id:"r53", nombre:"Bolitas energéticas de dátiles y avena", emoji:"⚡", comida:"snack",
  tags:["vegano","meal-prep"], tiempo:15, kcal:150, macros:{p:3,c:22,g:6}, raciones:6, foto:FOTO.oatmeal,
  ingredientes:[
    {n:"Dátiles sin hueso", q:150, u:"g", cat:"frutas"},
    {n:"Copos de avena", q:80, u:"g", cat:"despensa"},
    {n:"Cacao puro en polvo", q:2, u:"cucharadas", cat:"despensa"},
    {n:"Mantequilla de cacahuete", q:2, u:"cucharadas", cat:"despensa"},
  ],
  pasos:[
    "Tritura los dátiles con la avena, el cacao y la mantequilla de cacahuete.",
    "Forma bolitas pequeñas con las manos.",
    "Refrigera al menos 30 minutos antes de comer; se conservan varios días en la nevera."
  ]
},
{
  id:"r54", nombre:"Batido de fresa y espinaca", emoji:"🍓", comida:"snack",
  tags:["vegano","rapido"], tiempo:5, kcal:150, macros:{p:4,c:28,g:2}, raciones:1, foto:FOTO.smoothie,
  ingredientes:[
    {n:"Fresas", q:150, u:"g", cat:"frutas"},
    {n:"Espinacas frescas", q:30, u:"g", cat:"verduras"},
    {n:"Bebida de avena", q:200, u:"ml", cat:"lacteos"},
    {n:"Plátano", q:0.5, u:"ud", cat:"frutas"},
  ],
  pasos:[
    "Pon todos los ingredientes en la batidora.",
    "Bate hasta que quede una textura fina y homogénea.",
    "Sirve bien frío."
  ]
},
{
  id:"r55", nombre:"Rollitos de lechuga con pollo picante", emoji:"🥬", comida:"snack",
  tags:["alto-proteina","rapido","sin-gluten"], tiempo:15, kcal:220, macros:{p:22,c:8,g:11}, raciones:2, foto:FOTO.wraps,
  ingredientes:[
    {n:"Pechuga de pollo", q:200, u:"g", cat:"proteinas"},
    {n:"Lechuga iceberg (hojas grandes)", q:8, u:"ud", cat:"verduras"},
    {n:"Salsa picante o sriracha", q:1, u:"cucharada", cat:"despensa"},
    {n:"Zanahoria rallada", q:1, u:"ud", cat:"verduras"},
  ],
  pasos:[
    "Cocina el pollo desmenuzado en una sartén con la salsa picante.",
    "Lava y seca bien las hojas de lechuga.",
    "Rellena cada hoja con el pollo y la zanahoria rallada, enrolla y sirve."
  ]
},
{
  id:"r56", nombre:"Bowl de fresas, arándanos y queso fresco", emoji:"🫐", comida:"snack",
  tags:["vegetariano","rapido","sin-gluten"], tiempo:5, kcal:190, macros:{p:11,c:20,g:7}, raciones:1, foto:FOTO.fruta,
  ingredientes:[
    {n:"Queso fresco batido", q:150, u:"g", cat:"lacteos"},
    {n:"Fresas", q:80, u:"g", cat:"frutas"},
    {n:"Arándanos", q:50, u:"g", cat:"frutas"},
  ],
  pasos:[
    "Corta las fresas en trozos.",
    "Sirve el queso fresco batido en un bol.",
    "Añade las fresas y los arándanos por encima."
  ]
},
];
