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
            base.OnModelCreating(modelBuilder);
        }
    }
}
