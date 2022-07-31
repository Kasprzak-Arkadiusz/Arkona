using Microsoft.EntityFrameworkCore;

namespace Application.Common.Models;

public class PaginatedList<T>
{
    private const int MinPageNumber = 1;
    private const int MinPageSize = 1;

    public List<T> Items { get; }
    public int PageNumber { get; }
    public int TotalPages { get; }
    public int TotalCount { get; }

    private PaginatedList(List<T> items, int count, int pageNumber, int totalPages)
    {
        PageNumber = pageNumber;
        TotalPages = totalPages;
        TotalCount = count;
        Items = items;
    }

    public bool HasPreviousPage => PageNumber > 1;

    public bool HasNextPage => PageNumber < TotalPages;

    private static void CheckArguments(ref int pageNumber, ref int pageSize)
    {
        if (pageNumber < MinPageNumber)
        {
            pageNumber = MinPageNumber;
        }

        if (pageSize < MinPageSize)
        {
            pageSize = MinPageSize;
        }
    }

    public static async Task<PaginatedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
    {
        CheckArguments(ref pageNumber, ref pageSize);

        var count = await source.CountAsync();
        var totalPages = (int)Math.Ceiling(count / (double)pageSize);

        if (pageNumber > totalPages)
        {
            pageNumber = totalPages;
        }

        var items = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();

        return new PaginatedList<T>(items, count, pageNumber, totalPages);
    }
}