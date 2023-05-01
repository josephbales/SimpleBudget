namespace SimpleBudget.Data.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; } = null!;
        public string? MiddleName { get; set; }
        public string? LastName { get; set; }
        public string Email { get; set; } = null!;
        public ICollection<BudgetTemplate> BudgetTemplates { get; set; } = new List<BudgetTemplate>();
        public ICollection<MonthBudget> MonthBudgets { get; set; } = new List<MonthBudget>();
    }
}
