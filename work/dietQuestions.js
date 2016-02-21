/**
 * Created by dd on 1/15/16
 */

biolog.questions = {};

biolog.questions.Diet = [
    {
        _id: "diet_daily_meat",
        name: "Daily Meat Intake",
        short: "Meat",
        ask: "How much meat (beef, chicken, turkey, lamb, pork) do you eat daily, on average?",
        measure: "food"
    },
    {
        _id: "diet_daily_fish",
        name: "Daily Fish Intake",
        short: "Fish",
        ask: "How much fish do you eat daily, on average?",
        measure: "food"
    },
    {
        _id: "diet_daily_shellfish",
        name: "Daily Shellfish Intake",
        short: "Shellfish",
        ask: "How much shellfish do you eat daily, on average?",
        measure: "food"
    },
    {
        _id: "diet_daily_milk",
        name: "Daily Whole Milk Intake",
        short: "Milk",
        ask: "How many servings of full-fat milk do you drink daily, on average?",
        measure: "drink"
    },
    {
        _id: "diet_daily_nonfatMilk",
        name: "Daily Nonfat Milk Intake",
        short: "Nonfat Milk",
        ask: "How much nonfat milk do you drink daily, on average?",
        measure: "drink"
    },
    {
        _id: "diet_daily_cheese",
        name: "Daily Cheese Intake",
        short: "Cheese",
        ask: "How much cheese do you eat daily, on average?",
        measure: "food"
    },
    {
        _id: "diet_daily_eggs",
        name: "Daily Egg Intake",
        short: "Eggs",
        ask: "How many eggs do you eat daily, on average?"
    },
    {
        _id: "diet_daily_wholegrains",
        name: "Daily Intake of Wholegrains",
        short: "Wholegrains",
        ask: "How much whole grains (unrefined wheat, oats, barley) do you eat daily, on average?",
        measure: "food"
    },
    {
        _id: "diet_daily_flax",
        name: "Daily Intake of Flax Seed",
        short: "Flax",
        ask: "How much flax seed do you eat daily, on average?",
        measure: "food"
    },
    {
        _id: "diet_daily_legumes",
        name: "Daily Legume Intake",
        short: "Legumes",
        ask: "How much legumes (beans, peas, lentils) do you eat daily, on average?",
        measure: "food"
    },
    {
        _id: "diet_daily_vegetables",
        name: "Daily Intake of Vegetables",
        short: "Vegetables",
        ask: "How much vegetables do you eat daily, on average?",
        measure: "servings",
        help: "French fries and other starches do not count"
    },
    {
        _id: "diet_daily_cruciferous",
        name: "Daily Intake of Cruciferous Vegetables",
        short: "Leafy Greens",
        ask: "How much cruciferous vegetables (broccoli, kale, collards, brussels, cauliflower, cabbage) do you eat daily, on average?",
        measure: "food"
    },
    {
        _id: "diet_daily_greens",
        name: "Daily Intake of Leafy Greens",
        short: "Leafy Greens",
        ask: "How much leafy greens (lettuce, spinach) do you eat daily, on average?",
        measure: "food"
    },
    {
        _id: "diet_daily_nuts",
        name: "Daily Nut Intake",
        short: "Nuts",
        ask: "How many servings of nuts do you eat daily, on average?",
        measure: "servings"
    },
    {
        _id: "diet_servings_nuts",
        name: "Frequency of Nut Servings",
        short: "Nuts",
        ask: "How often do you eat 1 handful or serving (1 ounce, 28gm) of nuts?",
        measure: "frequency"
    },
    {
        _id: "diet_daily_fruit",
        property: "diet_daily_fruit",
        name: "Daily Fruit Intake",
        short: "Fruit",
        ask: "How many servings of fruit do you eat daily, on average?",
        measure: "servings",
        help: "1 serving is like a medium-sized apple"
    },
    {
        _id: "diet_daily_berries",
        name: "Daily Berry Intake",
        short: "Berries",
        ask: "How much berries (strawberries, cherries, blueberries, ...) do you eat daily, on average?",
        measure: "food"
    },
    {
        _id: "diet_daily_spices",
        name: "Daily Spice Intake",
        short: "Spices",
        ask: "How much ground spice (pepper, cumin, oregano) do you eat daily, on average?",
        measure: "smallFood"
    },
    {
        _id: "diet_daily_turmeric",
        name: "Daily Turmeric Intake",
        short: "Turmeric",
        ask: "How much turmeric do you eat daily, on average?",
        measure: "smallFood"
    }
];

