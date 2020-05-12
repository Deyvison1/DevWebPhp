using System.ComponentModel.DataAnnotations;

namespace DevWebPhp.WebAPI.Dtos
{
    public class UserDto
    {
        public int Id               { get; set; }
        public string Nome          { get; set; }
        public string NomeCompleto  { get; set; }
        public string Email         { get; set; }
        public string Telefone      { get; set; }
        public string Senha         { get; set; }
        public int NivelUsuario     { get; set; }
    }
}