// Base de datos de rutinas de SaludaApp
function pexUrlR(id){
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=700`;
}
const FOTO_R = {
  pecho_banco: pexUrlR(7187890),
  pecho_mancuernas: pexUrlR(3490348),
  flexiones_gym: pexUrlR(4162491),
  flexiones_casa: pexUrlR(6975784),
  flexiones_blanco: pexUrlR(176782),
  sentadilla_casa: pexUrlR(8032893),
  jogging: pexUrlR(2803160),
  cardio_escaleras: pexUrlR(5036936),
  yoga_mat: pexUrlR(6740753),
  estiramiento: pexUrlR(5037407),
  estiramiento2: pexUrlR(4148919),
  pesas_bn: pexUrlR(949131),
  dumbbell_biceps: pexUrlR(9073247),
};

const RUTINAS = [
{
  id:"d1", nombre:"Plancha y core exprés", emoji:"🧱", tipo:"core", lugar:"casa",
  nivel:"principiante", duracion:10, kcal:60, foto:FOTO_R.flexiones_casa,
  objetivo:"Ideal para empezar hoy mismo: activa todo el abdomen sin material.",
  ejercicios:[
    {n:"Plancha frontal", detalle:"3 series de 20-30 segundos"},
    {n:"Plancha lateral (cada lado)", detalle:"2 series de 15-20 segundos"},
    {n:"Elevación de rodillas al pecho, de pie", detalle:"3 series de 15 repeticiones"},
    {n:"Respiración abdominal (vacuum)", detalle:"2 series de 20 segundos"},
  ]
},
{
  id:"d2", nombre:"Abdomen completo en casa", emoji:"🔥", tipo:"core", lugar:"casa",
  nivel:"principiante", duracion:15, kcal:90, foto:FOTO_R.estiramiento2,
  objetivo:"Rutina redonda para trabajar cintura y abdomen desde varios ángulos.",
  ejercicios:[
    {n:"Crunch abdominal", detalle:"3 series de 15 repeticiones"},
    {n:"Bicicleta (crunch oblicuo)", detalle:"3 series de 20 repeticiones"},
    {n:"Elevación de piernas tumbado", detalle:"3 series de 12 repeticiones"},
    {n:"Plancha con toque de hombro", detalle:"2 series de 12 repeticiones por lado"},
    {n:"Plancha frontal final", detalle:"1 serie hasta el fallo"},
  ]
},
{
  id:"d3", nombre:"Circuito quema-grasa de cintura", emoji:"⚡", tipo:"hiit", lugar:"casa",
  nivel:"intermedio", duracion:20, kcal:170, foto:FOTO_R.flexiones_blanco,
  objetivo:"Combina cardio y core para acelerar la pérdida de grasa abdominal.",
  ejercicios:[
    {n:"Jumping jacks", detalle:"40 segundos trabajo / 20 descanso"},
    {n:"Mountain climbers", detalle:"40 segundos trabajo / 20 descanso"},
    {n:"Sentadilla con salto", detalle:"40 segundos trabajo / 20 descanso"},
    {n:"Plancha con toque de hombro", detalle:"40 segundos trabajo / 20 descanso"},
    {n:"Repite el circuito", detalle:"3-4 vueltas completas"},
  ]
},
{
  id:"d4", nombre:"Empuje de pecho con mancuernas", emoji:"🏋️", tipo:"pecho", lugar:"casa",
  nivel:"principiante", duracion:20, kcal:120, foto:FOTO_R.pecho_mancuernas,
  objetivo:"Para marcar pecho: solo necesitas un par de mancuernas o botellas de agua.",
  ejercicios:[
    {n:"Press de pecho tumbado con mancuernas", detalle:"4 series de 10-12 repeticiones"},
    {n:"Aperturas de pecho tumbado", detalle:"3 series de 12 repeticiones"},
    {n:"Flexiones de rodillas o completas", detalle:"3 series al fallo controlado"},
    {n:"Press pecho a una mano (alterno)", detalle:"2 series de 10 por lado"},
  ]
},
{
  id:"d5", nombre:"Flexiones progresivas", emoji:"💪", tipo:"pecho", lugar:"casa",
  nivel:"principiante", duracion:12, kcal:80, foto:FOTO_R.flexiones_casa,
  objetivo:"Progresión sencilla para ganar fuerza de pecho semana a semana.",
  ejercicios:[
    {n:"Flexiones inclinadas (manos en banco/silla)", detalle:"3 series de 10-12 repeticiones"},
    {n:"Flexiones de rodillas", detalle:"3 series de 8-10 repeticiones"},
    {n:"Flexión negativa lenta (bajar 4 segundos)", detalle:"3 series de 5 repeticiones"},
    {n:"Plancha final", detalle:"1 serie de 30 segundos"},
  ]
},
{
  id:"d6", nombre:"Pecho y hombros en el gimnasio", emoji:"🏋️‍♂️", tipo:"pecho", lugar:"gimnasio",
  nivel:"intermedio", duracion:35, kcal:220, foto:FOTO_R.pecho_banco,
  objetivo:"Sesión completa de empuje si tienes acceso a gimnasio.",
  ejercicios:[
    {n:"Press banca con barra o mancuernas", detalle:"4 series de 8-10 repeticiones"},
    {n:"Press inclinado con mancuernas", detalle:"3 series de 10 repeticiones"},
    {n:"Aperturas en polea o mancuernas", detalle:"3 series de 12 repeticiones"},
    {n:"Press de hombro sentado", detalle:"3 series de 10 repeticiones"},
    {n:"Fondos en máquina asistida o banco", detalle:"3 series de 10-12 repeticiones"},
  ]
},
{
  id:"d7", nombre:"Full body 20 minutos sin material", emoji:"🤸", tipo:"fullbody", lugar:"casa",
  nivel:"principiante", duracion:20, kcal:150, foto:FOTO_R.sentadilla_casa,
  objetivo:"Cuerpo completo en poco tiempo, perfecto para antes o después del turno.",
  ejercicios:[
    {n:"Sentadilla con peso corporal", detalle:"3 series de 15 repeticiones"},
    {n:"Flexiones", detalle:"3 series de 10-12 repeticiones"},
    {n:"Zancadas alternas", detalle:"3 series de 10 por pierna"},
    {n:"Plancha", detalle:"3 series de 25-30 segundos"},
    {n:"Puente de glúteo", detalle:"3 series de 15 repeticiones"},
  ]
},
{
  id:"d8", nombre:"HIIT 15 minutos quema-grasa", emoji:"🔥", tipo:"hiit", lugar:"casa",
  nivel:"intermedio", duracion:15, kcal:180, foto:FOTO_R.cardio_escaleras,
  objetivo:"Alta intensidad para maximizar el gasto calórico en poco tiempo.",
  ejercicios:[
    {n:"Burpees", detalle:"30 segundos trabajo / 30 descanso"},
    {n:"Sentadilla con salto", detalle:"30 segundos trabajo / 30 descanso"},
    {n:"Escaladores (mountain climbers)", detalle:"30 segundos trabajo / 30 descanso"},
    {n:"Skipping alto (rodillas al pecho)", detalle:"30 segundos trabajo / 30 descanso"},
    {n:"Repite el circuito", detalle:"3 vueltas completas"},
  ]
},
{
  id:"d9", nombre:"Caminata rápida o trote suave", emoji:"🏃", tipo:"cardio", lugar:"exterior",
  nivel:"principiante", duracion:30, kcal:200, foto:FOTO_R.jogging,
  objetivo:"Cardio de baja exigencia articular, ideal para quemar grasa de forma sostenible.",
  ejercicios:[
    {n:"Calentamiento caminando", detalle:"5 minutos ritmo suave"},
    {n:"Caminata rápida o trote ligero", detalle:"20 minutos a ritmo constante"},
    {n:"Vuelta a la calma caminando", detalle:"5 minutos ritmo suave"},
  ]
},
{
  id:"d10", nombre:"Piernas y glúteos en casa", emoji:"🦵", tipo:"piernas", lugar:"casa",
  nivel:"principiante", duracion:18, kcal:130, foto:FOTO_R.sentadilla_casa,
  objetivo:"Tren inferior fuerte para mejorar el metabolismo general.",
  ejercicios:[
    {n:"Sentadilla peso corporal", detalle:"4 series de 15 repeticiones"},
    {n:"Zancadas alternas", detalle:"3 series de 12 por pierna"},
    {n:"Elevación de talones (gemelo)", detalle:"3 series de 20 repeticiones"},
    {n:"Puente de glúteo", detalle:"3 series de 15 repeticiones"},
  ]
},
{
  id:"d11", nombre:"Fuerza full body en gimnasio", emoji:"🏋️", tipo:"fullbody", lugar:"gimnasio",
  nivel:"intermedio", duracion:45, kcal:280, foto:FOTO_R.dumbbell_biceps,
  objetivo:"Sesión de fuerza completa, ideal 2-3 veces por semana con descanso entre medias.",
  ejercicios:[
    {n:"Sentadilla con barra o máquina", detalle:"4 series de 8-10 repeticiones"},
    {n:"Press banca", detalle:"4 series de 8-10 repeticiones"},
    {n:"Remo con mancuerna o máquina", detalle:"4 series de 10 repeticiones"},
    {n:"Press de hombro", detalle:"3 series de 10 repeticiones"},
    {n:"Plancha final", detalle:"3 series de 30 segundos"},
  ]
},
{
  id:"d12", nombre:"Estiramientos post-turno de noche", emoji:"🌙", tipo:"movilidad", lugar:"casa",
  nivel:"principiante", duracion:10, kcal:30, foto:FOTO_R.yoga_mat,
  objetivo:"Para relajar cuerpo y mente al volver del turno antes de dormir.",
  ejercicios:[
    {n:"Estiramiento de espalda baja (postura del niño)", detalle:"1 minuto"},
    {n:"Estiramiento de isquiotibiales sentado", detalle:"1 minuto por pierna"},
    {n:"Estiramiento de cuello y trapecios", detalle:"30 segundos por lado"},
    {n:"Respiración profunda tumbado", detalle:"2-3 minutos"},
  ]
},
{
  id:"d13", nombre:"Movilidad matutina", emoji:"🌅", tipo:"movilidad", lugar:"casa",
  nivel:"principiante", duracion:10, kcal:40, foto:FOTO_R.estiramiento,
  objetivo:"Despierta el cuerpo antes de empezar el día, sin sudar.",
  ejercicios:[
    {n:"Círculos de brazos y hombros", detalle:"1 minuto"},
    {n:"Rotaciones de cadera", detalle:"1 minuto"},
    {n:"Gato-vaca (movilidad de espalda)", detalle:"10 repeticiones"},
    {n:"Zancada con giro de tronco", detalle:"8 por lado"},
  ]
},
{
  id:"d14", nombre:"Rutina exprés de 10 minutos (sin excusas)", emoji:"⏱️", tipo:"fullbody", lugar:"casa",
  nivel:"principiante", duracion:10, kcal:70, foto:FOTO_R.flexiones_gym,
  objetivo:"Para los días con poco tiempo: mantiene la racha viva.",
  ejercicios:[
    {n:"Sentadillas", detalle:"1 minuto"},
    {n:"Flexiones", detalle:"1 minuto"},
    {n:"Plancha", detalle:"1 minuto"},
    {n:"Repite el bloque", detalle:"2-3 vueltas"},
  ]
},
{
  id:"d15", nombre:"Core y respiración para reducir cintura", emoji:"🌀", tipo:"core", lugar:"casa",
  nivel:"principiante", duracion:12, kcal:50, foto:FOTO_R.flexiones_blanco,
  objetivo:"Técnica de vacuum y core profundo, muy usada para marcar cintura.",
  ejercicios:[
    {n:"Vacuum abdominal de pie", detalle:"3 series de 15-20 segundos"},
    {n:"Plancha frontal", detalle:"3 series de 30 segundos"},
    {n:"Elevación de piernas colgado o tumbado", detalle:"3 series de 10-12 repeticiones"},
    {n:"Giro ruso suave (sin peso o con botella)", detalle:"3 series de 16 repeticiones"},
  ]
},
{
  id:"d16", nombre:"Espalda y postura", emoji:"🧍", tipo:"fullbody", lugar:"casa",
  nivel:"principiante", duracion:15, kcal:90, foto:FOTO_R.estiramiento2,
  objetivo:"Compensa las horas de pie o en tensión en la fábrica; mejora la postura.",
  ejercicios:[
    {n:"Remo invertido con toalla en puerta o mesa", detalle:"3 series de 12 repeticiones"},
    {n:"Superman (extensión lumbar)", detalle:"3 series de 12 repeticiones"},
    {n:"Estiramiento de pecho en marco de puerta", detalle:"30 segundos por lado"},
    {n:"Face pull con banda elástica (si tienes)", detalle:"3 series de 15 repeticiones"},
  ]
},
];
