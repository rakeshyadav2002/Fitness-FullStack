using System.Text;

namespace FitnessAPI.Middleware
{
    public class RequestResponseLoggingMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ILogger<RequestResponseLoggingMiddleware>
            _logger;

        public RequestResponseLoggingMiddleware(
            RequestDelegate next,
            ILogger<RequestResponseLoggingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            context.Request.EnableBuffering();

            var requestBody = "";

            if (context.Request.ContentLength > 0)
            {
                using var reader =
                    new StreamReader(
                        context.Request.Body,
                        Encoding.UTF8,
                        leaveOpen: true);

                requestBody =
                    await reader.ReadToEndAsync();

                context.Request.Body.Position = 0;
            }

            _logger.LogInformation(
                $"REQUEST => " +
                $"{context.Request.Method} " +
                $"{context.Request.Path} " +
                $"BODY => {requestBody}");

            var originalBodyStream =
                context.Response.Body;

            using var responseBody =
                new MemoryStream();

            context.Response.Body = responseBody;

            try
            {
                await _next(context);

                responseBody.Seek(0, SeekOrigin.Begin);

                var responseText =
                    await new StreamReader(responseBody)
                    .ReadToEndAsync();

                _logger.LogInformation(
                    $"RESPONSE => " +
                    $"{context.Response.StatusCode} " +
                    $"BODY => {responseText}");

                responseBody.Seek(0, SeekOrigin.Begin);

                await responseBody.CopyToAsync(
                    originalBodyStream);
            }
            catch
            {
                context.Response.Body = originalBodyStream;
                throw;
            }
            finally
            {
                context.Response.Body = originalBodyStream;
            }
        }
    }
}
