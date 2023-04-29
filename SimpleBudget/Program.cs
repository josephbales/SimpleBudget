using Microsoft.EntityFrameworkCore;
using SimpleBudget.Data.Context;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

// Add services to the container.

services.AddControllersWithViews();
services.AddDbContext<SimpleBudgetContext>(options =>
    options.UseCosmos(
        accountEndpoint: configuration.GetValue<string>("Azure:CosmosDB:AccountEndpoint")
            ?? throw new ArgumentNullException(),
        accountKey: configuration.GetValue<string>("Azure:CosmosDB:AccountKey")
            ?? throw new ArgumentNullException(),
        databaseName: configuration.GetValue<string>("Azure:CosmosDB:DataBaseName")
            ?? throw new ArgumentNullException())
    );
services.AddAuthentication().AddMicrosoftAccount(microsoftOptions =>
{
    microsoftOptions.ClientId = configuration["Authentication:Microsoft:ClientId"]
        ?? throw new ArgumentNullException();
    microsoftOptions.ClientSecret = configuration["Authentication:Microsoft:ClientSecret"]
        ?? throw new ArgumentNullException();
});

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
