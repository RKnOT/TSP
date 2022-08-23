// class UI_TSP -------------- start --------------------------                     
class UI_TSP {
    /*
		z.B. html:  tag <table id="tabelle"></table>
    */
    constructor(id, dic) {
            this.id = id;
            this.dic = dic;
            this.end_table = Object.keys(dic).findIndex(x => x == "endtable");
            this.dic_tabelle_generieren(Object.keys(dic).length);
        }
        //----
    dic_table_modify(dic) {
            const tabelle = document.getElementById(this.id);
            var dic_array = this.convert_dic_to_array(dic);
            for (var i = 0; i < tabelle.rows.length; i++) {
                var r = tabelle.rows[i];
                var z = r.cells[1];
                //document.getElementById("d16").innerHTML += "zelle   "  + z.innerHTML+  ' '+ dic_array[1][i] + '. '+ "<br />";
                z.innerHTML = dic_array[1][i];
            }
        }
        //----
    dic_tabelle_generieren(table_items) {
            const tabelle = document.getElementById(this.id);
            var dic_array = this.convert_dic_to_array(this.dic);
            //document.getElementById("d19").innerHTML += "dic keys  "  + dic_array[0] + ' '+ 'dic values '+ dic_array[1] + "<br />";
            for (var i = 0, len = this.end_table; i < len; i++) {
                //document.getElementById("d19").innerHTML += len + " dic keys  "  + dic_array[0][i] + ' '+ 'dic values '+ dic_array[1][i] + "<br />";
                const reihe = tabelle.insertRow(i);
                for (var k = 0, len1 = dic_array.length; k < len1; k++) {
                    var zelle = reihe.insertCell();
                    zelle.innerHTML = dic_array[k][i];
                }
            }
        }
        //---

    convert_dic_to_array(dic) {
            var d_key_value = [];
            var d_key = [];
            var d_value = [];
            Object.entries(dic).forEach(([key, value]) => {
                //document.getElementById("d1").innerHTML += "dic key "  + key + ' '+ 'dic value '+ value + "<br />";
                d_key.push(key);
                d_value.push(value);
            });
            d_key_value.push(d_key);
            d_key_value.push(d_value);
            return d_key_value;
        }
        //------

}
// class UI_TSP -------------- ende -------------------------- 	
Array.prototype.swapItems = function(a, b) {
        // sort a index -> a > b
        if (a < b) {
            var t = a;
            a = b;
            b = t;
        }
        this[1][a] = this[1].splice(b, 1, this[1][a])[0];
        return this;
    }
    // class get tour -------------- start --------------------------                     
class get_Tour {

    constructor(nr_Orte, c_width = 600, c_height = 415) {

            this.ut = new Utils();
            this.c_width = c_width;
            this.c_height = c_height;
            this.nr_Orte = nr_Orte;

            this.tour_length = 0.0;
            this.start_point = [];
            this.tour = [];

            this.generate_first_Tour(this.nr_Orte);

            this.tour_first = new Array();
            this.tour_first[0] = Array.from(this.start_point);
            this.tour_first[1] = Array.from(this.tour);
            this.get_tour_length();
            this.tour_first[2] = this.tour_length;
            this.tour_first[3] = [0, 0, 0.0]; // index 1, index 2 , tourlength-1
            this.tour_first[4] = 1;


            this.tour_n = new Array();
            this.tour_n[0] = Array.from(this.start_point);
            this.tour_n[1] = Array.from(this.tour);
            this.tour_n[2] = this.tour_length;
            this.tour_n[3] = [0, 0, 0.0]; // index 1, index 2 , tourlength-1
            this.tour_n[4] = 1;
        }
        //--------------

