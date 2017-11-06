	var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
	var cl1 = document.getElementById("layer1");
    var ctx1 = cl1.getContext("2d");
	var canvas = document.getElementById("position");
    var context = canvas.getContext("2d");
    var canvas2 = document.getElementById("wavelength");
    var context2 = canvas2.getContext("2d");
    var blx = 0, bly = 0, bhx = 1, bhy = 1, x, y, l, Pur, curx, cury, ch;
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
	function setdim(cvs){
	cvs.width = 530;
    cvs.height = 530;}
	setdim(c);
	setdim(cl1);
	setdim(canvas);
	setdim(canvas2);
	





    function xl(l) {
        return (Math.sqrt(Math.log(2) / Math.PI) * (540.2138 / 219.3478) * Math.exp(-Math.log(2) * Math.pow((l - 866.4554), 2) / Math.pow(219.3478, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (1.5194 / 29.334) * Math.exp(-Math.log(2) * Math.pow((l - 605.5594), 2) / Math.pow(29.334, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (94.4378 / 111.8281) * Math.exp(-Math.log(2) * Math.pow((l - 601.9994), 2) / Math.pow(111.8281, 2))) + ((-0.0012) * l + 0.5713) + (Math.sqrt(Math.log(2) / Math.PI) * ((-4.457) / 18.485) * Math.exp(-Math.log(2) * Math.pow((l - 505.8285), 2) / Math.pow(18.485, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * ((-30.4375) / 52.4434) * Math.exp(-Math.log(2) * Math.pow((l - 520.8703), 2) / Math.pow(52.4434, 2)));
    }
    function yl(l) {
        return ((-7.61e-5) * l + 0.3235) + (Math.sqrt(Math.log(2) / Math.PI) * (7.9741 / 26.281) * Math.exp(-Math.log(2) * Math.pow((l - 569.6327), 2) / Math.pow(26.281, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (10.4239 / 47.7279) * Math.exp(-Math.log(2) * Math.pow((l - 576.2519), 2) / Math.pow(47.7279, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (12.7996 / 17.6611) * Math.exp(-Math.log(2) * Math.pow((l - 510.0455), 2) / Math.pow(17.6611, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (26.5994 / 27.1506) * Math.exp(-Math.log(2) * Math.pow((l - 532.3269), 2) / Math.pow(27.1506, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * ((-136.9371) / 131.2011) * Math.exp(-Math.log(2) * Math.pow((l - 366.8404), 2) / Math.pow(131.2011, 2))) + (Math.sqrt(Math.log(2) / Math.PI) * (33.0533 / 77.9723) * Math.exp(-Math.log(2) * Math.pow((l - 370.8687), 2) / Math.pow(77.9723, 2)));
    }
    function linef(x01, y01, x02, y02, xx) {
        return (xx * (y01 - y02)) / (x01 - x02) + y02 - (x02 * (y01 - y02)) / (x01 - x02);
    }

    function clearcie() {

	if (window.innerWidth > 500){
	ch = 1;
	} else {
	ch = 0;
	}
	
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
        for (xj = px(0.17411); xj < px(0.73684); xj = xj + 0.5) {
            for (yy = py(0.26316); yy < py(linef(0.17411, 0.00496, 0.73684, 0.26316, rpx(xj))); yy = yy + 0.5) {
                if (rpy(yy) > 0) {
                    ctx.fillStyle = 'rgb(' + cie_to_rgb(rpx(xj), rpy(yy)) + ')';
                    ctx.fillRect(xj, yy, 1, 1);
                }
            }
        }



        for (l = 380; l < 488; l = l + 0.1) {
            xj = px(xl(l));
            for (yy = py(0.26316); yy < py(yl(l)); yy = yy + 1) {

                ctx.fillStyle = 'rgb(' + cie_to_rgb(xl(l), rpy(yy)) + ')';
                ctx.fillRect(xj, yy, 1, 1);
            }
        }

        for (l = 517.0; l < 780; l = l + 0.1) {
            xj = px(xl(l));
            for (yy = py(0.26316); yy > py(yl(l)); yy = yy - 1) {

                ctx.fillStyle = 'rgb(' + cie_to_rgb(xl(l), rpy(yy)) + ')';
                ctx.fillRect(xj, yy, 1, 1);
            }
        }
        for (l = 480; l < 517; l = l + 0.05) {
            yy = py(yl(l));
            for (xj = px(xl(517)); xj > px(xl(l)); xj = xj - 1) {

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
    clearcie();


    var lambdat, Purt;
    function pf() {
        var XX01 = parseFloat(document.getElementById("myx").value), YY01 = parseFloat(document.getElementById("myy").value),ZZ01 = parseFloat(document.getElementById("mzz").value)||1-XX01-YY01;
        var x01 = XX01/(XX01+YY01+ZZ01),y01 = YY01/(XX01+YY01+ZZ01) ;
		pff(x01, y01);
    }
    function pff(x0p, y0p) {
        pfff(x0p, y0p);
        ctx1.beginPath();
        ctx1.arc(px(x0p), py(y0p), 5, 0, 2 * Math.PI);
        ctx1.stroke();
        var pal = document.createElement("div");
        pal.setAttribute('style', 'background-color:' + 'rgb(' + cie_to_rgb(x0p, y0p) + ')' + '; width: 20px; height: 20px; border-radius: 10px;');
        var s = document.createTextNode("  ");
        pal.appendChild(s);
        document.getElementById("m1").appendChild(pal);
        printresult('Dominant wavelength: ' + lambdat);
        printresult('Purity: ' + Purt);

    }

    function pfff(x0p, y0p) {
        var h, l, x0p, y0p;
        if (y0p > linef(0.33, 0.33, xl(380), yl(380), x0p) & x0p < 0.33 | y0p > linef(0.33, 0.33, xl(780), yl(780), x0p) & x0p >= 0.33) {
            if (x0p < 0.33) {
                l = 430;
                do {
                    l = l + 0.1;
                    h = Math.abs(linef(0.33, 0.33, x0p, y0p, xl(l)) - yl(l));
                }
                while (h > 0.01);
                l = l - 0.1;
                do {
                    l = l + 0.01;
                    h = Math.abs(linef(0.33, 0.33, x0p, y0p, xl(l)) - yl(l));
                }
                while (h > 0.001 & l < 554.6);
            } else {
                l = 532.1;
                do {
                    l = l + 0.1;
                    h = Math.abs(linef(0.33, 0.33, x0p, y0p, xl(l)) - yl(l));
                }
                while (h > 0.01);
                l = l - 0.1;
                do {
                    l = l + 0.01;
                    h = Math.abs(linef(0.33, 0.33, x0p, y0p, xl(l)) - yl(l));
                }
                while (h > 0.001 & l < 554.6);

            }
            Pur = Math.round(dis(x0p, y0p, 0.33, 0.33) / dis(0.33, 0.33, xl(l), yl(l)) * 100);
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



    function clearlayer(contxt) {
        contxt.clearRect(0, 0, cl1.width, cl1.height);
    }


    function writeMessage(canvas, message, cc1, cc2, color) {
        var context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '14pt Arial';
        context.fillStyle = color || "black";
        context.fillText(message, cc1, cc2);

    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
		var wid, hth;
		if (window.innerWidth < 500) {wid = 400; hth = 400;} else {wid = 530; hth = 530;}
        return {
            x: (evt.clientX - rect.left) * canvas.width / wid,
            y: (evt.clientY - rect.top)* canvas.height / hth
        };
    }

    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        var message = Math.round(rpx(parseFloat(mousePos.x)) * 1000) / 1000 + ',' + Math.round(rpy(parseFloat(mousePos.y)) * 1000) / 1000;
        if (rpy(parseFloat(mousePos.y)) > linef(0.17411, 0.00496, 0.73684, 0.26316, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) < linef(0.734, 0.270, 0.312, 0.685, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) > linef(0.148, 0.006, 0, 0.355, rpx(parseFloat(mousePos.x))) & rpx(parseFloat(mousePos.x)) > 0 & rpy(parseFloat(mousePos.y)) < 0.835) {
            if (rpx(parseFloat(mousePos.x)) > 0.224) { writeMessage(canvas, message, parseFloat(mousePos.x) - 100, parseFloat(mousePos.y)); }
            else {
                writeMessage(canvas, message, parseFloat(mousePos.x), parseFloat(mousePos.y));
            }
        } else { clearlayer(context); }

        if (rpy(parseFloat(mousePos.y)) > linef(0.73, 0.261, 0.072, 0.825, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) < linef(0.74, 0.27, 0.441, 0.552, rpx(parseFloat(mousePos.x))) & rpx(parseFloat(mousePos.x)) > 0.34 & rpx(parseFloat(mousePos.x)) < 0.739 | rpx(parseFloat(mousePos.x)) > 0.075 & rpx(parseFloat(mousePos.x)) < 0.32 & rpy(parseFloat(mousePos.y)) > linef(0.73, 0.261, 0.072, 0.825, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) < linef(0.74, 0.27, 0.441, 0.552, rpx(parseFloat(mousePos.x))) | rpx(parseFloat(mousePos.x)) < 0.075 & rpy(parseFloat(mousePos.y)) > 0.285 | rpy(parseFloat(mousePos.y)) <= 0.285 & rpy(parseFloat(mousePos.y)) < linef(0.185, 0.014, 0.074, 0.285, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) > linef(0.035, 0.277, 0.145, 0.00, rpx(parseFloat(mousePos.x)))) {
            pfff(rpx(parseFloat(mousePos.x)), rpy(parseFloat(mousePos.y)));
            clearlayer(context2);
            writeMessage(canvas2, lamround, 380, 80, "red");
            context2.beginPath();
            context2.arc(px(xl(ll)), py(yl(ll)), 3, 0, 2 * Math.PI);
            context2.stroke();
        } else {
            clearlayer(context2);
        }

    }, false);

    canvas.addEventListener('click', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        if (rpy(parseFloat(mousePos.y)) > linef(0.17411, 0.00496, 0.73684, 0.26316, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) < linef(0.734, 0.270, 0.312, 0.685, rpx(parseFloat(mousePos.x))) & rpy(parseFloat(mousePos.y)) > linef(0.148, 0.006, 0, 0.355, rpx(parseFloat(mousePos.x))) & rpx(parseFloat(mousePos.x)) > 0 & rpy(parseFloat(mousePos.y)) < 0.835) {
            pff(rpx(parseFloat(mousePos.x)), rpy(parseFloat(mousePos.y)));

        } else { context.clearRect(0, 0, canvas.width, canvas.height); }

    }, false);

    function printresult(text, colr) {
        var colr1 = colr || "#4d4d4d";
        var para = document.createElement("P");
        para.setAttribute('style', 'color:' + colr1 + '; font-family: Consolas; margin-top:5px; margin-bottom:5px;');
        var t = document.createTextNode(text);
        para.appendChild(t);
        document.getElementById("m1").appendChild(para);
    }

    function clearresults() {
        document.getElementById("m1").innerHTML = "";
        clearlayer(ctx1);
    }

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
