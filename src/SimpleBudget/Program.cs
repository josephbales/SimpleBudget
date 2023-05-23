using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using SimpleBudget.Data.Context;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;
var env = builder.Environment;

// Add services to the container.

JsonSerializerOptions options = new()
{
    ReferenceHandler = ReferenceHandler.IgnoreCycles,
    WriteIndented = true
};

services.AddControllers().AddJsonOptions(opt =>
    opt.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

services.AddDbContext<SimpleBudgetContext>(options =>
    options.UseCosmos(
        accountEndpoint: configuration.GetValue<string>("Azure:CosmosDB:AccountEndpoint")
            ?? throw new ArgumentNullException(),
        accountKey: configuration.GetValue<string>("Azure:CosmosDB:AccountKey")
            ?? throw new ArgumentNullException(),
        databaseName: configuration.GetValue<string>("Azure:CosmosDB:DataBaseName")
            ?? throw new ArgumentNullException())
    );

services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
});

//services.AddAuthentication().AddGoogle(options =>
//{
//    options.ClientId = configuration["Authentication:Google:ClientId"]
//        ?? throw new ArgumentNullException();
//    options.ClientSecret = configuration["Authentication:Google:ClientSecret"]
//        ?? throw new ArgumentNullException();
//    options.Events.
//});

//services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddMicrosoftIdentityWebApi(options =>
//    {
//        configuration.Bind("AzureAd", options);
//        options.Events = new JwtBearerEvents();
//        options.Events.OnTokenValidated = async context =>
//        {
//            var principal = context.Principal;

//            if (principal != null)
//            {
//                var dbContext = context.HttpContext.RequestServices.GetRequiredService<SimpleBudgetContext>();

//                var userEmailClaim = principal.Claims
//                    .FirstOrDefault(x => x.Type == ClaimTypes.Email);
//                var user = await dbContext.Users
//                    .FirstOrDefaultAsync(x => x.Email == userEmailClaim.Value);

//                if (user == null)
//                {
//                    context.Fail("Not Authorized");
//                }
//                else
//                {
//                    context.Principal.Identities.First().AddClaim(new Claim("isadmin", "true", ClaimValueTypes.Boolean));
//                }
//            }
//            else
//            {
//                context.Fail("Not Authorized");
//            }
//        };
//    }, options => { configuration.Bind("AzureAd", options); });
services.AddSwaggerGen();

if (env.IsDevelopment())
{
    IdentityModelEventSource.ShowPII = true;
}

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseSwagger();
    app.UseSwaggerUI();
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
