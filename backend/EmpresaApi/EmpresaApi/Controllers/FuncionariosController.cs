using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmpresaApi.Data;
using EmpresaApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmpresaApi.Controllers
{
    /// <summary>
    /// Controlador responsável pelas operações relacionadas aos Funcionários.
    /// Permite listar, criar, editar e excluir funcionários, além de validar o vínculo com o departamento.
    /// </summary>

    [ApiController]
    [Route("api/[controller]")]
    public class FuncionariosController : ControllerBase
    {
        private readonly AppDbContext _context;
        // Construtor que injeta o contexto do banco de dados (AppDbContext).
        public FuncionariosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/funcionarios; Retorna todos os funcionários cadastrados
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Funcionario>>> GetFuncionarios()
        {
            var list = await _context.Funcionarios
                                     .AsNoTracking()
                                     .ToListAsync();
            return Ok(list);
        }

        // GET: api/funcionarios/5; Retorna funcionário pelo id
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Funcionario>> GetFuncionario(int id)
        {
            var funcionario = await _context.Funcionarios.FindAsync(id);
            if (funcionario == null) return NotFound();
            return Ok(funcionario);
        }

        // POST: api/funcionarios; Cria um funcionário novo
        [HttpPost]
        public async Task<ActionResult<Funcionario>> PostFuncionario([FromBody] Funcionario funcionario)
        {
            if (funcionario == null) return BadRequest();

            // valida se departamento existe
            var deptExists = await _context.Departamentos.AnyAsync(d => d.Id == funcionario.DepartamentoId);
            if (!deptExists) return BadRequest(new { message = "DepartamentoId inválido." });

            _context.Funcionarios.Add(funcionario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFuncionario), new { id = funcionario.Id }, funcionario);
        }

        // PUT: api/funcionarios/5; atualiza um funcionário pelo id
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutFuncionario(int id, [FromBody] Funcionario funcionario)
        {
            if (id != funcionario.Id) return BadRequest();

            // valida se departamento existe
            var deptExists = await _context.Departamentos.AnyAsync(d => d.Id == funcionario.DepartamentoId);
            if (!deptExists) return BadRequest(new { message = "DepartamentoId inválido." });

            _context.Entry(funcionario).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FuncionarioExists(id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/funcionarios/5; Deleta um funcionário pelo id
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteFuncionario(int id)
        {
            var funcionario = await _context.Funcionarios.FindAsync(id);
            if (funcionario == null) return NotFound();

            _context.Funcionarios.Remove(funcionario);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool FuncionarioExists(int id)
            => _context.Funcionarios.Any(e => e.Id == id);
    }
}
