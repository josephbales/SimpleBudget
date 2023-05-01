using Microsoft.EntityFrameworkCore;
using SimpleBudget.Data.Entities;

namespace SimpleBudget.Data.Context
{
    public class SimpleBudgetContext : DbContext
    {
        public SimpleBudgetContext(DbContextOptions<SimpleBudgetContext> options)
            : base(options)
        {
        }

        public DbSet<BudgetTemplate> BudgetTemplates { get; set; } = null!;
        public DbSet<TemplateItem> TemplateItems { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<MonthBudget> MonthBudgets { get; set; } = null!;
        public DbSet<BudgetItem> BudgetItems { get; set; } = null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // TODO: Add Fluent API configuration here
            modelBuilder.HasDefaultContainer("User");

            modelBuilder.Entity<User>().HasPartitionKey(e => e.Id);
            modelBuilder.Entity<User>().HasMany(e => e.BudgetTemplates);
            modelBuilder.Entity<User>().HasMany(e => e.MonthBudgets);

            modelBuilder.Entity<BudgetTemplate>().HasPartitionKey(e => e.Id);
            modelBuilder.Entity<BudgetTemplate>().HasMany(e => e.TemplateItems);
            modelBuilder.Entity<BudgetTemplate>().HasOne(e => e.User);

            modelBuilder.Entity<MonthBudget>().HasPartitionKey(e => e.Id);
            modelBuilder.Entity<MonthBudget>().HasMany(e => e.BudgetItems);
            modelBuilder.Entity<MonthBudget>().HasOne(e => e.User);

            modelBuilder.Entity<BudgetItem>().HasPartitionKey(e => e.Id);
            modelBuilder.Entity<BudgetItem>().HasOne(e => e.MonthBudget);

            modelBuilder.Entity<TemplateItem>().HasPartitionKey(e => e.Id);
            modelBuilder.Entity<TemplateItem>().HasOne(e => e.BudgetTemplate);

            base.OnModelCreating(modelBuilder);
        }
    }
}
