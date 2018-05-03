using System.Collections.Generic;
using System.Threading.Tasks;
using WorkspaceBuilder.Models;

namespace WorkspaceBuilder.Core
{
    public interface IWorkspaceRepository
    {
        Task<Workspace> GetWorkspace(int id);
        void Add(Workspace workspace);
        void Remove(Workspace workspace);
        IEnumerable<Workspace> GetWorkspaces();
    }
}