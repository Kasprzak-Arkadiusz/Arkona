using Application.Common.Exceptions;
using Grpc.Core;
using Grpc.Core.Interceptors;

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
            var statusCode = GetStatusCode(e);
            var status = new Status(statusCode, e.Message);
            throw new RpcException(status);
        }
    }

    private static StatusCode GetStatusCode(Exception exception) =>
        exception switch
        {
            AlreadyExistsException => StatusCode.AlreadyExists,
            NotFoundException => StatusCode.NotFound,
            InvalidArgumentException => StatusCode.InvalidArgument,
            _ => StatusCode.Unknown
        };
}