// Array de preguntas
const questions = [
  {
    question: "¿Cuántos calcetines ha roto Choquito?",
    answers: ["5 calcetines", "10 calcetines", "15 calcetines"],
    correct: 1, // índice de la respuesta correcta (0, 1 o 2)
    type: "text" // tipo de pregunta: text o image
  },
  {
    question: "¿Cuál es la capital de Francia?",
    answers: ["Londres", "París", "Madrid"],
    correct: 1,
    type: "text"
  },
  {
    question: "¿Cuál es Choquito?",
    answers: [
      { image: "imgs/choco.jpg", text: "Opción A" },
      { image: "imgs/R.jpg", text: "Opción B" }
    ],
    correct: 0,
    type: "image"
  },
  {
    question: "¿Cuántos planetas hay en el sistema solar?",
    answers: ["7 planetas", "8 planetas", "9 planetas"],
    correct: 1,
    type: "text"
  }
  // Añade más preguntas aquí
];

// Variables globales
let currentQuestion = 0;

// Cargar pregunta actual
function loadQuestion() {
  if (currentQuestion >= questions.length) {
    // Todas las preguntas completadas
    showCompletionMessage();
    return;
  }

  const q = questions[currentQuestion];
  
  // Actualizar el número de pregunta
  document.querySelector('.question-label').textContent = `Pregunta ${currentQuestion + 1}`;
  
  // Actualizar el texto de la pregunta
  document.querySelector('.bubble-content').textContent = q.question;
  
  // Crear botones de respuesta
  const answersContainer = document.getElementById('answers-container');
  answersContainer.innerHTML = ''; // Limpiar respuestas anteriores
  
  // Añadir clase según el tipo de pregunta
  if (q.type === 'image') {
    answersContainer.classList.add('image-answers');
  } else {
    answersContainer.classList.remove('image-answers');
  }
  
  q.answers.forEach((answer, index) => {
    const button = document.createElement('div');
    button.className = 'answer-button tap-effect';
    
    if (q.type === 'image') {
      // Pregunta con imágenes
      const img = document.createElement('img');
      img.src = answer.image;
      img.alt = answer.text;
      img.className = 'answer-image';
      button.appendChild(img);
      
      if (answer.text) {
        const label = document.createElement('div');
        label.className = 'answer-label';
        label.textContent = answer.text;
        button.appendChild(label);
      }
    } else {
      // Pregunta de texto normal
      button.textContent = answer;
    }
    
    button.onclick = () => checkAnswer(index);
    answersContainer.appendChild(button);
  });
  
  // Ocultar mensaje de error si existe
  const errorMsg = document.getElementById('error-message');
  if (errorMsg) {
    errorMsg.style.display = 'none';
  }
}

// Verificar respuesta
function checkAnswer(selectedIndex) {
  const q = questions[currentQuestion];
  const errorMsg = document.getElementById('error-message');
  
  if (selectedIndex === q.correct) {
    // Respuesta correcta
    currentQuestion++;
    setTimeout(() => {
      loadQuestion();
    }, 500);
  } else {
    // Respuesta incorrecta
    errorMsg.style.display = 'block';
    errorMsg.textContent = '❌ Respuesta incorrecta. ¡Inténtalo de nuevo!';
  }
}

// Mostrar mensaje de finalización
function showCompletionMessage() {
  document.querySelector('.question-label').textContent = '¡Felicidades!';
  document.querySelector('.bubble-content').textContent = '¡Has completado todas las preguntas, accede al enlace!';
  document.getElementById('answers-container').innerHTML = '';
  document.getElementById('error-message').style.display = 'none';
}

// Inicializar cuando se carga la página
window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('questionScreen')) {
    loadQuestion();
  }
});
