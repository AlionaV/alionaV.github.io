var c = document.getElementById("myCanvas");

var ctx = c.getContext("2d");

var cl1 = document.getElementById("layer1");

var ctx1 = cl1.getContext("2d");

var cl2 = document.getElementById("position");

var ctx2 = cl2.getContext("2d");

var cl3 = document.getElementById("wavelength");

var ctx3 = cl3.getContext("2d");

var blx = 0, bly = 0, bhx = 1, bhy = 1, x, y, l, Pur, curx, cury, ch;

//Scale functions (transition between canvas and CIE coordinate systems)

function px(x) {

return x * c.width / (bhx - blx) + 0.07 * c.width;

}

function rpx(x) {

return (x - 0.07 * c.width) * (bhx - blx) / c.width;

}

function py(y) {

return c.height - 0.07 * c.height - y * c.height / (bhy - bly);

}

function rpy(y) {

return (-y - 0.07 * c.height + c.height) * (bhy - bly) / c.height;

}

function dis(a1, a2, b1, b2) {

return Math.sqrt(Math.pow((a1 - b1), 2) + Math.pow((a2 - b2), 2));

}

//Set canvas dimension

function setdim(cvs){

cvs.width = 530;

cvs.height = 530;

}

setdim(c);

setdim(cl1);

setdim(cl2);

setdim(cl3);

	







// Functions declaration

// CIE coordinates for pure colors (here l means wavelength)

