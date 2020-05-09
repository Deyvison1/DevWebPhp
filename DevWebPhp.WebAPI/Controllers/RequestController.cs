using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DevWebPhp.Dominio;
using DevWebPhp.Repositorio;
using DevWebPhp.WebAPI.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DevWebPhp.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IDevWebPhpRepositorio _repo;
        private readonly IMapper _mapper;
        public RequestController(IDevWebPhpRepositorio repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;

        }
        // Lista Todos
        [HttpGet]
        public async Task<IActionResult> GetRequest() {
            try {
                var request = await _repo.GetAllRequests();
                var result = _mapper.Map<IEnumerable<RequestDto>>(request);
                return Ok(result);

            } catch(System.Exception e) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro n Lista todosRequest. CODE: {e.Message}");
            }
        }
        // Lista por Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRequestById(int id) {
            try {
                var request = await _repo.GetRequestById(id);
                var result = _mapper.Map<RequestDto>(request);
                return Ok(result);

            } catch(System.Exception e) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro n Lista todosRequest. CODE: {e.Message}");
            }
        }
        // Listar por Nome ou Email ou Telefone ou Descricao
        [HttpGet("GetBuscar/{busca}")]
        public async Task<IActionResult> GetAllRequestByNomeOrEmailOrTelefoneOrDescricao(string busca) {
            try {
                var buscaRquest = await _repo.GetAllRequestByNomeOrEmailOrTelefoneOrDescricao(busca);
                var result = _mapper.Map<RequestDto[]>(buscaRquest);
                return Ok(result);
            } catch(System.Exception e) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro n Lista todosRequest. CODE: {e.Message}");
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddRequest(RequestDto requestDto) {
            try {
                var request = _mapper.Map<Request>(requestDto);
                _repo.Add(request);
                if(await _repo.SaveChanges()) {
                    return Created($"/api/request/{request.Id}", request);
                }
                
            } catch(System.Exception e) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro n Lista todosRequest. CODE: {e.Message}");
            }
            return BadRequest();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRequest (int id ,RequestDto requestDto) {
            try {
                var request = await _repo.GetRequestById(id);
                if (request == null) return NotFound();

                _mapper.Map(requestDto, request);
                
                _repo.Update(request);

                if(await _repo.SaveChanges()) {
                    return Created($"/api/request/{requestDto.Id}", _mapper.Map<RequestDto>(request));
                }
            }
            catch(System.Exception e) {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro n Lista todosRequest. CODE: {e.Message}");
            }
            return BadRequest();

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest (int id) {
            try {
                var result = await _repo.GetRequestById(id);
                if (result == null) return NotFound();

                _repo.Delete(result);

                if(await _repo.SaveChanges()) {
                    return Ok();
                }
            }
            catch(System.Exception e) {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro n Lista todosRequest. CODE: {e.Message}");
            }
            return BadRequest();

        }
    }
}