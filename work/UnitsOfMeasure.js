

biolog.Measures = {
    food: {
        _id: "food",
        name: "Quantity of Food",
        units: ["gm", "kg", "oz", "cups"]
    },
    drink: {
        _id: "drink",
        name: "Quantity of Drink",
        units: ["mL", "liters", "oz", "cups"]
    },
    smallFood: {
        _id: "smallFood",
        name: "Quantity of Food (small)",
        units: ["gm", "teaspoons", "oz"]
    },
    time: {
        _id: "time",
        name: "Time",
        units: ["hours", "minutes", "seconds"]
    }
};

biolog.Units = {
    gm: {
        _id: "gm",
        name: "grams",
        short: "gm",
        canonical: "gm",
        convert: 1
    },
    kg: {
        _id: "kg",
        name: "kilograms",
        short: "kg",
        canonical: "gm",
        convert: 0.01
    },
    oz: {
        _id: "oz",
        name: "ounces",
        short: "ounces",
        canonical: "gm",
        convert: 0.035274
    },
    cups: {
        _id: "cups",
        name: "cups",
        short: "cups",
        canonical: "gm",
        convert: 0.00440925
    },
    teaspoons: {
        _id: "teaspoons",
        name: "teaspoons",
        short: "teaspoons",
        canonical: "gm",
        convert: 0.20288
    },
    hours: {
        _id: "hours",
        name: "hours",
        short: "hours",
        canonical: "minutes",
        convert: 60
    },
    minutes: {
        _id: "minutes",
        name: "minutes",
        short: "minutes",
        canonical: "minutes",
        convert: 1
    },
    seconds: {
        _id: "seconds",
        name: "seconds",
        short: "seconds",
        canonical: "minutes",
        convert: 0.01666666
    }
};