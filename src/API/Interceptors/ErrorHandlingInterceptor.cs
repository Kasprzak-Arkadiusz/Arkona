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
            UnauthorizedException => StatusCode.InvalidArgument,
            _ => ((Func<StatusCode>)(() =>
            {
                Log.Warning(exception, "Unexpected exception occured");
                message = "Something went wrong. Please try again";
                return StatusCode.Unknown;
            }))()
        };

        return (statusCode, message);
    }
       
}