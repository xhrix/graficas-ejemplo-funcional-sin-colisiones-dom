using System.Threading.Tasks;

namespace WorkspaceBuilder.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}