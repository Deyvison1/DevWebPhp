using AutoMapper;
using DevWebPhp.Dominio;
using DevWebPhp.WebAPI.Dtos;

namespace DevWebPhp.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() {
            CreateMap<Request, RequestDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
        }   
    }
}