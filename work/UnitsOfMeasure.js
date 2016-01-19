

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
    },
    servings: {
        _id: "servings",
        name: "Food Servings",
        options: [{
            0.0333: "1 serving per month",
            0.0714: "1 serving every 2 weeks",
            0.1428: "1 serving per week",
            0.2: "1 serving per 5 days",
            0.333: "1 serving per 3 days",
            0.5: "1 serving per 2 days",
            1: "1 serving per day",
            1.5: "1.5 servings per day",
            2: "2 servings per day",
            3: "3 servings per day",
            4: "4 servings per day",
            5: "5 servings per day",
            6: "6 servings per day",
            7: "7 servings per day",
            8: "8 servings per day",
            9: "9 servings per day",
            10: "10 servings per day",
            12: "12 servings per day",
            15: "15 servings per day",
            20: "20 servings per day",
            25: "25 servings per day",
            50: "50 servings per day",
            100: "100 servings per day"
        }],
        help: "1 serving of concentrated food (nuts, candy) is 1 ounce or 28gm.  1 serving of fruit is a medium-sized piece of fruit or about 1 cup or 226gm.  1 serving of leafy vegetables is 1 cup or 226 gm.  1 serving of solid vegetables is about 1/2 cup or 113 gm.  1 "
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