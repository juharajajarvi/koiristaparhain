function Achievement(codeName, name, description, prize, isHidden) {

    this.codeName = codeName;
    this.name = name;
    this.description = description;
    this.prize = prize;
    this.isHidden = isHidden;
    this.fullDetail = false;

    this.isLocked=true;

    this.toggleFullDetail = function() {
        this.fullDetail = ! this.fullDetail;
    };

    this.unlock = function() {
        this.isLocked = false;
    };

}