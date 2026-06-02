using System.ComponentModel.DataAnnotations;

namespace FitnessAPI.Models
{
    public class DietPlan
    {
        [Key]
        public int DietPlanId { get; set; }

        [Required]
        [MaxLength(100)]
        public string PlanName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        public string GoalType { get; set; } = string.Empty;

        public int CaloriesPerDay { get; set; }

        [Required]
        [MaxLength(500)]
        public string Breakfast { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Lunch { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Dinner { get; set; } = string.Empty;

        [MaxLength(500)]
        public string Snacks { get; set; } = string.Empty;
    }
}
