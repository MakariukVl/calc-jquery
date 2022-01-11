/*
 * Implementation of calc!
 */

const displayElement = $('#display');
let display = displayElement.val();
let operation = '';
const OPERATIONS = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': function (a, b) {
    if (b) {
      return a / b;
    } else {
      document.dispatchEvent(new CustomEvent('calcError'));
      return 'Error';
    }
  }
};
let mem; // variable that holds numeric value of display as String
let error = false; //Error flag
let isNewNumber = true; //flag signals that user input should be a new number
const logEntry = []; //operations log

function displayNumber(value) {
  if (isNewNumber) {
    display = value;
    displayElement.val(display);
    isNewNumber = false;
  } else {
    display = display.concat(value);
    displayElement.val(display);
  }
}

function clearDisplay() {
  display = '0';
  displayElement.val(display);
}

function saveMem(value) {
  mem = value;
}

const handleCalcError = () => {
  displayElement
    .removeClass('calc__display_ok')
    .addClass('calc__display_error');
  error = true;
};

function calculate() {
  let result = 0;
  if (Number(mem)) {
    result = Number(mem);
  }
  const op = OPERATIONS[operation];
  if (OPERATIONS.hasOwnProperty(operation)) {
    result = op(result, +display);
  }
  operation = '';
  return result;
}

//Button 0-9 handlers
$('.calc__num-btn').click(function () {
  if (error) {
    return;
  }
  displayNumber($(this).val());
});

//operator button (+-*/) handlers
$('.calc__op-btn').click(function () {
  if (operation) {
    logEntry.push(mem);
    logEntry.push(operation);
    logEntry.push(display);
    display = calculate();
    displayElement.val(display);
    logEntry.push('=');
    logEntry.push(display);
    document.dispatchEvent(new CustomEvent('calcLog'));
  }
  if (error) {
    return;
  }

  saveMem(Number(display));
  operation = $(this).val();
  isNewNumber = true;
});

//logging handlers
const handleLog = () => {
  if (!error) {
    const entry = $('<div>', { class: 'log__entry' });
    const circle = $('<span>', { class: 'log__circle' });
    const equation = $('<span>', { class: 'log__equation' });
    const close = $('<span>', { class: 'log__close' });
    circle.text('\u25ef');
    circle.click(function () {
      if ($(this).text() === '\u25ef') {
        $(this).text('\u2b24');
      } else {
        $(this).text('\u25ef');
      }
      $(this).toggleClass('color-red');
    });
    circle.hover(
      function () {
        $(this).css('color', 'red');
      },
      function () {
        $(this).css('color', 'black');
      }
    );
    close.text('\u274c');
    close.click(function () {
      $(this).parent().remove();
    });
    close.hover(
      function () {
        $(this).toggleClass('color-red');
      },
      function () {
        $(this).toggleClass('color-red');
      }
    );
    equation.text(logEntry.join(' '));
    if (/48/g.test(equation.text())) { //underline all lines contains 48!!
      equation.addClass('log__equation_underlined');
    }
    entry.append(circle).append(equation).append(close);
    $('#log').prepend(entry);
  }
  logEntry.splice(0);
};

// [=] and [C] handlers
$('#equalsButton').click(function () {
  if (operation) {
    logEntry.push(mem);
    logEntry.push(operation);
    logEntry.push(display);
    display = calculate();
    displayElement.val(display);
    logEntry.push('=');
    logEntry.push(display);
    document.dispatchEvent(new CustomEvent('calcLog'));
    isNewNumber = true;
  }
});
$('#clearButton').click(function () {
  clearDisplay();
  operation = '';
  mem = 0;
  error = false;
  isNewNumber = true;
  logEntry.splice(0);
  $('#display').removeClass('calc__display_error').addClass('calc__display_ok');
});
$(document).on({
  calcError: handleCalcError,
  calcLog: handleLog
});
$('#log').scroll(function () { //scroll logger (console)
  const scroll = $(this).scrollTop();
  console.log('Scroll Top:', scroll);
});
