namespace API.Common.Utils;

public static class CookieOptionsBuilder
{
    public static CookieOptions GetRefreshTokenOptions(TimeSpan? maxAge = null, DateTimeOffset? expires = null)
    {
        return new CookieOptions
        {
            MaxAge = maxAge ?? TimeSpan.FromDays(30),
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            IsEssential = true,
            Expires = expires ?? DateTimeOffset.Now.AddDays(30),
        };
    }
}