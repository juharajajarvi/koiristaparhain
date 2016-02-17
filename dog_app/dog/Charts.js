function Charts(attributes) {

    this.attributes = attributes;

    this.mass = null;
    this.height = null;
    this.mental = null;
    this.history = {
        mass: [],
        height: [],
        mental: []
    };

    this.hasMassChart = function () {
        return this.mass !== null;
    };

    this.hasHeightChart = function () {
        return this.height !== null;
    };

    this.hasMentalChart = function () {
        return this.mental !== null;
    };

    this.getData = function (history, types) {

        var cols = [];
        cols.push({
            "id": "week",
            "label": "Viikko",
            "type": "number",
            "p": {}
        });

        for (var i = 0; i < types.length; i++) {
            cols.push({
                "id": types[i],
                "label": types[i],
                "type": "number",
                "p": {}
            });
        }

        return {
            "cols": cols,
            "rows": this.getHistoryRows(history)
        };
    };

    this.getHistoryRows = function (history) {
        var rows = [];

        for (var i = 0; i < history.length; i++) {
            var rowObject = [];

            for (var j = 0; j < history[i].length; j++) {
                rowObject.push({'v': history[i][j]});
            }
            rows.push({c: rowObject});
        }

        return rows;
    };

    this.getChartObject = function (history, tooltip, types) {

        var colors = ['blue', 'limegreen', 'limegreen'];

        if (tooltip === "Muut ominaisuudet") {
            colors = ['blue', 'red', 'limegreen'];
        }

        return {
            "type": "LineChart",
            "displayed": true,
            top: 210,
            left: 410,
            "data": this.getData(history, types),
            "options": {
                "tooltip": tooltip,
                "isStacked": "true",
                "fill": 20,
                "displayExactValues": true,
                "legend": {
                    position: "top",
                    maxLines: 3
                },
                "vAxis": {
                    "gridlines": {
                        "count": 10,
                        viewWindow: {
                            min: 0,
                            max: 10
                        }
                    }
                },
                "hAxis": {
                    "tooltip": "Viikko"
                },
                colors: colors
            },
            "formatters": {}
        };
    };

    this.updateChart = function (isForced) {

        if (!this.attributes.fixed.isOwned()) {
            //return;
        }

        // Measure this once per week
        if (this.attributes.number.getAgeInMonths() <= 6 && ( this.attributes.number.isMonday() || isForced) ) {
            // Mass
            this.history.mass.push(
                [this.attributes.number.getAgeInWeeks(), this.attributes.number.getMassInGrams(), this.attributes.number.getOptimalMass() * (1 - DogData.NINE_FACTOR), this.attributes.number.getOptimalMass() * (1 + DogData.NINE_FACTOR)]
            );
            this.mass = this.getChartObject(this.history.mass, 'Massa', ['Massa', 'Min', 'Max']);

            // Height
            /*
            if (this.attributes.number.getAgeInWeeks() >= 8) {
                this.history.height.push(
                    [this.attributes.number.getAgeInWeeks(), this.attributes.number.getHeight(), this.attributes.number.getOptimalHeight() * (1 - DogData.NINE_FACTOR), this.attributes.number.getOptimalHeight() * (1 + DogData.NINE_FACTOR)]
                );
                this.height = this.getChartObject(this.history.height, 'Säkä', ['Säkä', 'Min', 'Max']);
            }*/
        }

        // Mental skills are updated once in every two months
/*
        if (this.attributes.number.isFirstDayOfEveryThirdMonths() || isForced) {

            this.history.mental.push(
                [this.attributes.number.getAgeInWeeks(), this.attributes.number.getExperienceFloat(), this.attributes.number.getTrainingFloat(), this.attributes.number.getHealthFloat()]
            );
            this.mental = this.getChartObject(this.history.mental, 'Muut ominaisuudet', ['Kokemus', 'Koulutus', 'Terveys']);
        }*/
    };
}