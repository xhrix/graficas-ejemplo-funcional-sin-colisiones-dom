using System;

namespace WorkspaceBuilder.Models
{
    public class Workspace
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Data { get; set; }

        public bool Deleted { get; set; }

        public DateTime LastUpdate { get; set; }
    }
}