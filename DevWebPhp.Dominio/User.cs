namespace DevWebPhp.Dominio
{
    public class User
    {
        public int Id               { get; set; }
        public string Nome          { get; set; }
        public string NomeCompleto  { get; set; }
        public string Email         { get; set; }
        public string Telefone      { get; set; }
        public string Senha         { get; set; }
        public int NivelUsuario     { get; set; }
        // 1 - 'admin' => Administrador || 2 - 'usuario' => Usuario
        public User() { }
        public User(int id, string nome, string nomeCompleto, string email, string telefone, string senha,
            string descricao, int nivelUsuario)
        {
            Id = id;
            Nome = nome;
            NomeCompleto = nomeCompleto;
            Email = email;
            Telefone = telefone;
            Senha = senha;            
            NivelUsuario = nivelUsuario;
        }       
        
    }
}