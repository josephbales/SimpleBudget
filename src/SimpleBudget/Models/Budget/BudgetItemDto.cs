using SimpleBudget.Data;

namespace SimpleBudget.Models.Budget
{
    public class BudgetItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Notes { get; set; }
        public decimal Amount { get; set; }
        public int? DayOfMonth { get; set; }
        public TransactionType TransactionType { get; set; }
        public bool IsTransacted { get; set; }
        public int MonthBudgetId { get; set; }
    }
}
