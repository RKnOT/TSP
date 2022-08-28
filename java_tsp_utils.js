class Utils {

    //--------------
    hard_array_copy(a_original, debug_flag = false) {
            var a_copy = new Array();
            //document.getElementById("d14").innerHTML = "tour o "+ a_original[0]  + "<br />";
            a_copy[0] = a_original[0]; // startpunkt
            a_copy[1] = [];
            for (var i = 0, len = a_original[1].length; i < len; i++) {
                var temp_x = a_original[1][i][0];
                var temp_y = a_original[1][i][1];
                var o = a_original[1][i][2];
                a_copy[1].push([temp_x, temp_y, o]); // liste der Orte
                //document.getElementById("d14").innerHTML += "ort  x: " + temp_x  +  ' / ' + 'y: ' + temp_y + "<br />";
            }

            a_copy[2] = a_original[2]; // länge der tour
            a_copy[3] = a_original[3]; // länge der getauschten tour
            a_copy[4] = a_original[4];
            if (debug_flag == true) {
                document.getElementById("d15").innerHTML = "ort start: x: " + a_copy[0][0][0] + " y: " + a_copy[0][0][1] + "<br />";
                document.getElementById("d16").innerHTML = "ort  x:" + a_copy[1][0][0] + "/ y: " + a_copy[1][0][1] + "<br />";
                document.getElementById("d17").innerHTML = "length  " + a_copy[2] + "<br />";
                document.getElementById("d18").innerHTML = "length  " + a_copy[4] + "<br />";
            }
            return a_copy;
        }
        //-----------------------
    print_x_y_points_list(list_points, desciption = "") {
        var info = "";
        var px = list_points[0][0][0];
        var py = list_points[0][0][1];
        var o = list_points[0][0][2];
        info = "--- " + desciption + " ---" + '<br />';
        info += o + ' /  x: ' + px + ' / y: ' + py + '<br />';
        info += '<br />';
        for (var i = 0, len = list_points[1].length; i < len; i++) {
            px = list_points[1][i][0];
            py = list_points[1][i][1];
            o = list_points[1][i][2];
            info += o + ' /  x: ' + px + ' / y: ' + py + '<br />';
        }
        info += '<br />';
        info += 'length: ' + list_points[2] + '<br />';
        info += 'List index-n: ' + list_points[3][0] + " / " + list_points[3][1] + " / " + list_points[3][2] + '<br />';
        info += '<br />';
        return info;
    }


    //---------------
    print_points_list(list_points, div_id, add_Flag = false) {
        if (add_Flag == true) {
            document.getElementById(div_id).innerHTML += '';
        } else {
            document.getElementById(div_id).innerHTML = '';
        }
        for (var i = 0, len = list_points.length; i < len; i++) {
            var px = list_points[i][0];
            var py = list_points[i][1];
            //var ort = list_points[i][2]; 
            if (list_points.length == 2) {
                px = list_points[0];
                py = list_points[1];
                //ort = list_points[2]; 
                i++;
            }
            document.getElementById(div_id).innerHTML += '  x ' + px + '/ y ' + py + '<br />'
        }
        document.getElementById(div_id).innerHTML += '<br />'
    }

    //------------
    generate_canvas_bg_image() {
        var canvas = new Object();
        canvas = new fabric.Canvas("canvas", { backgroundImage: "middle-earth.png", });
        //var canvas = new fabric.Canvas('canvas')
        //fabric.Image.fromURL('middle-earth.png', oImg => {canvas.add(oImg)});

        canvas.setWidth(600);
        canvas.setHeight(415);
        //canvas.renderAll();
        return canvas;
    }

    //-----------------    
    draw_tour(p_list, c) {
            var line_color_list = [
                ['red'],
                ['black'],
                ['blue']
            ];
            var index = 0;
            var x_0 = p_list[0][0][0];
            var x_n1 = p_list[1][0][0];
            var y_0 = p_list[0][0][1];
            var y_n1 = p_list[1][0][1];



            //print_points_list(p_list[0], 'd2');
            //print_points_list(p_list[1], 'd2');
            //document.getElementById("d3").innerHTML += " "+ p_list.length + '<br />';
            for (var i = 0, len = p_list[1].length - 1; i < len; i++) {
                if (i <= p_list[1].length) {
                    x_n1 = p_list[1][i + 1][0];
                    y_n1 = p_list[1][i + 1][1];
                }
                this.draw_line(x_0, y_0, x_n1, y_n1, line_color_list[index], c, i);
                x_0 = x_n1;
                y_0 = y_n1;

                if (i == 0) { index += 1 }
            }
            //document.getElementById("d3").innerHTML = " " + x_n1 + ' ' + y_n1 + '<br />';
            x_n1 = p_list[0][0][0];
            y_n1 = p_list[0][0][1];
            //"document.getElementById("d4").innerHTML = x_n1 + ' ' + y_n1;
            index += 1
            this.draw_line(x_0, y_0, x_n1, y_n1, line_color_list[index], c);

        }
        //-------------------------
    draw_line(x0, y0, x1, y1, color, c, index) {
        var temp = c.add(new fabric.Line([x0, y0, x1, y1], { stroke: color, strokeWidth: 1 }));
        let ca = 'black';
        let ci = 'white';
        let ra = 4;
        let ri = 2;
        if (index == 0) {
            ra = 6;
            ri = 4;
            ca = 'green'
            ci = 'green';

        }


        let t = ra - ri;
        let x = x0 - ra;
        let y = y0 - ra;
        let xt = x + t;
        let yt = y + t;


        canvas.add(new fabric.Circle({ radius: ra, fill: ca, top: y, left: x }));
        canvas.add(new fabric.Circle({ radius: ri, fill: ci, top: yt, left: xt }));


    }

    //--------

    remove_objects(c) {
        var objects = c.getObjects();
        if (objects.length != 0) {
            for (var i = 0, len = objects.length; i < len; i++) {
                c.remove(c.getObjects()[0])
            }
        }
    }

    //---------
    generate_p_tags(nr = 20, tag_name = 'd') {
            var element = document.getElementsByTagName("body")[0];
            for (var i = 1, len = nr; i <= len; i++) {
                var tag = document.createElement("p"); // <p></p>
                var att = tag_name + i;
                tag.setAttribute('id', att);
                var text = document.createTextNode("");
                tag.appendChild(text); // <p id='dxx'></p>
                element.appendChild(tag);
            }
        }
        //---------
    clear_p_tag_content(nr = 20) {
            for (var i = 1, len = nr; i <= len; i++) {
                var att = 'd' + i;
                document.getElementById(att).innerHTML = '';
            }
        }
        //----------
        // Generate a random number between min and max, including both min and max
    generateRandomIntegerInRange(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        //--------------
    generateRandomFloat(min, max, decimals) {
            const str = (Math.random() * (max - min + 1) + min).toFixed(decimals);
            return parseFloat(str);
        }
        //--------------
    getInputValue(element_id = "d15", default_value = 10, int_flag = true) {
        // Selecting the input element and get its value 
        var inputVal = document.getElementById(element_id).value;
        var number = 0;

        number = parseInt(inputVal);
        if (isNaN(number) && int_flag) { number = default_value }
        //document.getElementById("d16").innerHTML += "Wert int   " + number + ' ' + "<br />";
        if (!int_flag) {
            number = parseFloat(inputVal.replace(",", "."));
            //document.getElementById("d16").innerHTML = "Wert float  " + number + ' ' + "<br />";
        }
        if (isNaN(number)) {
            number = default_value;
        }


        inputVal = (number).toString();
        document.getElementById(element_id).value = inputVal;
        //document.getElementById("d16").innerHTML += "Wert   " + inputVal + ' ' + "<br />";
        return inputVal;
    }

    //--------class end-------
}