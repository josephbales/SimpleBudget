﻿namespace SimpleBudget.Data.Entities
{
    public class BudgetTemplate : BaseEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public decimal BufferAmount { get; set; } = 0;
        public bool IsDefault { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public ICollection<TemplateItem> TemplateItems { get; set; } = null!;
    }
}
