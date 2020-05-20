using System.ComponentModel.DataAnnotations;

namespace DevWebPhp.WebAPI.Dtos
{
    public class UserDto
    {
        public int Id               { get; set; }
        [Required(ErrorMessage = "{0} é obrigatório!!")]
        [StringLength(130, MinimumLength=2, ErrorMessage = "{0} deve ter entre 2 a 130 caracteres")]
        public string Nome          { get; set; }
        [Required(ErrorMessage = "{0} é obrigatório!!")]
        [StringLength(170, MinimumLength = 6, ErrorMessage = "{0} deve ter entre 6 a 170 caracteres")]
        public string NomeCompleto  { get; set; }
        [Required(ErrorMessage = "{0} é obrigatório!!")]
        [EmailAddress]
        public string Email         { get; set; }
        [Phone]
        [Required(ErrorMessage = "{0} é obrigatório!!")]
        public string Telefone      { get; set; }
        public string Senha         { get; set; }
        [Range(1,2, ErrorMessage = "Valor Fora do Padrão!! Somente os valores 1 ou 2.")]
        public int NivelUsuario     { get; set; }
    }
}