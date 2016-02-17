function Sponsor(name, img, cancellation, cancellationText, amountPerWeek) {
    this.name = name;
    this.img = img;

    this.cancellation = cancellation;
    this.cancellationText = cancellationText;

    this.isCancelled = false;
    this.hasJustCancelled = false;

    this.contractLength = 4;

    this.amountPerWeek = amountPerWeek;
    this.contractUntil = null;

    this.getAmountPerWeek = function () {
        if (this.isCancelled) {
            return 0;
        } else {
            return this.amountPerWeek;
        }
    };

    this.getContractUntilDatePrint = function () {
        return this.contractUntil.toLocaleDateString('fi');
    };

    this.serialize = function () {
        return {
            name: this.name,
            img: this.img,
            cancellation: this.cancellation,
            cancellationText: this.cancellationText,
            isCancelled: this.isCancelled,
            hasJustCancelled: this.hasJustCancelled,
            amountPerWeek: this.amountPerWeek,
            contractUntil: this.contractUntil,
            contractLength: this.contractLength
        };
    };

    this.deserialize = function (skeleton) {
        this.isCancelled = skeleton.isCancelled;
        this.hasJustCancelled = skeleton.hasJustCancelled;
        this.contractUntil = new Date(skeleton.contractUntil);
        this.contractLength = skeleton.contractLength;
    };

    this.tryCancellation = function (type) {

        if (this.cancellation == type && this.isCancelled == false) {
            this.isCancelled = true;
            this.hasJustCancelled = true;
        }
    };

}