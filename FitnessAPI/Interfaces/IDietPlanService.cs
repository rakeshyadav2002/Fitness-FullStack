using FitnessAPI.DTOs;

namespace FitnessAPI.Interfaces
{
    public interface IDietPlanService
    {
        Task<List<DietPlanDTO>> GetAllAsync();

        Task<DietPlanDTO?> GetByIdAsync(int id);

        Task<DietPlanDTO> AddAsync(DietPlanDTO dto);

        Task<DietPlanDTO?> UpdateAsync(DietPlanDTO dto);

        Task<bool> DeleteAsync(int id);
    }
}
