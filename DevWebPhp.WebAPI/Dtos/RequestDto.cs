using System;
using System.ComponentModel.DataAnnotations;

namespace DevWebPhp.WebAPI.Dtos
{
    public class RequestDto
    {
        public int Id                          { get; set; }
        [Required(ErrorMessage = "{0} é obrigatório!!")]
        [StringLength(130, MinimumLength=2, ErrorMessage = "{0} deve ter entre 2 a 130 caracteres")]
        public string Nome                     { get; set; }
        [Required(ErrorMessage = "{0} é obrigatório!!")]
        [StringLength(170, MinimumLength = 6, ErrorMessage = "{0} deve ter entre 6 a 170 caracteres")]
        public string NomeCompleto             { get; set; }
        [Required(ErrorMessage = "{0} é obrigatório!!")]
        [EmailAddress]
        public string Email                    { get; set; }
        public string Senha                    { get; set; }
        [Phone]
        [Required(ErrorMessage = "{0} é obrigatório!!")]
        public string Telefone                 { get; set; }
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        public DateTime? DataSolicitacao        { get; set; }
        public string Descricao                { get; set; }
        public int Situacao                     { get; set; }

    }
}