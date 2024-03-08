export default class MathHelper {
  public static GetEllipsePosition(itemsNumber: number, axisX: number, axisY: number, offsetRadians: number){
    const result = [];
    const stepDeg = Math.PI / itemsNumber * 2;

    for (let i = 0; i < itemsNumber; ++i) {
      const x = axisX * Math.cos(stepDeg * i + offsetRadians);
      const y = axisY * Math.sin(stepDeg * i + offsetRadians);

      result.push({x, y});
    }

    return result;
  }
}