using System.Threading.Tasks;
using WorkspaceBuilder.Core;
using WorkspaceBuilder.Data;

namespace WorkspaceBuilder.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext context;

        public UnitOfWork(ApplicationDbContext context) => this.context = context;

        public async Task CompleteAsync() => await context.SaveChangesAsync();
    }
}