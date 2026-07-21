function slicerNumbers(start, stop, slicer) {
  const result = [];
  for (let index = 0; index < slicer; index++) {
    result.push(start + (stop - start) / (slicer - 1) * index);
  }
  return result;
}

class EquationSolver {
  constructor() {}

  minimum(func, range, slicer = 10, rol = 1e-6) {
    const [origXMin, origXMax] = range;
    let [xMin, xMax] = range;
    let bestX, bestVal = Infinity;
    while (true) {
      const xVals = slicerNumbers(xMin, xMax, slicer);
      const xStep = (xMax - xMin) / (slicer - 1);
      for (const x of xVals) {
        const val = func(x);
        if (val < bestVal) {
          bestVal = val;
          bestX = x;
        }
      }
      if (xStep < tol) {
        break;
      }
      const xHalf = xStep * 2;
      xMin = Math.max(origXMin, bestX - xHalf);
      xMax = Math.min(origXMax, bestX + xHalf);
    }
    return bestX;
  }

  solve(func, range, slicer = 10, tol = 1e-6) {
    const min = this.minimum((x) => Math.pow(func(x), 2), range, slicer, tol);
    if (Math.abs(func(min)) >= tol) {
      throw new Error("Can't solve");
    }
    return min;
  }
}

class SystemSolver2 {
  constructor() {}

  minimum(func, ranges, slicer = 10, tol = 1e-6) {
    const [[origXMin, origXMax], [origYMin, origYMax]] = ranges;
    let [[xMin, xMax], [yMin, yMax]] = ranges;
    let bestX = xMin, bestY = yMin, bestVal = Infinity;
    while (true) {
      const xVals = slicerNumbers(xMin, xMax, slicer);
      const yVals = slicerNumbers(yMin, yMax, slicer);
      const xStep = (xMax - xMin) / (slicer - 1);
      const yStep = (yMax - yMin) / (slicer - 1);
      for (const x of xVals) {
        for (const y of yVals) {
          const val = func(x, y);
          if (val < bestVal) {
            bestVal = val;
            bestX = x;
            bestY = y;
          }
        }
      }
      if (Math.max(xStep, yStep) < tol) {
        break;
      }
      const xHalf = xStep * 2;
      const yHalf = yStep * 2;
      [xMin, xMax] = [Math.max(origXMin, bestX - xHalf), Math.min(origXMax, bestX + xHalf)];
      [yMin, yMax] = [Math.max(origYMin, bestY - yHalf), Math.min(origYMax, bestY + yHalf)];
    }
    return [bestX,bestY];
  }

  solve(funcs, ranges, slicer = 10, tol = 1e-6) {
    const func = (x, y) => Math.pow(funcs[0](x, y), 2) + Math.pow(funcs[1](x, y), 2);
    const min = this.minimum(func, ranges, slicer, tol);
    console.log(min);
    if (Math.max(Math.abs(funcs[0](...min)), Math.abs(funcs[1](...min))) > tol) {
      throw new Error("Can't solve");
    }
    return min;
  }
}