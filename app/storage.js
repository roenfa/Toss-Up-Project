angular.module('app').service('Storage', function ($q) {
    var _this = this;
    this.data = [];

    this.findAll = function(callback) {
        chrome.storage.sync.get('team', function(keys) {
            if (keys.team != null) {
                _this.data = keys.team;
                for (var i=0; i<_this.data.length; i++) {
                    _this.data[i]['id'] = i + 1;
                }
                console.log(_this.data);
                callback(_this.data);
            }
        });
    }

    this.sync = function() {
        chrome.storage.sync.set({team: this.data}, function() {
            console.log('Data is stored in Chrome storage');
        });
    }

    this.add = function (newTeam) {
        var id = this.data.length + 1;
        var team = {
            id: id,
            content: newTeam,
            completed: false,
            createdAt: new Date()
        };
        this.data.push(team);
        this.sync();
    }

    this.remove = function(team) {
        this.data.splice(this.data.indexOf(team), 1);
        this.sync();
    }

    this.removeAll = function() {
        this.data = [];
        this.sync();
    }

});