    pad(number) {
        var temp = number;
        if (number < 10) {
            temp = '00' + number;
        } else if (number < 100) {
            temp = '0' + number;
        }
        return temp;
    }
    get_random_points(nr_points, ort_counter = 1, dez_stellen = 5) {
            var points = [];


            for (var i = 0, len = nr_points; i < len; i++) {
                var x = this.ut.generateRandomFloat(0, this.c_width, dez_stellen);
                var y = this.ut.generateRandomFloat(0, this.c_height, dez_stellen);
                var ort_n = "Ort: " + this.pad(ort_counter);
                points.push([x, y, ort_n]);
                ort_counter += 1;
            }
            return points;
        }
        //-------------
    generate_first_Tour(nr_points = 5) {
        var r_p = this.get_random_points(nr_points);
        var r_p_0 = r_p[0];
        r_p.splice(0, 1);
        this.tour = r_p;
        this.start_point = [r_p_0];
    }

    //-------------

    //-----------------
    change_two_Orte(orte_list) {
            var min = 0;
            var max = orte_list[1].length - 1;
            var index1 = this.ut.generateRandomIntegerInRange(min, max);
            var index2 = this.ut.generateRandomIntegerInRange(min, max);
            if (index1 == index2) {
                var index2 = this.ut.generateRandomIntegerInRange(min, max);
            }
            orte_list.swapItems(index2, index1);
            //document.getElementById("d4").innerHTML ="value index1: "+ temp + ' ' +"<br />";
            orte_list[3] = [index1, index2, orte_list[2]];
            orte_list[4] = 0;
            orte_list[2] = this.get_tour_length(orte_list, false);
            // this.ut.print_points_list(orte_list[1], 'd1');
        }
        //---------------
    change_back_two_Orte(orte_list) {
            if (orte_list[4] == 0) {
                var index1 = orte_list[3][0];
                var index2 = orte_list[3][1];
                orte_list.swapItems(index2, index1);
                orte_list[2] = orte_list[3][2];
                orte_list[3] = [0, 0, 0];
                orte_list[4] = 1;
            } //  zwei orte zurücktauschen

        }
        //---------------
    print_tour(tag) {
            this.ut.print_points_list(this.start_point, tag);
            this.ut.print_points_list(this.tour, tag, true);
            document.getElementById(tag).innerHTML += ' total length: ' + this.tour_length + '<br />'
        }
        //---------------------------
    get_tour_length(t = this.tour_first, flag_first_tour = true) {
            // entfernung berechnen
            var orte_temp = Array.from(t); // hard copy of array
            //document.getElementById("d2").innerHTML = "xy " + orte_temp[0][0][0]  +  ' / ' + orte_temp[0][0][1] + "<br />";

            var x_0 = orte_temp[0][0][0];
            var x_n1 = orte_temp[1][0][0];
            var y_0 = orte_temp[0][0][1];
            var y_n1 = orte_temp[1][0][1];
            var length = this.get_h(x_0, x_n1, y_0, y_n1);
            // temp list with startpoint
            //orte_temp.unshift(this.start_point);
            //document.getElementById("d12").innerHTML = "tour  first " + orte_temp[0].length  +  ' / ' + orte_temp[1].length + "<br />";

            for (var i = 0, len = orte_temp[1].length - 1; i < len; i++) {
                x_0 = orte_temp[1][i][0];
                x_n1 = orte_temp[1][i + 1][1];
                y_0 = orte_temp[1][i][0];
                y_n1 = orte_temp[1][i + 1][1];
                length += this.get_h(x_0, x_n1, y_0, y_n1);
            }

            x_0 = orte_temp[0][0][0];
            y_0 = orte_temp[0][0][1];

            length += this.get_h(x_0, x_n1, y_0, y_n1);

            if (flag_first_tour == true) {
                this.tour_length = length;
            }
            return length;
        }
        //-----------------		
    get_h(x0, x1, y0, y1) {
            var dx = x1 - x0; // entfernung berechnen
            var dy = y1 - y0;
            //document.getElementById("d1").innerHTML += "pyth " + x0 +' / ' + x1 +' / '+ y0+' / ' + y1 + "<br />";

            var lx = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            //document.getElementById("d4").innerHTML += lx + ' dl'+'<br />';
            return (lx);
        }
        //--------------		
}
// class get tour --------------- end -------------------------