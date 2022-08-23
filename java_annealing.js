class annealing {
    constructor(tour, sigma, sigma_reduktion) {
        this.i = 1;
        this.abbruchZaehler = 0;

        this.sigma = sigma;
        this.sigma_reduktion = sigma_reduktion;
        this.tour = tour;
        this.neue_Laenge = 0;
        this.alte_Laenge = 0;


    }
    ist_tausch_ok(tour, sigma) {
        if (tour[4] == 0) {
            this.neue_Laenge = tour[2];
            this.alte_Laenge = tour[3][2];
            if (this.neue_Laenge < this.alte_Laenge) {
                return true;
            }
            let delta = this.neue_Laenge - this.alte_Laenge;
            let calc = Math.exp(-delta / sigma);
            if (calc > Math.random()) {
                return true;
            } else {
                return false;
            }
        }
    }
    optimize() {
        h.change_two_Orte(this.tour);
        let tausch_flag = this.ist_tausch_ok(this.tour, this.sigma);
        if (!tausch_flag) {
            h.change_back_two_Orte(h.tour_n);
            this.abbruchZaehler++;

        } else {

            this.abbruchZaehler = 0;
            up_date_canvas(this.tour);



        }
        this.sigma *= 1 - this.sigma_reduktion;
        //document.getElementById("d1").innerHTML += "sigma   " + this.sigma.toFixed(3) + "<br />";
        //document.getElementById("d1").innerHTML = "Länge   " + this.tour[2] + "<br />";
        this.i++;
        table_items["Finaldistanz"] = this.tour[2].toFixed(3);
        table_items["Currentdistanz"] = this.neue_Laenge.toFixed(3);
        table_items['Sigma'] = this.sigma.toFixed(3);
        table_items['stabile Iterationen'] = this.abbruchZaehler;
        table_items['Iterationen'] = this.i;
        ui.dic_table_modify(table_items);


    }




}