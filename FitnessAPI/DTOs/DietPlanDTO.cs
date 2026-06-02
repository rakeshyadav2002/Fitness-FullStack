namespace FitnessAPI.DTOs
{
    public class DietPlanDTO
    {
        public int DietPlanId { get; set; }

        public string PlanName { get; set; } = string.Empty;

        public string GoalType { get; set; } = string.Empty;

        public int CaloriesPerDay { get; set; }

        public string Breakfast { get; set; } = string.Empty;

        public string Lunch { get; set; } = string.Empty;

        public string Dinner { get; set; } = string.Empty;

        public string Snacks { get; set; } = string.Empty;
    }
}
