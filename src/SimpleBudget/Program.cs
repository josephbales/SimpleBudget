using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using Microsoft.IdentityModel.Logging;
using SimpleBudget.Data.Context;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

// Add services to the container.

JsonSerializerOptions options = new()
{
    ReferenceHandler = ReferenceHandler.IgnoreCycles,
    WriteIndented = true
};

services.AddControllers().AddJsonOptions(opt => opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
services.AddDbContext<SimpleBudgetContext>(options =>
    options.UseCosmos(
        accountEndpoint: configuration.GetValue<string>("Azure:CosmosDB:AccountEndpoint")
            ?? throw new ArgumentNullException(),
        accountKey: configuration.GetValue<string>("Azure:CosmosDB:AccountKey")
            ?? throw new ArgumentNullException(),
        databaseName: configuration.GetValue<string>("Azure:CosmosDB:DataBaseName")
            ?? throw new ArgumentNullException())
    );
//services.AddAuthentication().AddMicrosoftAccount(microsoftOptions =>
//{
//    microsoftOptions.ClientId = configuration["Authentication:Microsoft:ClientId"]
//        ?? throw new ArgumentNullException();
//    microsoftOptions.ClientSecret = configuration["Authentication:Microsoft:ClientSecret"]
//        ?? throw new ArgumentNullException();
//});

//services.AddAuthentication().AddGoogle(googleOptions =>
//{
//    googleOptions.ClientId = configuration["Authentication:Google:ClientId"];
//    googleOptions.ClientSecret = configuration["Authentication:Google:ClientSecret"];
//});

services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(options =>
    {
        configuration.Bind("AzureAd", options);
        options.Events = new JwtBearerEvents();
        options.Events.OnTokenValidated = async context =>
        {
            var principal = context.Principal;

            if (principal != null)
            {
                var dbContext = context.HttpContext.RequestServices.GetRequiredService<SimpleBudgetContext>();

                var userEmailClaim = principal.Claims
                    .FirstOrDefault(x => x.Type == ClaimTypes.Email);
                var user = await dbContext.Users
                    .FirstOrDefaultAsync(x => x.Email == userEmailClaim.Value);

                if (user == null)
                {
                    context.Fail("Not Authorized");
                }
                else
                {
                    context.Principal.Identities.First().AddClaim(new Claim("isadmin", "true", ClaimValueTypes.Boolean));
                }
            }
            else
            {
                context.Fail("Not Authorized");
            }
        };
    }, options => { configuration.Bind("AzureAd", options); });

IdentityModelEventSource.ShowPII = true;

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
