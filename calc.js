/*
 * Implementation of calc!
 */

// Some global variables 
var displayElement = $('#display');	//jquery object that represents <input id="display">
var display = displayElement.val();	//display String value
var operation = ''; //variable that hold operation value ('+', '-', '*', '/')
var mem;	//variable that holds numeric value of display as String
var error = false;

/** 
 * This technical function puts the numeric value  
 * of button on display! If display is 0 rewrite display with value,
 * else concat value to display.
 * @param value the value of the of button
 */
function displayNumber(value) {
    if (!Number(display)) {
        // 0 and NaN are falsy, so processing here
        display = value;
        displayElement.val(display);
    }
    else {
        display = display.concat(value);
        displayElement.val(display);
    }
}

/**
* This technical function clears the display, but first remember the 
* value of display in mem variable.
* @param value the String value to remember
*/
function clearDisplay(value) {
    if (value) mem = value;
    else {
        if (display == NaN) {
            mem = display;
            return;
        }
    }
    //clear
    display = '0';
    displayElement.val(display);
}

/**
 * This technical function calls when division by 0 occurs to 
 * show error text on web-page.
 * @return NaN, as result division by 0
 */
function divideByZeroHandler() {
    $('#output').html('Error: You divide by 0!')
        .removeClass('normalText')
        .addClass('errorText');
    $('#display').removeClass('normalBox')
        .addClass('errorBox');
    error = true;
    return NaN;
}

/**
 * This technical function perform math operations and returns result.
 * @return a numeric result of math operations or NaN, if divideByZero
 */
function calculate() {
    var result = 0;
    if (Number(mem)) result = Number(mem);
    switch (operation) {
        case '+': result += Number(display); break;
        case '-': result -= Number(display); break;
        case '*': result *= Number(display); break;
        case '/': if (Number(display)) result /= Number(display);
        else result = divideByZeroHandler(); break;
        default: result = Number(display); break;
    }
    operation = '';
    return result;
}

//Button 0-9 handlers
$('.num-buttons').click(function () {
    if (error) return;
    displayNumber($(this).val());
});

//operator button (+-*/) handlers
$('.operator').click(function () {
    if (operation) {
        display = calculate();
        displayElement.val(display);
    }
    if (error) return;
    // ORDER is important! Call next method, after possible operation calculation
    clearDisplay(Number(display));	//save display in mem and clear
    operation = $(this).val();
});

//Equals and clear button handlers
$('#equalsButton').click(function () {
    if (operation) {
        display = calculate();
        displayElement.val(display);
    }
});
$("#clearButton").click(function () {
    //reset mem, display and operation variables
    clearDisplay();
    operation = '';
    mem = 0;
    error = false;
    //reset error
    $('#display').removeClass('errorBox')
        .addClass('normalBox');
    $('#output').html('')
        .removeClass('errorText')
        .addClass('normalText');
});