using FitnessAPI.Data;
using FitnessAPI.DTOs;
using FitnessAPI.Helpers;
using FitnessAPI.Interfaces;
using FitnessAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace FitnessAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly FitnessDBContext _context;

        private readonly JwtHelper _jwtHelper;

        public AuthService(
            FitnessDBContext context,
            JwtHelper jwtHelper)
        {
            _context = context;

            _jwtHelper = jwtHelper;
        }

        public async Task<string> RegisterAsync(RegisterDTO dto)
        {
            try
            {
                var existingUser =
                    await _context.Users
                    .FirstOrDefaultAsync(x =>
                        x.Email == dto.Email);

                if (existingUser != null)
                {
                    return "Email already exists";
                }

                int newUserId =
                    await _context.Users.AnyAsync()
                    ? await _context.Users.MaxAsync(x => x.UserId) + 1
                    : 1;

                User user = new User()
                {
                    UserId = newUserId,

                    FullName = dto.FullName,

                    Email = dto.Email,

                    PasswordHash =
                        BCrypt.Net.BCrypt.HashPassword(dto.Password),

                    CreatedDate = DateTime.Now,

                    IsActive = true
                };

                await _context.Users.AddAsync(user);

                await _context.SaveChangesAsync();

                return "User Registered Successfully";
            }
            catch (Exception ex)
            {
                return ex.InnerException?.Message ?? ex.Message;
            }
        }

        public async Task<string?> LoginAsync(LoginDTO dto)
        {
            var user =
                await _context.Users
                .FirstOrDefaultAsync(x =>
                    x.Email == dto.Email);

            if (user == null)
            {
                return null;
            }

            bool isPasswordValid =
                BCrypt.Net.BCrypt.Verify(
                    dto.Password,
                    user.PasswordHash);

            if (!isPasswordValid)
            {
                return null;
            }

            return _jwtHelper.GenerateToken(user);
        }
    }
}