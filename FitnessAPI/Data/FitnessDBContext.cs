using FitnessAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessAPI.Data
{
    public class FitnessDBContext : DbContext
    {
        public FitnessDBContext(
            DbContextOptions<FitnessDBContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<BMIRecord> BMIRecords { get; set; }

        public DbSet<CalorieTracker> CalorieTracker { get; set; }

        public DbSet<DietPlan> DietPlans { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<UserRole>()
                .HasOne(u => u.User)
                .WithMany(ur => ur.UserRoles)
                .HasForeignKey(u => u.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(r => r.Role)
                .WithMany(ur => ur.UserRoles)
                .HasForeignKey(r => r.RoleId);

            modelBuilder.Entity<BMIRecord>()
                .HasOne(b => b.User)
                .WithMany()
                .HasForeignKey(b => b.UserId);

            modelBuilder.Entity<BMIRecord>()
                .Property(x => x.Height)
                .HasPrecision(10, 2);

            modelBuilder.Entity<BMIRecord>()
                .Property(x => x.Weight)
                .HasPrecision(10, 2);

            modelBuilder.Entity<BMIRecord>()
                .Property(x => x.BMIValue)
                .HasPrecision(10, 2);

            modelBuilder.Entity<CalorieTracker>()
                .Property(x => x.Quantity)
                .HasPrecision(10, 2);

            modelBuilder.Entity<DietPlan>()
                .HasData(
                    new DietPlan
                    {
                        DietPlanId = 1,
                        PlanName = "Weight Loss",
                        GoalType = "Weight Loss",
                        CaloriesPerDay = 1500,
                        Breakfast = "Oats with berries and boiled eggs",
                        Lunch = "Grilled chicken salad with brown rice",
                        Dinner = "Steamed vegetables with fish",
                        Snacks = "Greek yogurt and almonds"
                    },
                    new DietPlan
                    {
                        DietPlanId = 2,
                        PlanName = "Muscle Gain",
                        GoalType = "Muscle Gain",
                        CaloriesPerDay = 2800,
                        Breakfast = "Egg omelette with whole wheat toast",
                        Lunch = "Chicken breast with rice and vegetables",
                        Dinner = "Lean beef with sweet potato",
                        Snacks = "Protein shake and peanut butter sandwich"
                    },
                    new DietPlan
                    {
                        DietPlanId = 3,
                        PlanName = "Maintenance",
                        GoalType = "Maintenance",
                        CaloriesPerDay = 2200,
                        Breakfast = "Whole grain cereal with milk and fruit",
                        Lunch = "Turkey wrap with salad",
                        Dinner = "Pasta with grilled vegetables",
                        Snacks = "Fruit, nuts, and cottage cheese"
                    });

            base.OnModelCreating(modelBuilder);
        }
    }
}
