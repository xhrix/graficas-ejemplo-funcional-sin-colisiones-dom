using System.Collections.Generic;
using System.Threading.Tasks;
using WorkspaceBuilder.Core;
using WorkspaceBuilder.Data;
using WorkspaceBuilder.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace WorkspaceBuilder.Persistence
{
    public class WorkspaceRepository : IWorkspaceRepository
    {
        private readonly ApplicationDbContext context;

        public WorkspaceRepository(ApplicationDbContext context) => this.context = context;

        public void Add(Workspace workspace) => context.Workspace.Add(workspace);

        public async Task<Workspace> GetWorkspace(int id) => await context.Workspace.SingleOrDefaultAsync(m => m.Id == id);

        public IEnumerable<Workspace> GetWorkspaces() => context.Workspace.Where(m => !m.Deleted);

        public void Remove(Workspace workspace) => context.Remove(workspace);
    }
}