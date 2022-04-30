using Application.Common.Interfaces.IApplicationDBContext;
using Domain.Entities;

namespace Infrastructure.Persistence.Utils;

public static class DatabaseSeeder
{
    private static IApplicationDbContext _context;
    
    public async static Task SeedAsync(IApplicationDbContext context)
    {
        _context = context;
        if (_context.Genres.Any())
        {
            return;
        }
        
        
    }
}