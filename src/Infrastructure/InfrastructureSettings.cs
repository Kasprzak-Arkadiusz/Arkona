#pragma warning disable CS8603
using Infrastructure.EmailService;
using Microsoft.Data.SqlClient;

namespace Infrastructure;

public class InfrastructureSettings
{
    private string _dbConnectionString;
    public bool SeedWithCustomData { get; set; }
    public EmailConfiguration EmailConfiguration { get; set; }

    public string DbConnectionString
    {
        get
        {
            var databaseUrl = Environment.GetEnvironmentVariable(_dbConnectionString ?? "");
            return databaseUrl != null ? ParseDatabaseUrl(databaseUrl) : _dbConnectionString;
        }

        set => _dbConnectionString = value;
    }

    private static string ParseDatabaseUrl(string databaseUrl)
    {
        var databaseUri = new Uri(databaseUrl);
        var userInfo = databaseUri.UserInfo.Split(':');

        var builder = new SqlConnectionStringBuilder
        {
            DataSource = databaseUri.Host,
            InitialCatalog = databaseUri.LocalPath.TrimStart('/'),
            UserID = userInfo[0],
            Password = userInfo[1],
            Pooling = true,
            TrustServerCertificate = true
        };

        return builder.ToString();
    }
}