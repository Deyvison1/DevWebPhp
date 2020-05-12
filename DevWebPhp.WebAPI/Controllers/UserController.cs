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
    public class UserController : ControllerBase
    {
        private readonly IDevWebPhpRepositorio _repo;
        private readonly IMapper _mapper;
        public UserController(IDevWebPhpRepositorio repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetUser() {
            try {
                var user = await _repo.GetAllUsers();
                var result = _mapper.Map<IEnumerable<UserDto>>(user);
                
                return Ok(result);
            } catch(System.Exception e) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro n Lista todosUsers. CODE: {e.Message}");
            }
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id) {
            try {
                var user = await _repo.GetUserById(id);
                var result = _mapper.Map<UserDto>(user);

                return Ok(result);

            }catch (System.Exception e) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro na busca por Id, User. CODE: {e.Message} ");                
            }
        }
        [HttpGet("GetBuscar/{buscar}")]
        public async Task<IActionResult> GetUserByNomeOrEmailOrTelefoneOrNivelUser(string buscar) {
            try {
                var buscaUser = await _repo.GetUserByNomeOrEmailOrTelefoneOrNivelUser(buscar);
                var result = _mapper.Map<UserDto[]>(buscaUser);

                return Ok(result);
                
            } catch (System.Exception e) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro na busca personalizada, User. CODE: {e.Message}");
            }
        }
        [HttpPost]
        public async Task<IActionResult> AddUser(UserDto userDto) {
            try {
                var user = _mapper.Map<User>(userDto);
                _repo.Add(user);
                if(await _repo.SaveChanges()) {
                    return Created($"/api/user/{user.Id}", user);
                }
            } catch(System.Exception e) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro no addUser. CODE: {e.Message}");
            }
            return BadRequest();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserDto userDto) {
            try {
                var user = await _repo.GetUserById(id);
                if (user == null) return NotFound();

                _mapper.Map(userDto, user);

                _repo.Update(user);

                if(await _repo.SaveChanges()) {
                    return Created($"/api/user/{userDto.Id}", _mapper.Map<UserDto>(user));
                }

            } catch(System.Exception e) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro no updateUser. CODE: {e.Message}");
            }
            return BadRequest();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id) {
            try {
                var result = await _repo.GetUserById(id);
                if(result == null) return NotFound();

                _repo.Delete(result);
                if(await _repo.SaveChanges()) {
                    return Ok();
                }
            } catch(System.Exception e) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $" Erro no deleteUser. CODE: {e.Message}");
            }
            return BadRequest();
        }
    }
}