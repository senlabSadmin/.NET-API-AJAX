using Demo2.Models;
using Microsoft.EntityFrameworkCore;

namespace Demo2.Data
{
    public class StudentsDBContext : DbContext
    {
        public StudentsDBContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Student> Students { get; set; }
    }
}
