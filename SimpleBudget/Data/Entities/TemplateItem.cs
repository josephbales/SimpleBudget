namespace SimpleBudget.Data.Entities
{
    public class TemplateItem : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string? Notes { get; set; }
        public decimal Amount { get; set; }
        public int? DayOfMonth { get; set; }
        public TransactionType TransactionType { get; set; }
        public Guid BudgetTemplateId { get; set; }
        public BudgetTemplate BudgetTemplate { get; set; } = null!;
    }
}
