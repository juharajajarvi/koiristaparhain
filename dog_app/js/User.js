function User(username, kennel, password, breed) {
    this.username = username;
    this.kennel = kennel;
    this.password = password;
    this.passwordAgain = "";
    this.breed = breed;
    this.isRegistered = false;
    this.newgame=true;

    this.load = {
        isFailed: false,
        isSuccess: false
    };
    this.save = {
        isSaving: false,
        isSuccess: false
    };

    this.isShetlandsheepdog = function() {
        return this.breed == Constants.BREEDS.shetlandsheepdog.breed;
    };

    this.isChihuahua = function() {
        return this.breed == Constants.BREEDS.chihuahua.breed;
    };

    this.loadFailed = function() {
        this.load.isFailed = true;
    };

    this.resetLoadFail = function() {
      this.load.isFailed = false;
    };
}