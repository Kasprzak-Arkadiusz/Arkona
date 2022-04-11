using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Entities;
using NUnit.Framework;

namespace Domain.UnitTests;

public class CinemaHallTests
{
    [Test]
    [TestCase(1, 240, 20)]
    [TestCase(12, 200, 10)]
    [TestCase(20, 180, 18)]
    public void When_CreatingCinemaHall_Should_ReturnNotNullProperties(byte hallNumber, short numberOfSeats,
        short numberOfSeatsInRow)
    {
        // Arrange

        // Act
        var hall = CinemaHall.Create(hallNumber, numberOfSeats, numberOfSeatsInRow);

        // Assert
        Assert.NotNull(hall);
        Assert.NotNull(hall.Seats);
        Assert.NotNull(hall.Seances);
    }

    [Test]
    [TestCase(1, 240, 20)]
    [TestCase(12, 200, 10)]
    [TestCase(20, 180, 18)]
    public void When_CreatingCinemaHall_Should_HavePropertiesCorrectlyInitialized(byte hallNumber, short numberOfSeats,
        short numberOfSeatsInRow)
    {
        // Arrange

        // Act
        var hall = CinemaHall.Create(hallNumber, numberOfSeats, numberOfSeatsInRow);

        // Assert
        Assert.AreEqual(hallNumber, hall.HallNumber);
        Assert.AreEqual(numberOfSeats, hall.NumberOfSeats);
    }
    
    [Test]
    [TestCase(1, 240, 20)]
    [TestCase(12, 200, 10)]
    [TestCase(20, 180, 18)]
    public void When_CreatingCinemaHall_Should_HaveRowsCorrectlyNumerated(byte hallNumber, short numberOfSeats,
        short numberOfSeatsInRow)
    {
        // Arrange
        var numberOfRows = numberOfSeats / numberOfSeatsInRow;
        var rowChars = new List<char>();

        var rowChar = 'A';
        for (var i = 0; i < numberOfRows; i++)
        {
            rowChars.Add(rowChar);
            rowChar = (char)(Convert.ToUInt16(rowChar) + 1);
        }

        // Act
        var hall = CinemaHall.Create(hallNumber, numberOfSeats, numberOfSeatsInRow);

        // Assert
        Assert.That(hall.Seats.Count == numberOfSeats);
        var seatRows = hall.Seats
            .GroupBy(s => s.Row)
            .Select(g => g.First().Row)
            .ToList();
        Assert.That(seatRows.Count == numberOfRows);
        CollectionAssert.AreEqual(rowChars, seatRows);
    }

    [Test]
    [TestCase(1, 240, 20)]
    [TestCase(12, 200, 10)]
    [TestCase(20, 180, 18)]
    public void When_CreatingCinemaHall_Should_HaveSeatsCorrectlyNumerated(byte hallNumber, short numberOfSeats,
        short numberOfSeatsInRow)
    {
        // Arrange
        var expectedSeatNumbers = new List<short>();
        for (short i = 1; i <= numberOfSeats; i++)
        {
            expectedSeatNumbers.Add(i);
        }

        // Act
        var hall = CinemaHall.Create(hallNumber, numberOfSeats, numberOfSeatsInRow);

        // Assert
        var actualSeatNumbers = hall.Seats.Select(s => s.Number).ToList();
        CollectionAssert.AreEqual(expectedSeatNumbers, actualSeatNumbers);
    }

    [Test]
    [TestCase(1, 250, 20)]
    [TestCase(12, 169, 10)]
    [TestCase(20, 181, 18)]
    public void When_LastRowHasDifferentNumberOfSeats_Should_HaveSeatsCorrectlyNumerated(byte hallNumber, short numberOfSeats,
        short numberOfSeatsInRow)
    {
        // Arrange
        var numberOfRows = numberOfSeats / numberOfSeatsInRow;
        var numberOfSeatsInLastRow = numberOfSeats % numberOfRows;
        var firstSeatNumberInLastRow = (short) (numberOfSeats - numberOfSeatsInLastRow + 1);
        var lastRowChar = (char)(Convert.ToUInt16('A') + numberOfRows);

        var expectedSeats = new List<Seat>();
        for (short i = 0; i < numberOfSeatsInLastRow; i++)
        {
            expectedSeats.Add(Seat.Create((short)(firstSeatNumberInLastRow + i), lastRowChar));
        }

        // Act
        var hall = CinemaHall.Create(hallNumber, numberOfSeats, numberOfSeatsInRow);

        // Assert
        var actualSeats = hall.Seats.Where(s => s.Row == lastRowChar).ToList();
        CollectionAssert.AreEqual(actualSeats.Select(s => s.Row), expectedSeats.Select(s => s.Row));
        CollectionAssert.AreEqual(actualSeats.Select(s => s.Number), expectedSeats.Select(s => s.Number));
    }
}