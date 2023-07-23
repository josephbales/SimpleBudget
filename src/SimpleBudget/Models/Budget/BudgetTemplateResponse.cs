namespace SimpleBudget.Models.Budget
{
    public class BudgetTemplateResponse
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal BufferAmount { get; set; } = 0;
        public bool IsDefault { get; set; }
        public TemplateItemDto[] TemplateItems { get; set; } = Array.Empty<TemplateItemDto>();
    }
}
