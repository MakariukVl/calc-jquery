/*
 * Implementation of calc!
 */

// Some global variables 
var displayElement = $('#display');	//jquery object that represents <input id="display">
var display = displayElement.val();	//display String value
var operation = '';
var mem;	//variable that holds all numeric values of display and operations ('+', '-', '*', '/') as String
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
function divideByZero() {
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
        else result = divideByZero(); break;
        default: result = Number(display); break;
    }
    operation = '';
    return result;
}

//Button 0-9 handlers
$("#button0").click(function () {
    console.log("You pressed button0!");
    if (error) return;
    displayNumber($(this).val());
});
$("#button1").click(function () {
    console.log("You pressed button1!");
    if (error) return;
    displayNumber($(this).val());
});
$("#button2").click(function () {
    console.log("You pressed button2!");
    if (error) return;
    displayNumber($(this).val());
});
$("#button3").click(function () {
    console.log("You pressed button3!");
    if (error) return;
    displayNumber($(this).val());
});
$("#button4").click(function () {
    console.log("You pressed button4!");
    if (error) return;
    displayNumber($(this).val());
});
$("#button5").click(function () {
    console.log("You pressed button5!");
    if (error) return;
    displayNumber($(this).val());
});
$("#button6").click(function () {
    console.log("You pressed button6!");
    if (error) return;
    displayNumber($(this).val());
});
$("#button7").click(function () {
    console.log("You pressed button7!");
    if (error) return;
    displayNumber($(this).val());
});
$("#button8").click(function () {
    console.log("You pressed button8!");
    if (error) return;
    displayNumber($(this).val());
});
$("#button9").click(function () {
    console.log("You pressed button9!");
    if (error) return;
    displayNumber($(this).val());
});

//operator button (+-*/) handlers
$('#addButton').click(function () {
    console.log("You hit the addButton!");
    if (operation) {
        display = calculate();
        displayElement.val(display);
    }
    if (error) return;
    // ORDER is important! Call next method, after possible operation calculation
    clearDisplay(Number(display));	//save display in mem and clear
    operation = '+';
});
$('#subtractButton').click(function () {
    console.log("You hit the subtractButton!");
    if (operation) {
        display = calculate();
        displayElement.val(display);
    }
    if (error) return;
    // ORDER is important! Call next method, after possible operation calculation
    clearDisplay(Number(display));	//save display in mem and clear
    operation = '-';
});
$('#multiplyButton').click(function () {
    console.log("You hit the multiplyButton!");
    if (operation) {
        display = calculate();
        displayElement.val(display);
    }
    if (error) return;
    // ORDER is important! Call next method, after possible operation calculation
    clearDisplay(Number(display));	//save display in mem and clear
    operation = '*';
});
$('#divideButton').click(function () {
    console.log("You hit the divideButton!");
    if (operation) {
        display = calculate();
        displayElement.val(display);
    }
    if (error) return;
    // ORDER is important! Call next method, after possible operation calculation
    clearDisplay(Number(display));	//save display in mem and clear
    operation = '/';
});

//Equals and clear button handlers
$('#equalsButton').click(function () {
    console.log("You hit the equalsButton!");
    if (operation) {
        display = calculate();
        displayElement.val(display);
    }
});
$("#clearButton").click(function () {
    console.log("You hit the clearButton!");
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