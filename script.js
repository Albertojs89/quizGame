// Funcionalidad del botón Start
document.querySelector('.start-button').addEventListener('click', function() {
  // Ocultar la pantalla de inicio
  document.getElementById('startScreen').style.display = 'none';
  document.querySelector('.title').style.display = 'none';
  
  // Eliminar permanentemente la imagen PEGI
  const pegiImage = document.querySelector('.subtitle-img');
  if (pegiImage) {
    pegiImage.remove();
  }
  
  // Mostrar la pantalla de pregunta
  document.getElementById('questionScreen').style.display = 'block';
});
