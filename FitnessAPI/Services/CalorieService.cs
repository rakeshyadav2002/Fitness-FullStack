using FitnessAPI.Data;
using FitnessAPI.DTOs;
using FitnessAPI.Interfaces;
using FitnessAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessAPI.Services
{
    public class CalorieService : ICalorieService
    {
        private readonly FitnessDBContext _context;

        public CalorieService(FitnessDBContext context)
        {
            _context = context;
        }

        public async Task<CalorieDTO> AddAsync(CalorieDTO dto)
        {
            CalorieTracker entity = new CalorieTracker()
            {
                CalorieId =
                    _context.CalorieTracker.Any()
                    ? _context.CalorieTracker.Max(x => x.CalorieId) + 1
                    : 1,

                UserId = dto.UserId,
                FoodName = dto.FoodName,
                MealType = dto.MealType,
                Calories = dto.Calories,
                Quantity = dto.Quantity,
                CreatedDate = DateTime.Now
            };

            await _context.CalorieTracker.AddAsync(entity);
            await _context.SaveChangesAsync();

            return ToDto(entity);
        }

        public async Task<List<CalorieDTO>> GetAllAsync()
        {
            return await _context.CalorieTracker
                .AsNoTracking()
                .OrderByDescending(x => x.CreatedDate)
                .ThenByDescending(x => x.CalorieId)
                .Select(x => new CalorieDTO
                {
                    CalorieId = x.CalorieId,
                    UserId = x.UserId,
                    FoodName = x.FoodName,
                    MealType = x.MealType,
                    Calories = x.Calories,
                    Quantity = x.Quantity,
                    CreatedDate = x.CreatedDate
                })
                .ToListAsync();
        }

        public async Task<List<CalorieDTO>> GetByUserAsync(int userId)
        {
            return await _context.CalorieTracker
                .AsNoTracking()
                .Where(x => x.UserId == userId)
                .OrderByDescending(x => x.CreatedDate)
                .ThenByDescending(x => x.CalorieId)
                .Select(x => new CalorieDTO
                {
                    CalorieId = x.CalorieId,
                    UserId = x.UserId,
                    FoodName = x.FoodName,
                    MealType = x.MealType,
                    Calories = x.Calories,
                    Quantity = x.Quantity,
                    CreatedDate = x.CreatedDate
                })
                .ToListAsync();
        }

        public async Task<bool> DeleteAsync(int calorieId, int userId)
        {
            var record =
                await _context.CalorieTracker
                .FirstOrDefaultAsync(x =>
                    x.CalorieId == calorieId &&
                    x.UserId == userId);

            if (record == null)
            {
                return false;
            }

            _context.CalorieTracker.Remove(record);
            await _context.SaveChangesAsync();

            return true;
        }

        private static CalorieDTO ToDto(CalorieTracker entity)
        {
            return new CalorieDTO
            {
                CalorieId = entity.CalorieId,
                UserId = entity.UserId,
                FoodName = entity.FoodName,
                MealType = entity.MealType,
                Calories = entity.Calories,
                Quantity = entity.Quantity,
                CreatedDate = entity.CreatedDate
            };
        }
    }
}
