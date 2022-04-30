namespace Domain.Utils;

public static class DateTimeExtension
{
    public static long ToUnixMilliseconds(this DateTime dateTime)
    {
        var epoch = DateTime.UnixEpoch;
        var timeSpan = dateTime - epoch;
        return (long)timeSpan.TotalMilliseconds;
    }
}