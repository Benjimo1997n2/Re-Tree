class TreeUpgraderModel {
  constructor() {
    this.upgradeData = [
      {
        cost: 10,
        co2PerSecond: 1,
      },
      {
        cost: 25,
        co2PerSecond: 2,
      },
      {
        cost: 60,
        co2PerSecond: 4,
      },
      {
        cost: 150,
        co2PerSecond: 8,
      },
      {
        cost: 375,
        co2PerSecond: 16,
      },
      {
        cost: 950,
        co2PerSecond: 32,
      },
      {
        cost: 2400,
        co2PerSecond: 64,
      },
      {
        cost: 6100,
        co2PerSecond: 128,
      },
      {
        cost: 15500,
        co2PerSecond: 256,
      },
      {
        cost: 39500,
        co2PerSecond: 512,
      },
    ];
  }

  getUpgradeCost(level) {
    return this.upgradeData[level - 1].cost;
  }

  getCo2PerSecond(level) {
    return this.upgradeData[level - 1].co2PerSecond;
  }
}
