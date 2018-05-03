using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WorkspaceBuilder.Data;
using WorkspaceBuilder.Models;

namespace WorkspaceBuilder.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Workspaces")]
    public class WorkspacesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public WorkspacesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Workspaces
        [HttpGet]
        public IEnumerable<Workspace> GetWorkspace()
        {
            return _context.Workspace;
        }

        // GET: api/Workspaces/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkspace([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var workspace = await _context.Workspace.SingleOrDefaultAsync(m => m.Id == id);

            if (workspace == null)
            {
                return NotFound();
            }

            return Ok(workspace);
        }

        // PUT: api/Workspaces/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkspace([FromRoute] int id, [FromBody] Workspace workspace)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != workspace.Id)
            {
                return BadRequest();
            }

            _context.Entry(workspace).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkspaceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Workspaces
        [HttpPost]
        public async Task<IActionResult> PostWorkspace([FromBody] Workspace workspace)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Workspace.Add(workspace);
            await _context.SaveChangesAsync();

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

            var workspace = await _context.Workspace.SingleOrDefaultAsync(m => m.Id == id);
            if (workspace == null)
            {
                return NotFound();
            }

            _context.Workspace.Remove(workspace);
            await _context.SaveChangesAsync();

            return Ok(workspace);
        }

        private bool WorkspaceExists(int id)
        {
            return _context.Workspace.Any(e => e.Id == id);
        }
    }
}