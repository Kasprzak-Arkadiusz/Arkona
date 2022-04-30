using System.Text;

namespace Domain.Services;

public static class UserFriendlyNumberGenerator
{
    public static string Generate(int id, long milliseconds, int lastDigit)
    {
        var millisecondsSpan = milliseconds.ToString().AsSpan();
        var idSpan = id.ToString().AsSpan();
        var idLength = idSpan.Length;

        var builder = new StringBuilder(16);

        builder.Append(idLength < 4
            ? string.Concat(idSpan, millisecondsSpan[..(4 - idLength)])
            : idSpan[(idLength - 4)..]);

        builder.Append('-');
        builder.Append(millisecondsSpan.Slice(4, 6));

        builder.Append('-');
        builder.Append(millisecondsSpan.Slice(10, 3));
        builder.Append(lastDigit);

        return builder.ToString();
    }
}