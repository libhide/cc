// Problem: No user interaction present
// Solution: User interaction needs to be added
var color = $('.selected').css('background-color');
var context = $('canvas')[0].getContext("2d");

var $canvas = $('canvas');

var lastEvent;
var mouseDown = false;

// When clicking on an element of the colors list
$('.controls').on("click", "li", function () {
  // Deselect sibling elements
  $(this).siblings().removeClass('selected');
  // Select clicked element
  $(this).addClass('selected');
  // Cache selected color
  color = $(this).css('background-color');
});


// When "New color" is pressed
$('#revealColorSelect').click(function () {
  // Show or hide the select color box
  changeColor();
  $('#colorSelect').toggle();
});

// Update the new color span
function changeColor() {
  var r = $('#red').val();
  var g = $('#green').val();
  var b = $('#blue').val();
  var color = "rgb(" + r + "," + g + "," + b + ")";
  $('#newColor').css('background-color', color);
}

// When color sliders change
$('input[type=range]').change(changeColor);

// When "Add color" is pressed
$('#addNewColor').click(function () {
  // Append color to the colors list
  var $newColor = $('<li></li>');
  $newColor.css('background-color', $('#newColor').css('background-color'));
  $('.controls ul').append($newColor);
  // Select the new color
  $newColor.click();
});


// On mouse event on the canvas
$canvas.mousedown(function (event){
  lastEvent = event;
  mouseDown = true;

}).mousemove(function (event){
  // Draw lines
  if (mouseDown) {
    context.beginPath();
    context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
    context.lineTo(event.offsetX, event.offsetY);
    context.strokeStyle = color;
    context.stroke();
    lastEvent = event;
  }
}).mouseup(function () {
  mouseDown = false;

}).mouseleave(function() {
  $canvas.mouseup();
});
