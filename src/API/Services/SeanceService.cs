﻿using API.Services.CustomServices;
using Application.Seances.Queries;
using Application.Seats.Queries;
using Domain.Services;
using Grpc.Core;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Serilog;

namespace API.Services;

public class SeanceService : Seance.SeanceBase
{
    private readonly IMediator _mediator;
    private readonly SeanceRoomService _seanceRoomService;

    public SeanceService(IMediator mediator, SeanceRoomService seanceRoomService)
    {
        _mediator = mediator;
        _seanceRoomService = seanceRoomService;
    }

    public override async Task<GetClosestSeancesResponse> GetClosestSeances(GetClosestSeancesRequest request,
        ServerCallContext context)
    {
        var seances = await _mediator.Send(new GetClosestSeancesQuery(request.MovieId));

        var response = new GetClosestSeancesResponse();
        foreach (var dict in seances)
        {
            var seanceInfoArray = new SeanceInfoArray
            {
                Key = dict.Key
            };

            seanceInfoArray.Seances.AddRange(dict.Value.Select(si => new SeanceInfo
            {
                Id = si.Id,
                Time = si.Time
            }));

            response.Values.Add(seanceInfoArray);
        }

        return response;
    }

    [Authorize]
    public override async Task<GetSeatsBySeanceResponse> GetSeatsBySeance(GetSeatsBySeanceRequest request,
        ServerCallContext context)
    {
        var seanceSeats = await _mediator.Send(new GetSeatsBySeanceQuery(request.SeanceId));

        var leftSection = new SeanceSeatSection
        {
            Section = CinemaHallSection.Left,
            Width = CinemaHallSectionService.NumberOfSeatsInSideSection
        };
        leftSection.Seats.AddRange(seanceSeats.Where(ss => ss.Section == Domain.Enums.CinemaHallSection.Left)
            .Select(ss => new SeanceSeatInfo
            {
                Id = ss.Id,
                Number = ss.Number,
                Row = ss.Row.ToString(),
                IsFree = ss.IsFree
            }));

        var middleSection = new SeanceSeatSection
        {
            Section = CinemaHallSection.Middle,
            Width = CinemaHallSectionService.NumberOfSeatsInARow -
                    2 * CinemaHallSectionService.NumberOfSeatsInSideSection
        };
        middleSection.Seats.AddRange(seanceSeats.Where(ss => ss.Section == Domain.Enums.CinemaHallSection.Middle)
            .Select(ss => new SeanceSeatInfo
            {
                Id = ss.Id,
                Number = ss.Number,
                Row = ss.Row.ToString(),
                IsFree = ss.IsFree
            }));

        var rightSection = new SeanceSeatSection
        {
            Section = CinemaHallSection.Right,
            Width = CinemaHallSectionService.NumberOfSeatsInSideSection
        };
        rightSection.Seats.AddRange(seanceSeats.Where(ss => ss.Section == Domain.Enums.CinemaHallSection.Right)
            .Select(ss => new SeanceSeatInfo
            {
                Id = ss.Id,
                Number = ss.Number,
                Row = ss.Row.ToString(),
                IsFree = ss.IsFree
            }));

        var response = new GetSeatsBySeanceResponse
        {
            Sections = { leftSection, middleSection, rightSection },
            NumberOfRows = seanceSeats.Count / CinemaHallSectionService.NumberOfSeatsInARow
        };
        return response;
    }

    [Authorize]
    public override async Task ChooseSeat(IAsyncStreamReader<ChooseSeatRequest> requestStream,
        IServerStreamWriter<ChooseSeatResponse> responseStream, ServerCallContext context)
    {
        var result = await requestStream.MoveNext(context.CancellationToken);
        var seanceId = requestStream.Current.SeanceId;
        var userId = requestStream.Current.UserId;
        var makeUpChanges = requestStream.Current.MakeUpChanges;

        try
        {
            _seanceRoomService.Join(seanceId, userId, responseStream);
            
            if (makeUpChanges)
            {
                Log.Information("Making up changes userId: {UserId}", userId);
                await _seanceRoomService.MakeUpChanges(seanceId, userId, responseStream);
            }
            
            while (!context.CancellationToken.IsCancellationRequested)
            {
                while (result)
                {
                    var current = requestStream.Current;
                    await _seanceRoomService.BroadcastAsync(current);
                    result = await requestStream.MoveNext(context.CancellationToken);
                }

                await Task.Delay(1000);
            }
        }
        finally
        {
            _seanceRoomService.Leave(seanceId, userId);
        }
    }

    public override async Task<GetSeanceDetailsResponse> GetSeanceDetails(GetSeanceDetailsRequest request,
        ServerCallContext context)
    {
        var viewModel = await _mediator.Send(new GetSeanceDetailsQuery(request.SeanceId));

        var response = new GetSeanceDetailsResponse
        {
            MovieTitle = viewModel.MovieTitle,
            SeanceDate = viewModel.SeanceDate,
            SeanceTime = viewModel.SeanceTime,
            HallNumber = viewModel.HallNumber
        };
        return response;
    }

    [Authorize]
    public override Task<DisconnectResponse> Disconnect(DisconnectRequest request, ServerCallContext context)
    {
        _seanceRoomService.Disconnect(request.SeanceId, request.UserId);
        return Task.FromResult(new DisconnectResponse());
    }
}