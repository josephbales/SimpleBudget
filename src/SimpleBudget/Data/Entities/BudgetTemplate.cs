namespace SimpleBudget.Data.Entities
{
    public class BudgetTemplate : BaseEntity
    {
        public string Name { get; set; } = null!;
        public string? Description { get; set; } = null!;
        public decimal BufferAmount { get; set; } = 0;
        public bool IsDefault { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public ICollection<TemplateItem> TemplateItems { get; set; } = null!;
    }
}
