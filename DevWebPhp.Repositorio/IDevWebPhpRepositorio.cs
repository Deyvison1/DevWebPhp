using System.Threading.Tasks;
using DevWebPhp.Dominio;
namespace DevWebPhp.Repositorio
{
    public interface IDevWebPhpRepositorio
    {
        // GERAL
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         Task<bool> SaveChanges();
         // Requests
         // GetAll => Todas solicitações
         Task<Request[]> GetAllRequests();
         Task<Request[]> GetAllRequestByNomeOrEmailOrTelefoneOrDescricao(string buscar);
         Task<Request> GetRequestById(int id);
    }
}