function xl(l) {

return (Math.sqrt(Math.log(2) / Math.PI) * (540.2138 / 219.3478) * Math.exp(-Math.log(2) * Math.pow((l - 866.4554), 2) / Math.pow(219.3478, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (1.5194 / 29.334) * Math.exp(-Math.log(2) * Math.pow((l - 605.5594), 2) / Math.pow(29.334, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (94.4378 / 111.8281) * Math.exp(-Math.log(2) * Math.pow((l - 601.9994), 2) / Math.pow(111.8281, 2))) + ((-0.0012) * l + 0.5713) + (Math.sqrt(Math.log(2) / Math.PI) * ((-4.457) / 18.485) * Math.exp(-Math.log(2) * Math.pow((l - 505.8285), 2) / Math.pow(18.485, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * ((-30.4375) / 52.4434) * Math.exp(-Math.log(2) * Math.pow((l - 520.8703), 2) / Math.pow(52.4434, 2)));

}

function yl(l) {

return ((-7.61e-5) * l + 0.3235) + (Math.sqrt(Math.log(2) / Math.PI) * (7.9741 / 26.281) * Math.exp(-Math.log(2) * Math.pow((l - 569.6327), 2) / Math.pow(26.281, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (10.4239 / 47.7279) * Math.exp(-Math.log(2) * Math.pow((l - 576.2519), 2) / Math.pow(47.7279, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (12.7996 / 17.6611) * Math.exp(-Math.log(2) * Math.pow((l - 510.0455), 2) / Math.pow(17.6611, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (26.5994 / 27.1506) * Math.exp(-Math.log(2) * Math.pow((l - 532.3269), 2) / Math.pow(27.1506, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * ((-136.9371) / 131.2011) * Math.exp(-Math.log(2) * Math.pow((l - 366.8404), 2) / Math.pow(131.2011, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (33.0533 / 77.9723) * Math.exp(-Math.log(2) * Math.pow((l - 370.8687), 2) / Math.pow(77.9723, 2)));

}

function linef(x01, y01, x02, y02, xx) {if (x02 != x01) {

return (xx * (y01 - y02)) / (x01 - x02) + y02 - (x02 * (y01 - y02)) / (x01 - x02);}

}

function rlinef(x01, y01, x02, y02, yy) {

return ((x02 * y01) - (x01 * y02) + (x01 * yy) - (x02 * yy))/(y01 - y02);

}

//Drawing clear CIE plot

function clearcie() {



	

ctx.beginPath();

ctx.moveTo(px(0), py(0));

ctx.lineTo(px(0), py(bhy));

ctx.moveTo(px(0), py(0));

ctx.lineTo(px(bhx), py(0));

ctx.strokeStyle = "black";

for (i = 0; i < 10; i++) {

ctx.moveTo(px(i / 10), py(0) + 5);

ctx.lineTo(px(i / 10), py(0));

ctx.font = "15px Arial";

ctx.fillText(i / 10, px(0) - 35, py(i / 10));

ctx.moveTo(px(0) - 5, py(i / 10));

ctx.lineTo(px(0), py(i / 10));

ctx.fillText(i / 10, px(i / 10) - 15, py(0) + 25);

}

ctx.stroke();

var xjmin = Math.round(px(0.17411)),xjmax = Math.round(px(0.73684)),yym = py(0.26316);

for (xj = xjmin; xj < xjmax; xj = xj + 1) {

var yyf = py(linef(0.17411, 0.00496, 0.73684, 0.26316, rpx(xj)));

for (yy = yym; yy < yyf; yy = yy + 0.5) {

if (rpy(yy) > 0) {

ctx.fillStyle = 'rgb(' + cie_to_rgb(rpx(xj), rpy(yy)) + ')';

ctx.fillRect(xj, yy, 1, 1);

}

}

}







for (l = 380; l < 488; l = l + 0.1) {

xj = px(xl(l));

var bound1 = py(yl(l));

var xll = xl(l);

for (yy = py(0.26316); yy < bound1; yy = yy + 1) {

ctx.fillStyle = 'rgb(' + cie_to_rgb(xll, rpy(yy)) + ')';

ctx.fillRect(xj, yy, 1, 1);

}

}



for (l = 517.0; l < 780; l = l + 0.1) {

xj = px(xl(l));

xll = xl(l);

yym = py(yl(l));

for (yy = py(0.26316); yy > yym; yy = yy - 1) {

ctx.fillStyle = 'rgb(' + cie_to_rgb(xll, rpy(yy)) + ')';

ctx.fillRect(xj, yy, 1, 1);

}

}

for (l = 480; l < 517; l = l + 0.06) {

yy = py(yl(l));

var xb1 = px(xl(517)), xb2 = px(xl(l));

for (xj = xb1; xj > xb2; xj = xj - 1) {

ctx.fillStyle = 'rgb(' + cie_to_rgb(rpx(xj), rpy(yy)) + ')';

ctx.fillRect(xj, yy, 1, 1);

}

}

for (i = 380; i < 780; i++) {

ctx.strokeStyle = "black";

ctx.beginPath();

ctx.moveTo(px(xl(i)), py(yl(i)));

ctx.lineTo(px(xl(i + 1)), py(yl(i + 1)));

ctx.stroke();

}



ctx.font = '18pt Arial';

ctx.fillStyle = 'black';

ctx.fillText("CIE 1931", 380, 50);

}

if (window.innerWidth > 500){

clearcie();

}

else {



    var img = document.getElementById("CIE");

    ctx.drawImage(img,0, 0, 530, 530);

}



//Printing results (button has been clicked)

var lambdat, Purt;

function pResults1() {

var XX01 = parseFloat(document.getElementById("myx").value), YY01 = parseFloat(document.getElementById("myy").value),ZZ01 = parseFloat(document.getElementById("mzz").value)||1-XX01-YY01;

var x01 = XX01/(XX01+YY01+ZZ01),y01 = YY01/(XX01+YY01+ZZ01) ;

pResults2(x01, y01);

}

//Printing results 

function pResults2(x0p, y0p) {

Catculate(x0p, y0p);

ctx1.beginPath();

ctx1.arc(px(x0p), py(y0p), 5, 0, 2 * Math.PI);

ctx1.stroke();

var pal = document.createElement("div");

pal.setAttribute('style', 'background-color:' + 'rgb(' + cie_to_rgb(x0p, y0p) + ')' + '; width: 20px; height: 20px; border-radius: 10px;');

var s = document.createTextNode("");

pal.appendChild(s);

document.getElementById("m1").appendChild(pal);

printresult('{x,y}: '+'{' + Math.round(x0p*1000)/1000 + ', ' + Math.round(y0p*1000)/1000+'}');

printresult('Dominant wavelength: ' + lambdat);

printresult('Purity: ' + Purt);

}

function pllocusx(T) { 
if(T > 1667 && T < 4000) {return - 0.2661239 *(Math.pow(10,9)/Math.pow(T,3))-0.2343580*(Math.pow(10,6)/Math.pow(T,2))+0.8776956*(Math.pow(10,3)/T)+0.179910;}
 if(T >= 4000 && T < 25000) {return -3.0258469 *(Math.pow(10,9)/Math.pow(T,3))+2.1070379 *(Math.pow(10,6)/Math.pow(T,2))+0.2226347 *(Math.pow(10,3))/T)+0.240390;}
 }

function pllocusy(xc,T) 
{
if(T > 1667 && T < 2222) {return -1.1063814*Math.pow(xc,3)-1.34811020*Math.pow(xc,2)+2.18555832*xc-0.20219683;}
if(T >= 2222 && T < 4000) {return -0.9549476*Math.pow(xc,3)-1.37418593*Math.pow(xc,2)+2.09137015*xc-0.16748867;}
if(T >= 4000 && T < 25000) {return +3.0817580*Math.pow(xc,3)-5.87338670*Math.pow(xc,2)+3.75112997*xc-0.37001483;}
}


for (T = 1700; T < 24900; T = T + 100) {

ctx.strokeStyle = "black";
ctx.beginPath();
var xcc1 = pllocusx(T), xcc2 = pllocusx(T+1);
ctx.moveTo(px(xcc1), py(pllocusy(xcc1,T)));
ctx.lineTo(px(xcc2), py(pllocusy(xcc2,T+1)));
ctx.stroke();

	
}
 

//Purity and Dominant wavelength calculation

function Catculate(x0p, y0p) {

var h, l, x0p, y0p;

if (y0p > linef(0.333, 0.333, xl(380), yl(380), x0p) & x0p < 0.333 | y0p > linef(0.333, 0.333, xl(780), yl(780), x0p) & x0p >= 0.333) {

if (y0p < linef(0.333, 0.333, 0.2, 0.8, x0p)) {

l = 380;

do {

l = l + 0.1;

h = Math.abs(linef(0.333, 0.333, x0p, y0p, xl(l)) - yl(l));

}

while (h > 0.01);

l = l - 0.1;

do {

l = l + 0.01;

h = Math.abs(linef(0.333, 0.333, x0p, y0p, xl(l)) - yl(l));

}

while (h > 0.001);

l = l - 0.01;

do {

l = l + 0.001;

h = Math.abs(linef(0.333, 0.333, x0p, y0p, xl(l)) - yl(l));

}

while (h > 0.001);

}

if (y0p >= linef(0.333, 0.333, 0.2, 0.8, x0p) & y0p >= linef(0.333, 0.333, 0.4, 0.55, x0p)) {

l = 523;

do {

l = l + 0.1;

h = Math.abs(rlinef(0.333, 0.333, x0p, y0p, yl(l)) - xl(l));

}

while (h > 0.01);

l = l - 0.1;

do {

l = l + 0.01;

h = Math.abs(rlinef(0.333, 0.333, x0p, y0p, yl(l)) - xl(l));

}

while (h > 0.001);

l = l - 0.01;

do {

l = l + 0.001;

h = Math.abs(rlinef(0.333, 0.333, x0p, y0p, yl(l)) - xl(l));

}

while (h > 0.001);

}



if (y0p < linef(0.333, 0.333, 0.4, 0.55, x0p)) {

l = 533.0;

do {

l = l + 0.1;

h = Math.abs(linef(0.333, 0.333, x0p, y0p, xl(l)) - yl(l));

}

while (h > 0.01);

l = l - 0.1;

do {

l = l + 0.001;

h = Math.abs(linef(0.333, 0.333, x0p, y0p, xl(l)) - yl(l));

}

while (h > 0.001);



}

Pur = Math.round(dis(x0p, y0p, 0.333, 0.333) / dis(0.333, 0.333, xl(l), yl(l)) * 100);

if (Pur > 100 & Pur < 103) { Pur = 100; }

if (Pur >= 103) {

Purt = 'undefined';

lambdat = 'coordinates are out of the CIE curve';

lamround = " ";



} else {

Purt = Pur + ' %';

lambdat = Math.round(l * 100) / 100 + ' nm';

lamround = lambdat;

ll = l;

curx = x0p;

cury = y0p;

}

} else {

Purt = 'undefined';

lambdat = 'purple';

lamround = " ";

curx = x0p;

cury = y0p;

}

}





//Clear layer

function clearlayer(contxt) {

contxt.clearRect(0, 0, cl1.width, cl1.height);

}



//Print text message on canvas layers

function PrintMessage(canvas, message, cc1, cc2, color) {

var context = canvas.getContext('2d');

context.clearRect(0, 0, canvas.width, canvas.height);

context.font = '14pt Arial';

context.fillStyle = color || "black";

context.fillText(message, cc1, cc2);

}

//Get cursor coordinates (canvas coordinate system)

function getPointerPosition(canvas, evt) {

var rect = canvas.getBoundingClientRect();

	var wid, hth;

	if (window.innerWidth < 500) {wid = 400; hth = 400;} else {wid = 530; hth = 530;}

return {

x: (evt.clientX - rect.left) * canvas.width / wid,

y: (evt.clientY - rect.top)* canvas.height / hth

};

}

//Mouse position tooltip

cl2.addEventListener('mousemove', function (evt) {

var mousePos = getPointerPosition(cl2, evt);

var message = Math.round(rpx(parseFloat(mousePos.x)) * 1000) / 1000 + ',' + Math.round(rpy(parseFloat(mousePos.y)) * 1000) / 1000;

if (rpy(parseFloat(mousePos.y)) > linef(0.17411, 0.00496, 0.73684, 0.26316, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) < linef(0.734, 0.270, 0.312, 0.685, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) > linef(0.148, 0.006, 0, 0.355, rpx(parseFloat(mousePos.x))) & rpx(parseFloat(mousePos.x)) > 0 & rpy(parseFloat(mousePos.y)) < 0.835) {

if (rpx(parseFloat(mousePos.x)) > 0.224) { 

PrintMessage(cl2, message, parseFloat(mousePos.x) - 100, parseFloat(mousePos.y)); 

}

else {

PrintMessage(cl2, message, parseFloat(mousePos.x), parseFloat(mousePos.y));

}

} else { clearlayer(ctx2); }



if (rpy(parseFloat(mousePos.y)) > linef(0.73, 0.261, 0.072, 0.825, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) < linef(0.74, 0.27, 0.441, 0.552, rpx(parseFloat(mousePos.x))) & rpx(parseFloat(mousePos.x)) > 0.34 & rpx(parseFloat(mousePos.x)) < 0.739 | rpx(parseFloat(mousePos.x)) > 0.075 & rpx(parseFloat(mousePos.x)) < 0.32 & rpy(parseFloat(mousePos.y)) > linef(0.73, 0.261, 0.072, 0.825, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) < linef(0.74, 0.27, 0.441, 0.552, rpx(parseFloat(mousePos.x))) | rpx(parseFloat(mousePos.x)) < 0.075 & rpy(parseFloat(mousePos.y)) > 0.285 | rpy(parseFloat(mousePos.y)) <= 0.285 & rpy(parseFloat(mousePos.y)) < linef(0.185, 0.014, 0.074, 0.285, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) > linef(0.035, 0.277, 0.145, 0.00, rpx(parseFloat(mousePos.x)))) {

Catculate(rpx(parseFloat(mousePos.x)), rpy(parseFloat(mousePos.y)));

clearlayer(ctx3);

PrintMessage(cl3, lamround, 380, 80, "red");

ctx3.beginPath();

ctx3.arc(px(xl(ll)), py(yl(ll)), 3, 0, 2 * Math.PI);

ctx3.stroke();

} else {

clearlayer(ctx3);

}



}, false);

//When CIE plot has been clicked (calculation for current CIE coordinates)

cl2.addEventListener('click', function (evt) {

var mousePos = getPointerPosition(cl2, evt);

if (rpy(parseFloat(mousePos.y)) > linef(0.17411, 0.00496, 0.73684, 0.26316, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) < linef(0.734, 0.270, 0.312, 0.685, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) > linef(0.148, 0.006, 0, 0.355, rpx(parseFloat(mousePos.x))) & rpx(parseFloat(mousePos.x)) > 0 & rpy(parseFloat(mousePos.y)) < 0.835) {

pResults2(rpx(parseFloat(mousePos.x)), rpy(parseFloat(mousePos.y)));

} else { ctx2.clearRect(0, 0, cl2.width, cl2.height); }

}, false);



function printresult(text, colr) {

var colr1 = colr || "#4d4d4d";

var para = document.createElement("P");

para.setAttribute('style', 'color:' + colr1 + '; font-family: Consolas; margin-top:5px; margin-bottom:5px;');

var t = document.createTextNode(text);

para.appendChild(t);

document.getElementById("m1").appendChild(para);

}

//Clear layers and results log

function clearresults() {

	document.getElementById("m1").innerHTML = "";

	clearlayer(ctx1);

	clearlayer(cl2);

	clearlayer(cl3);

}



//CIE to rgb converter

function cie_to_rgb(x, y, brightness) {



//Set to maximum brightness if no custom value was given (Not the slick ECMAScript 6 way for compatibility reasons)



if (brightness === undefined) {

brightness = 254;

}



var z = 1.0 - x - y;

var Y = (brightness / 254).toFixed(2);

var X = (Y / y) * x;

var Z = (Y / y) * z;



//Convert to RGB using Wide RGB D65 conversion

var red = X * 1.656492 - Y * 0.354851 - Z * 0.255038;

var green = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;

var blue = X * 0.051713 - Y * 0.121364 + Z * 1.011530;

//If red, green or blue is larger than 1.0 set it back to the maximum of 1.0

if (red > blue && red > green && red > 1.0) {

green = green / red;

blue = blue / red;

red = 1.0;

}

else if (green > blue && green > red && green > 1.0) {

red = red / green;

blue = blue / green;

green = 1.0;

}



else if (blue > red && blue > green && blue > 1.0) {



red = red / blue;

green = green / blue;

blue = 1.0;



}



//Reverse gamma correction



red = red <= 0.0031308 ? 12.92 * red : (1.0 + 0.055) * Math.pow(red, (1.0 / 2.4)) - 0.055;

green = green <= 0.0031308 ? 12.92 * green : (1.0 + 0.055) * Math.pow(green, (1.0 / 2.4)) - 0.055;

blue = blue <= 0.0031308 ? 12.92 * blue : (1.0 + 0.055) * Math.pow(blue, (1.0 / 2.4)) - 0.055;



//Convert normalized decimal to decimal



red = Math.round(red * 255);

green = Math.round(green * 255);

blue = Math.round(blue * 255);







if (isNaN(red))

red = 0;

if (isNaN(green))

green = 0;

if (isNaN(blue))

blue = 0;

return [red, green, blue];

}