biolog.rules = {};

biolog.rules.Diet = [
    {
        _id: "mortality_diet_nutServingsPerWeek_nhanes",
        references: [
            {
                urls: ["http://www.nejm.org/doi/full/10.1056/NEJMoa1307352?qu"],
                title: "Association of Nut Consumption with Total and Cause-Specific Mortality",
                date: "2013-11-21",
                citation: "Ying Bao, M.D., Sc.D., Jiali Han, Ph.D., Frank B. Hu, M.D., Ph.D., Edward L. Giovannucci, M.D., Sc.D., Meir J. Stampfer, M.D., Dr.P.H., Walter C. Willett, M.D., Dr.P.H., and Charles S. Fuchs, M.D., M.P.H. N Engl J Med 2013; 369:2001-2011",
                doi: "DOI: 10.1056/NEJMoa1307352"
            }
        ],
        inputs: [
            "diet_dailyIntake.nuts.normVal",
            "demographics_gender.text"
        ],
        output: "health_relativeMortality",
        map: {
            "x0 == 0": 1,
            "x1=='female' && x0 >= 0 && x0 <= 0.1": 0.94,
            "x1=='female' && x0 >= 0.1 && x0 <= 0.2": 0.88,
            "x1=='female' && x0 >= 0.2 && x0 <= 0.6": 0.85,
            "x1=='female' && x0 > 0.6": 0.84,
            "x1=='male' && x0 >= 0 && x0 <= 0.1": 0.91,
            "x1=='male' && x0 >= 0.1 && x0 <= 0.2": 0.91,
            "x1=='male' && x0 >= 0.2 && x0 <= 0.6": 0.89,
            "x1=='male' && x0 > 0.6": 0.92
        }
    },
    {
        _id: "mortality_diet_fruitServingsPerWeek_metaCohort",
        references: {
            urls: [
                "http://www.bmj.com/content/349/bmj.g4490",
                "http://www.bmj.com/content/bmj/suppl/2014/07/29/bmj.g4490.DC1/wanx018915.ww2_default.pdf"
            ]
        },
        inputs: ["diet_dailyIntake.fruit.normVal"],
        output: "health_relativeMortality",
        map: {
            "x0 < 1": 1,
            "x0 >=1 && x0 < 2": 0.9,
            "x0 >=2 && x0 < 3": 0.825,
            "x0 >= 3 && x0 < 4": 0.81,
            "x0 >= 4 && x0 < 5": 0.805,
            "x0 >= 5 && x0 < 6": 0.8,
            "x0 >=6": 0.795
        }
    },
    {
        _id: "mortality_diet_vegetableServingsPerWeek_metaCohort",
        references: {
            urls: [
                "http://www.bmj.com/content/349/bmj.g4490",
                "http://www.bmj.com/content/bmj/suppl/2014/07/29/bmj.g4490.DC1/wanx018915.ww2_default.pdf"
            ]
        },
        inputs: ["diet_dailyIntake.vegetables.normVal"],
        output: "health_relativeMortality",
        map: {
            "x0 < 1": 1,
            "x0 >= 1 && x0 < 2": 0.86,
            "x0 >= 2 && x0 < 3": 0.8,
            "x0 >= 3 && x0 < 4": 0.75,
            "x0 >= 4 && x0 < 5": 0.736,
            "x0 >= 5 && x0 < 6": 0.73,
            "x0 >= 6 && x0 < 6": 0.728,
            "x0 >= 7 && x0 < 6": 0.726,
            "x0 >= 8 && x0": 0.725
        }
    }
];
