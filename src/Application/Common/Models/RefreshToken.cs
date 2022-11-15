namespace Application.Common.Models;

public class RefreshToken
{
    public int Id { get; set; }
    public string TokenValue { get; set; }
    public string UserId { get; set; }

    public static RefreshToken Create(string tokenValue, string userId)
    {
        return new RefreshToken
        {
            TokenValue = tokenValue,
            UserId = userId
        };
    }
}