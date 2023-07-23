namespace SimpleBudget.Models.Budget
{
    public class BudgetItemsResponse
    {
        public BudgetItemDto[] BudgetItems { get; set; } = Array.Empty<BudgetItemDto>(); 
    }
}
