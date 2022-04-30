using Domain.Services;
using NUnit.Framework;

namespace Domain.UnitTests;

public class UserFriendlyNumberGeneratorTests
{
    [Test]
    [TestCase(1, 1649756790377, 7, "1164-756790-3777")]
    [TestCase(1234, 1649756790377, 0, "1234-756790-3770")]
    [TestCase(12345678, 1649756790377, 4, "5678-756790-3774")]
    public void When_GivenIdAndMilliseconds_Should_GenerateNumber(int id, long milliseconds, int lastDigit, string actualNumber)
    {
        // Arrange

        // Act
        var expectedNumber = UserFriendlyNumberGenerator.Generate(id, milliseconds, lastDigit);

        // Assert
        Assert.AreEqual(expectedNumber, actualNumber);
    }
}