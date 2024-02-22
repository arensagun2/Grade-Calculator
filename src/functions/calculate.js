export class Calculate {
    constructor(rows) {
        this.rows = rows;
    }

    get actual() {
        return this.calculate();
    }

    calculate() {
        if (this.rows.length < 1) return null;
        this.scores = [];
        this.weights = [];
        this.final = 0;

        // Seperates scores and weights in each row
        for (let i = 0; i < this.rows.length; i++) {
            this.scores.push(this.rows[i].score)
            this.weights.push(this.rows[i].weight)
        }
        if (this.scores.length < 1 || this.weights.length < 1) return null;

        for (let i = 0; i < this.rows.length; i++) {
            let currentScore = this.scores[i].split('/');
            let calculatedScore = parseFloat(currentScore[0]) / parseFloat(currentScore[1]);
            this.final = this.final + (calculatedScore * this.weights[i]);
        }

        return this.final.toFixed(2);
    }
}