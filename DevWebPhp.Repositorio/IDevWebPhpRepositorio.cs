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
         // Login
         Task<User> CheckSenha(string email, string senha);
         Task<User> FindNameByAsync(string name);
         // Requests
         // GetAll => Todas solicitações
         Task<Request[]> GetAllRequests();
         // GetPesquisaPerso
         Task<Request[]> GetAllRequestByNomeOrEmailOrTelefoneOrDescricao(string buscar);
         // GetPesquisaPorId
         Task<Request> GetRequestById(int id);
         
         // Users
         // GetUsers => Todos usuarios
         Task<User[]> GetAllUsers();
         // GetPesquisaPorId
         Task<User> GetUserById(int id);
         Task<User[]> GetUserByNomeOrEmailOrTelefoneOrNivelUser(string buscar);
    }
}