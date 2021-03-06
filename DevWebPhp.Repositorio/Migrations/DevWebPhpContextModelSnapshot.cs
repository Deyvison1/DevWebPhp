﻿// <auto-generated />
using System;
using DevWebPhp.Repositorio.data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace DevWebPhp.Repositorio.Migrations
{
    [DbContext(typeof(DevWebPhpContext))]
    partial class DevWebPhpContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity("DevWebPhp.Dominio.Request", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("DataSolicitacao");

                    b.Property<string>("Descricao");

                    b.Property<string>("Email");

                    b.Property<string>("Nome");

                    b.Property<string>("NomeCompleto");

                    b.Property<string>("Senha");

                    b.Property<int>("Situacao");

                    b.Property<string>("Telefone");

                    b.HasKey("Id");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("DevWebPhp.Dominio.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<int>("NivelUsuario");

                    b.Property<string>("Nome");

                    b.Property<string>("NomeCompleto");

                    b.Property<string>("Senha");

                    b.Property<string>("Telefone");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
