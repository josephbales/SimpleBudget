namespace SimpleBudget.Data.Entities
{
    public class BudgetItem : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Note { get; set; }
        public decimal Amount { get; set; }
        public int? DayOfMonth { get; set; }
        public TransactionType TransactionType { get; set; }
        public bool IsTransacted { get; set; }
        public int MonthBudgetId { get; set; }
        public MonthBudget MonthBudget { get; set; } = null!;
    }
}
