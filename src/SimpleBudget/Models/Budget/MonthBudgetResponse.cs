namespace SimpleBudget.Models.Budget
{
    public class MonthBudgetResponse
    {
        public int Id { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal BufferAmount { get; set; } = 0;
        public decimal CurrentBalance { get; set; } = 0;
        public BudgetItemDto[] BudgetItems { get; set; } = Array.Empty<BudgetItemDto>();
    }
}
