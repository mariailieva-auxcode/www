import * as pdf from 'distributions-weibull-pdf';
import * as gamma from 'gamma';

export function generatedEnergy(averageWind, diameter, capacity, altitude, number) {

    //-----------------------------------
    //
    // Used to calculate the annual generated energy by the wind turbine
    //
    //-----------------------------------
    //
    // average_wind = the average wind speed in the location
    // diameter = the diameter of the wind turbine
    // capcity = the rated power of the wind turbine
    // altitude = the altitude of the location
    // number = number of wind turbines at this capacity
    //
    //-----------------------------------
    // 
    // Returns: The annual generated energy of the wind turbine
    //
    //-----------------------------------

    // import numpy as np
    // import scipy
    // from scipy.special import gamma
    // from scipy.stats import weibull_min
    // import matplotlib.pyplot as plt


    // Define shape and scale parameter
    const shapeP = 2;
    const scaleP = averageWind / gamma(1 / shapeP + 1);


    // Create wind speeds and find weibull of wind speeds
    // const wind_speeds = np.arange(0.0, 30.0, 0.2)
    const windSpeeds = [];
    for (let i = 0; i < (30.0 - 0.0) / 0.2; i++) {
        windSpeeds.push(i * 0.2);
    }

    // const weibull = weibull_minPdf(wind_speeds, 2, scale_p);
    const weibull = pdf(windSpeeds, { lambda: scaleP, k: 2 });

    const pressureRatio
        = Math.pow((1 - 0.0065 * (altitude) / 288.16), (9.81 / 287 / 0.0065))
        * (288.26 / (288.16 - 0.0065 * (altitude)));

    // Create power curves
    const powerCurve = [];

    for (let i of windSpeeds) {
        // At these wind speeds the wind turbine is switched off
        if (i < 3 || i > 25) {
            powerCurve.push(0);
        } else {
            let power
                = 1.225
                * (diameter / 2) * (diameter / 2)
                * 0.41
                * (i * i * i) / 2 / 1000 * Math.PI * pressureRatio;
            if (power > capacity)
                power = capacity;

            powerCurve.push(power);
        }
    }

    //plt.plot(wind_speeds, power_curve)
    // pow_weibull = np.multiply(weibull, power_curve)  // Find how often this power is generated
    const prod = [];
    for (let i = 0; i < weibull.length; i++) {
        prod.push(weibull[i] * powerCurve[i]);
    }
    const pow_weibull = prod;

    // Integrate power curve to find annual energy

    let sum = 0;
    for (let i = 0; i < pow_weibull.length; i++) {
        sum += pow_weibull[i];
    }

    const annual_energy = sum * 8760 * 0.2;

    return annual_energy * number;
}