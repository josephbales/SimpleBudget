using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Web;
using SimpleBudget.Data.Context;
using System.Configuration;
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

services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(options =>
    {
        configuration.Bind("AzureAd", options);
        options.Events = new JwtBearerEvents();

        /// <summary>
        /// Below you can do extended token validation and check for additional claims, such as:
        ///
        /// - check if the caller's account is homed or guest via the 'acct' optional claim
        /// - check if the caller belongs to right roles or groups via the 'roles' or 'groups' claim, respectively
        ///
        /// Bear in mind that you can do any of the above checks within the individual routes and/or controllers as well.
        /// For more information, visit: https://docs.microsoft.com/azure/active-directory/develop/access-tokens#validate-the-user-has-permission-to-access-this-data
        /// </summary>

        options.Events.OnTokenValidated = async context =>
        {
            string[] allowedClientApps = { /* list of client ids to allow */ };

            string clientAppId = context?.Principal?.Claims
                .FirstOrDefault(x => x.Type == "azp" || x.Type == "appid")?.Value;

            var user = context.Principal;

            if (!allowedClientApps.Contains(clientAppId))
            {
                throw new System.Exception("This client is not authorized");
            }
        };
    }, options => { configuration.Bind("AzureAd", options); });

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
app.UseAuthorization();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
