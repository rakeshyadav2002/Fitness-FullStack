using FitnessAPI.DTOs;
using FitnessAPI.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace FitnessAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CalorieController : ControllerBase
    {
        private readonly ICalorieService _service;

        public CalorieController(ICalorieService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Add(CalorieDTO dto)
        {
            var result = await _service.AddAsync(dto);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAllAsync());
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser(int userId)
        {
            return Ok(await _service.GetByUserAsync(userId));
        }

        [HttpDelete("{calorieId}")]
        public async Task<IActionResult> Delete(int calorieId)
        {
            var userIdClaim = User.FindFirst("UserId")?.Value;

            if (!int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized("Invalid user token");
            }

            var deleted = await _service.DeleteAsync(calorieId, userId);

            if (!deleted)
            {
                return NotFound("Calorie record not found");
            }

            return NoContent();
        }
    }
}
