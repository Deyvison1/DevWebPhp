using System.Linq;
using System.Threading.Tasks;
using DevWebPhp.Dominio;
using DevWebPhp.Repositorio.data;
using Microsoft.EntityFrameworkCore;

namespace DevWebPhp.Repositorio
{
    public class DevWebPhpRepositorio : IDevWebPhpRepositorio
    {
        private readonly DevWebPhpContext _context;
        public DevWebPhpRepositorio(DevWebPhpContext context) 
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
        // Geral
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChanges()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }

        // Request
        // Buscas
        public async Task<Request[]> GetAllRequests()
        {
            return await _context.Requests.OrderByDescending(x => x.Id).ToArrayAsync();
        }

        public async Task<Request> GetRequestById(int id)
        {
            return await _context.Requests.FirstOrDefaultAsync(x => x.Id == id); 
        }

        public async Task<Request[]> GetAllRequestByNomeOrEmailOrTelefoneOrDescricao(string buscar)
        {
            IQueryable<Request> query = _context.Requests.Where(
                resultBusca => resultBusca.Nome.ToLower() == buscar || resultBusca.NomeCompleto.ToLower() == buscar ||
                resultBusca.Email == buscar || resultBusca.Telefone == buscar ||
                resultBusca.Descricao == buscar
            );
            return await query.ToArrayAsync();
            /*
            var result = _context.Requests.Where(
                resultBusca => resultBusca.Nome == buscar || resultBusca.NomeCompleto == buscar ||
                resultBusca.Email == buscar || resultBusca.Telefone == buscar ||
                resultBusca.Descricao == buscar
            );
            return await result.ToArrayAsync();
            */
        }

    }
}