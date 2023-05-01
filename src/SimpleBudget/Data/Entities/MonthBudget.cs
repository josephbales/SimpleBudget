namespace SimpleBudget.Data.Entities
{
    public class MonthBudget : BaseEntity
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal BufferAmount { get; set; } = 0;
        public decimal CurrentBalance { get; set; } = 0;
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public ICollection<BudgetItem> BudgetItems { get; set; } = null!;
    }
}
