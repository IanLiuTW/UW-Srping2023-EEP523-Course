describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have main screen', async () => {
    await expect(element(by.id('mainScreen'))).toExist();
  });

  it('should have weather information', async () => {
    await expect(element(by.text("Today's Weather Information"))).toBeVisible();
  });

  it('should have quote of the day', async () => {
    await expect(element(by.text("Quote of the Day"))).toBeVisible();
  });

  it('should have start session button', async () => {
    await expect(element(by.text("START SESSION"))).toBeVisible();
  });

  it('should have session history button', async () => {
    await expect(element(by.text("SESSION HISTORY"))).toBeVisible();
  });

  it('should have session info widget', async () => {
    await expect(element(by.text("Calories Goal: 800 kcals"))).toBeVisible();
  });
});
