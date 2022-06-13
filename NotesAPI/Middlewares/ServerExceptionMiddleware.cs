using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using NotesAPI.Helpers;
using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace NotesAPI.Middlewares
{
    public class ServerExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ServerExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;

        public ServerExceptionMiddleware(RequestDelegate next, ILogger<ServerExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex){

                _logger.LogError(ex, ex.Message);

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                var serverError = _env.IsDevelopment()
                    ? new ServerError(context.Response.StatusCode, ex.Message, context.TraceIdentifier, ex.StackTrace?.ToString())
                    : new ServerError(context.Response.StatusCode, "Internal Server Error", context.TraceIdentifier);

                var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

                var jsonServerError = JsonSerializer.Serialize(serverError, jsonOptions);

                await context.Response.WriteAsync(jsonServerError);
            }
            
        }
    }

}
