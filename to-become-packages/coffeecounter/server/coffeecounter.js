Meteor.startup( () => {
  iot_api = DDP.connect('https://iot-api.scalingo.io/');
  CoffeeCups = new Meteor.Collection('coffeecups', iot_api);

  Meteor.publish("coffeeCounter", function() {
    Counts.publish(this, "coffeeCups", CoffeeCups.find(), { noReady: true })
    return CoffeeCups.find({}, { limit: 10 })
  });
});
