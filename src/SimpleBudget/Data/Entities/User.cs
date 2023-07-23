namespace SimpleBudget.Data.Entities
{
    public class User : BaseEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string DisplayName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public ICollection<BudgetTemplate> BudgetTemplates { get; set; } = new List<BudgetTemplate>();
        public ICollection<MonthBudget> MonthBudgets { get; set; } = new List<MonthBudget>();
    }
}
