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


        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.HasPostgresEnum<TransactionType>();

            builder.Entity<User>().Property(p => p.CreatedOnUtc).HasDefaultValueSql("now()");
            builder.Entity<User>().Property(p => p.UpdatedOnUtc).HasDefaultValueSql("now()");
            builder.Entity<User>().HasMany(e => e.BudgetTemplates);
            builder.Entity<User>().HasMany(e => e.MonthBudgets);
            builder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    FirstName = "Joseph",
                    LastName = "Bales",
                    DisplayName = "Joey",
                    Email = "joseph.bales@gmail.com",
                    CreatedBy = "joseph.bales@gmail.com",
                    UpdatedBy = "joseph.bales@gmail.com",
                });

            builder.Entity<BudgetTemplate>().Property(p => p.CreatedOnUtc).HasDefaultValueSql("now()");
            builder.Entity<BudgetTemplate>().Property(p => p.UpdatedOnUtc).HasDefaultValueSql("now()");
            builder.Entity<BudgetTemplate>().HasMany(e => e.TemplateItems);
            builder.Entity<BudgetTemplate>().HasOne(e => e.User);

            builder.Entity<MonthBudget>().Property(p => p.CreatedOnUtc).HasDefaultValueSql("now()");
            builder.Entity<MonthBudget>().Property(p => p.UpdatedOnUtc).HasDefaultValueSql("now()");
            builder.Entity<MonthBudget>().HasMany(e => e.BudgetItems);
            builder.Entity<MonthBudget>().HasOne(e => e.User);

            builder.Entity<BudgetItem>().Property(p => p.CreatedOnUtc).HasDefaultValueSql("now()");
            builder.Entity<BudgetItem>().Property(p => p.UpdatedOnUtc).HasDefaultValueSql("now()");
            builder.Entity<BudgetItem>().HasOne(e => e.MonthBudget);

            builder.Entity<TemplateItem>().Property(p => p.CreatedOnUtc).HasDefaultValueSql("now()");
            builder.Entity<TemplateItem>().Property(p => p.UpdatedOnUtc).HasDefaultValueSql("now()");
            builder.Entity<TemplateItem>().HasOne(e => e.BudgetTemplate);

            base.OnModelCreating(builder);
        }
    }
}
