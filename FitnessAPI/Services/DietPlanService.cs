using FitnessAPI.Data;
using FitnessAPI.DTOs;
using FitnessAPI.Interfaces;
using FitnessAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessAPI.Services
{
    public class DietPlanService : IDietPlanService
    {
        private readonly FitnessDBContext _context;

        public DietPlanService(FitnessDBContext context)
        {
            _context = context;
        }

        public async Task<List<DietPlanDTO>> GetAllAsync()
        {
            return await _context.DietPlans
                .AsNoTracking()
                .OrderBy(x => x.DietPlanId)
                .Select(x => ToDto(x))
                .ToListAsync();
        }

        public async Task<DietPlanDTO?> GetByIdAsync(int id)
        {
            return await _context.DietPlans
                .AsNoTracking()
                .Where(x => x.DietPlanId == id)
                .Select(x => ToDto(x))
                .FirstOrDefaultAsync();
        }

        public async Task<DietPlanDTO> AddAsync(DietPlanDTO dto)
        {
            var entity = new DietPlan
            {
                PlanName = dto.PlanName,
                GoalType = dto.GoalType,
                CaloriesPerDay = dto.CaloriesPerDay,
                Breakfast = dto.Breakfast,
                Lunch = dto.Lunch,
                Dinner = dto.Dinner,
                Snacks = dto.Snacks
            };

            await _context.DietPlans.AddAsync(entity);
            await _context.SaveChangesAsync();

            return ToDto(entity);
        }

        public async Task<DietPlanDTO?> UpdateAsync(DietPlanDTO dto)
        {
            var entity =
                await _context.DietPlans
                .FirstOrDefaultAsync(x => x.DietPlanId == dto.DietPlanId);

            if (entity == null)
            {
                return null;
            }

            entity.PlanName = dto.PlanName;
            entity.GoalType = dto.GoalType;
            entity.CaloriesPerDay = dto.CaloriesPerDay;
            entity.Breakfast = dto.Breakfast;
            entity.Lunch = dto.Lunch;
            entity.Dinner = dto.Dinner;
            entity.Snacks = dto.Snacks;

            await _context.SaveChangesAsync();

            return ToDto(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity =
                await _context.DietPlans
                .FirstOrDefaultAsync(x => x.DietPlanId == id);

            if (entity == null)
            {
                return false;
            }

            _context.DietPlans.Remove(entity);
            await _context.SaveChangesAsync();

            return true;
        }

        private static DietPlanDTO ToDto(DietPlan entity)
        {
            return new DietPlanDTO
            {
                DietPlanId = entity.DietPlanId,
                PlanName = entity.PlanName,
                GoalType = entity.GoalType,
                CaloriesPerDay = entity.CaloriesPerDay,
                Breakfast = entity.Breakfast,
                Lunch = entity.Lunch,
                Dinner = entity.Dinner,
                Snacks = entity.Snacks
            };
        }
    }
}
