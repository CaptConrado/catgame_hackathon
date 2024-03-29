// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Players = new Meteor.Collection("players");

if (Meteor.isClient) {
  Template.leaderboard.players = function () {
    return Players.find({}, {sort: {score: -1, name: 1}});
  };

  Template.leaderboard.selected_name = function () {
    var player = Players.findOne(Session.get("selected_player"));
    return player && player.name;
  };

  Template.player.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  Template.leaderboard.events({
    
    'click input.inc': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    },
    'click input.inc2': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    },
    'click input.inc3': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    },
    'click input.inc4': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    },
    'click input.inc5': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    },
    'click input.inc6': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    },
    'click input.inc7': function () {
      Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    }
    // 'click input.inc8': function () {
    //   Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    // }
    // 'click input.inc9': function () {
    //   Players.update(Session.get("selected_player"), {$inc: {score: 5}});
    // }
  });

  Template.player.events({
    'click': function () {
      Session.set("selected_player", this._id);
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = ["Heathcliff",
                   "Felix",
                   "Garfield",
                   "Simba"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: Math.floor(Random.fraction()*0)*0});
    }
  });
}
