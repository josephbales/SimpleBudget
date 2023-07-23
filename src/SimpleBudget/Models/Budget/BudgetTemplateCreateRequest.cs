namespace SimpleBudget.Models.Budget
{
    public class BudgetTemplateCreateRequest
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal BufferAmount { get; set; } = 0;
        public bool IsDefault { get; set; }
    }
}
