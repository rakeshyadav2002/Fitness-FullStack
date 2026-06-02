using FitnessAPI.DTOs;

namespace FitnessAPI.Interfaces
{
    public interface ICalorieService
    {
        Task<CalorieDTO> AddAsync(CalorieDTO dto);

        Task<List<CalorieDTO>> GetAllAsync();

        Task<List<CalorieDTO>> GetByUserAsync(int userId);

        Task<bool> DeleteAsync(int calorieId, int userId);
    }
}
