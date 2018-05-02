using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WorkspaceBuilder.Models;

namespace WorkspaceBuilder.EntityConfigurations
{
    public class WorkspaceConfiguration : IEntityTypeConfiguration<Workspace>
    {
        public void Configure(EntityTypeBuilder<Workspace> builder)
        {
            builder.Property(m => m.Name)
                .IsRequired()
                .HasMaxLength(256);

            builder.HasIndex(m => m.Name).IsUnique();

            builder.Property(m => m.Data)
                .IsRequired();
        }
    }
}