using System;
namespace DevWebPhp.Dominio
{
    public class Request
    {
        public int Id                          { get; set; }
        public string Nome                     { get; set; }
        public string NomeCompleto             { get; set; }
        public string Email                    { get; set; }
        public DateTime? DataSolicitacao        { get; set; }
        public string Telefone                 { get; set; }
        public string Senha                    { get; set; }
        public string Descricao                { get; set; }

        public Request() {  }
        public Request(int id, string nome, string nomeCompleto, string email, DateTime dataSolicitacao,
            string telefone, string senha, string descricao
        )
        {
            Id = id;
            Nome = nome;
            NomeCompleto = nomeCompleto;
            Email = email;
            DataSolicitacao = dataSolicitacao;
            Telefone = telefone;
            Senha = senha;
            Descricao = descricao;            
        }
        
    }
}