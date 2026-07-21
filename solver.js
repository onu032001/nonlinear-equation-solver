function numbers(start, stop, slicer) {
  const result = [];
  for (let index = 0; index < slicer; index++) {
    result.push(start + (stop - start) / (slicer - 1) * index);
  }
  return result;
}

class EquationSolver {
  constructor() {}

  minimum(func, range, slicer = 10, rol = 1e-6) {
    let [xMin, xMax] = range;
    let xVals, bestX, bestVal = Infinity;
    while (true) {
      xVals = numbers(xMin, xMax, slicer);
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
      [xMin, xMax] = [Math.max(xMin, bestX - xStep), Math.min(xMax, bestX + xStep)];
    }
    return bestX;
  }

  solve(func, range, slicer = 10, tol = 1e-6) {
    const min = this.minimum((x) => Math.pow(func(x), 2), range, slicer, tol);
    if (func(min) >= tol) {
      throw new Error("Can't solve");
    }
    return min;
  }
}

class SystemSolver2 {
  constructor() {}

  minimum(func, ranges, slicer = 10, tol = 1e-6) {
    let [[xMin, xMax], [yMin, yMax]] = ranges;
    let xVals, yVals, bestX, bestY, bestVal = Infinity;
    while (true) {
      xVals = numbers(xMin, xMax, slicer);
      yVals = numbers(yMin, yMax, slicer);
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
      [xMin, xMax] = [Math.max(xMin, bestX - xStep), Math.min(xMax, bestX + xStep)];
      [yMin, yMax] = [Math.max(yMin, bestY - yStep), Math.min(yMax, bestY + yStep)];
    }
    return [bestX, bestY];
  }

  solve(funcs, ranges, slicer = 10, tol = 1e-6) {
    const min = this.minimum((x, y) => Math.pow(funcs[0](x, y), 2) + Math.pow(funcs[1](x, y), 2), range, slicer, tol);
    if (func(min[0], min[1]) >= tol) {
      throw new Error("Can't solve system");
    }
    return min;
  }
}
