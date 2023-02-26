using Application.Common.Exceptions;
using Grpc.Core;
using Grpc.Core.Interceptors;
using Serilog;

namespace API.Interceptors;

public class ErrorHandlingInterceptor : Interceptor
{
    public override async Task<TResponse> UnaryServerHandler<TRequest, TResponse>(
        TRequest request, ServerCallContext context, UnaryServerMethod<TRequest, TResponse> continuation)
    {
        try
        {
            return await continuation(request, context);
        }
        catch (Exception e)
        {
            var (statusCode, message) = GetStatus(e);
            var status = new Status(statusCode, message);
            throw new RpcException(status);
        }
    }

    private static (StatusCode, string) GetStatus(Exception exception)
    {
        var message = exception.Message;
        var statusCode = exception switch
        {
            AlreadyExistsException => StatusCode.AlreadyExists,
            NotFoundException => StatusCode.NotFound,
            InvalidArgumentException => StatusCode.InvalidArgument,
            UnauthorizedException => StatusCode.Unauthenticated,
            ExternalServiceException => StatusCode.Unavailable,
            InternalServerException => ((Func<StatusCode>)(() =>
            {
                Log.Error(exception, "Internal server exception occured");
                message = "Ups, coś poszło nie tak.";
                return StatusCode.Unknown;
            }))(),
            _ => ((Func<StatusCode>)(() =>
            {
                Log.Error(exception, "Unexpected exception occured");
                message = "Ups, coś poszło nie tak.";
                return StatusCode.Unknown;
            }))()
        };

        return (statusCode, message);
    }
}