using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WorkspaceBuilder.Models;
using WorkspaceBuilder.Core;

namespace WorkspaceBuilder.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Workspaces")]
    public class WorkspacesController : Controller
    {
        private readonly IWorkspaceRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public WorkspacesController(IWorkspaceRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.repository = repository;
        }

        // GET: api/Workspaces
        [HttpGet]
        public IEnumerable<Workspace> GetWorkspace() => repository.GetWorkspaces();

        // GET: api/Workspaces/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkspace([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var workspace = await repository.GetWorkspace(id);

            if (workspace == null)
            {
                return NotFound();
            }

            return Ok(workspace);
        }

        // PUT: api/Workspaces/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkspace([FromRoute] int id, [FromBody] Workspace workspaceModified)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var workspace = await repository.GetWorkspace(id);

            if( workspace == null ) return NotFound();
            workspace.Name = workspaceModified.Name;
            workspace.Data = workspaceModified.Data;
            workspace.LastUpdate = DateTime.Now;

            await unitOfWork.CompleteAsync();
            workspace = await repository.GetWorkspace(workspace.Id);
            return Ok(workspace);
        }

        // POST: api/Workspaces
        [HttpPost]
        public async Task<IActionResult> PostWorkspace([FromBody] Workspace workspace)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            workspace.LastUpdate = DateTime.Now;
            repository.Add(workspace);
            await unitOfWork.CompleteAsync();
            workspace = await repository.GetWorkspace(workspace.Id);
            return CreatedAtAction("GetWorkspace", new { id = workspace.Id }, workspace);
        }

        // DELETE: api/Workspaces/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkspace([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var workspace = await repository.GetWorkspace(id);
            if (workspace == null)
            {
                return NotFound();
            }

            repository.Remove(workspace);
            await unitOfWork.CompleteAsync();

            return Ok(workspace);
        }
    }
}