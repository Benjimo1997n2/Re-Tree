class ItemModel {
  constructor() {
    this.availableItems = {
        "House": {
            "cost": 1000,
            "co2PerSecond": 10
        },
        "Campfire": {
            "cost": 500,
            "co2PerSecond": 5
        },
        "Fence": {
            "cost": 100,
            "co2PerSecond": 1
        },
        "Light": {
            "cost": 250,
            "co2PerSecond": 3
        },
        "Rock": {
            "cost": 50,
            "co2PerSecond": 0.5
        }
    };
  }

  getAvailableItems() {
    return this.availableItems;
  }
}
