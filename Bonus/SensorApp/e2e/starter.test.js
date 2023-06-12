describe('SensorApp', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have main view', async () => {
    await expect(element(by.id('main'))).toBeVisible();
  });

  it('should have switch button', async () => {
    await element(by.id('switchButton'))
    await expect(element(by.text('SWITCH BETWEEN ACCELEROMETER/GYROSCOPE'))).toBeVisible();
  });

  it('should show X, Y, Z data and the related text', async () => {
    await expect(element(by.id('dataText'))).toExist();
    await expect(element(by.id('dataX'))).toExist();
    await expect(element(by.id('dataY'))).toExist();
    await expect(element(by.id('dataZ'))).toExist();
  });

  it('should show Accelerometer text', async () => {
    await expect(element(by.text('Displaying Accelerometer Data:'))).toBeVisible();
  });

  it('after tapping the switch button, should switch to showing Gyroscope text', async () => {
    await element(by.id('switchButton')).longPress();
    await expect(element(by.text('Displaying Gyroscope Data:'))).toBeVisible();
  });
});
