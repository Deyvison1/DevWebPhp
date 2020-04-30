using DevWebPhp.Dominio;
using Microsoft.EntityFrameworkCore;
namespace DevWebPhp.Repositorio.data
{
    public class DevWebPhpContext : DbContext
    {
        public DevWebPhpContext(DbContextOptions<DevWebPhpContext> options): base(options) {  }

        public DbSet<User> Users       { get; set; }
        public DbSet<Request> Requests { get; set; }
    }
}