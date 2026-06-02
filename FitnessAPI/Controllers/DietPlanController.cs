using FitnessAPI.DTOs;
using FitnessAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DietPlanController : ControllerBase
    {
        private readonly IDietPlanService _service;

        public DietPlanController(IDietPlanService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var dietPlan = await _service.GetByIdAsync(id);

            if (dietPlan == null)
            {
                return NotFound("Diet plan not found");
            }

            return Ok(dietPlan);
        }

        [HttpPost]
        public async Task<IActionResult> Add(DietPlanDTO dto)
        {
            var dietPlan = await _service.AddAsync(dto);

            return CreatedAtAction(
                nameof(GetById),
                new { id = dietPlan.DietPlanId },
                dietPlan);
        }

        [HttpPut]
        public async Task<IActionResult> Update(DietPlanDTO dto)
        {
            var dietPlan = await _service.UpdateAsync(dto);

            if (dietPlan == null)
            {
                return NotFound("Diet plan not found");
            }

            return Ok(dietPlan);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);

            if (!deleted)
            {
                return NotFound("Diet plan not found");
            }

            return NoContent();
        }
    }
}
