IF OBJECT_ID('dbo.DietPlans', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.DietPlans
    (
        DietPlanId INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_DietPlans PRIMARY KEY,
        PlanName NVARCHAR(100) NOT NULL,
        GoalType NVARCHAR(100) NOT NULL,
        CaloriesPerDay INT NOT NULL,
        Breakfast NVARCHAR(500) NOT NULL,
        Lunch NVARCHAR(500) NOT NULL,
        Dinner NVARCHAR(500) NOT NULL,
        Snacks NVARCHAR(500) NOT NULL
    );
END;

IF NOT EXISTS (SELECT 1 FROM dbo.DietPlans WHERE PlanName = 'Weight Loss')
BEGIN
    INSERT INTO dbo.DietPlans
        (PlanName, GoalType, CaloriesPerDay, Breakfast, Lunch, Dinner, Snacks)
    VALUES
        (
            'Weight Loss',
            'Weight Loss',
            1500,
            'Oats with berries and boiled eggs',
            'Grilled chicken salad with brown rice',
            'Steamed vegetables with fish',
            'Greek yogurt and almonds'
        );
END;

IF NOT EXISTS (SELECT 1 FROM dbo.DietPlans WHERE PlanName = 'Muscle Gain')
BEGIN
    INSERT INTO dbo.DietPlans
        (PlanName, GoalType, CaloriesPerDay, Breakfast, Lunch, Dinner, Snacks)
    VALUES
        (
            'Muscle Gain',
            'Muscle Gain',
            2800,
            'Egg omelette with whole wheat toast',
            'Chicken breast with rice and vegetables',
            'Lean beef with sweet potato',
            'Protein shake and peanut butter sandwich'
        );
END;

IF NOT EXISTS (SELECT 1 FROM dbo.DietPlans WHERE PlanName = 'Maintenance')
BEGIN
    INSERT INTO dbo.DietPlans
        (PlanName, GoalType, CaloriesPerDay, Breakfast, Lunch, Dinner, Snacks)
    VALUES
        (
            'Maintenance',
            'Maintenance',
            2200,
            'Whole grain cereal with milk and fruit',
            'Turkey wrap with salad',
            'Pasta with grilled vegetables',
            'Fruit, nuts, and cottage cheese'
        );
END;
