Meteor.publish("things", (thingIds) => {
  check(thingIds, Match.Optional(Array));
  // if we specify IDs, we get the content too
  if (thingIds)
    return Things.find({name: {$in: thingIds}});
  else
    return Things.find({}, {fields: {name: 1}});
});

if (Things.find().count() === 0) {

  // XXX: loop over everything in the /things/ folder and insert it rather
  // than doing this manually
  for (let thingId of [
    "benbenet", "game-of-drones",
    "jumpstarts-header", "jumpstarts-intro",
    "livelearn", "nannii", "paper", "shell",
    "spinn", "swisscom", "taxi-electric", "tesloop", "umuntu-media"
  ]) {
    try {
      Things.insert({
        name: thingId,
        content_en: Assets.getText(`things/${thingId}.html`)
      });
    } catch (e) {}
  }
}
