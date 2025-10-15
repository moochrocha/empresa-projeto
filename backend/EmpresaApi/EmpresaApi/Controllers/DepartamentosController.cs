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
    /// Controlador responsável por gerenciar as operações relacionadas aos Departamentos.
    /// Fornece endpoints CRUD e também acesso aos funcionários vinculados a um departamento.
    /// </summary>

    [ApiController]
    [Route("api/[controller]")]
    public class DepartamentosController : ControllerBase
    {
        private readonly AppDbContext _context;
        // Construtor que injeta o contexto do banco de dados (AppDbContext).
        public DepartamentosController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/departamentos; Retorna todos os departamentos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Departamento>>> GetDepartamentos()
        {
            var list = await _context.Departamentos
                                     .AsNoTracking()
                                     .ToListAsync();
            return Ok(list);
        }

        // GET: api/departamentos/5; Retorna um departamento pelo id
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Departamento>> GetDepartamento(int id)
        {
            var departamento = await _context.Departamentos
                                            .Include(d => d.Funcionarios) // carrega funcionários junto
                                            .AsNoTracking()
                                            .FirstOrDefaultAsync(d => d.Id == id);

            if (departamento == null) return NotFound();
            return Ok(departamento);
        }

        // GET: api/departamentos/5/funcionarios; Retorna todos os funcionários vinculados a um determinado departamento.
        [HttpGet("{id:int}/funcionarios")]
        public async Task<ActionResult<IEnumerable<Funcionario>>> GetFuncionariosByDepartamento(int id)
        {
            var exists = await _context.Departamentos.AnyAsync(d => d.Id == id);
            if (!exists) return NotFound();

            var funcionarios = await _context.Funcionarios
                                             .Where(f => f.DepartamentoId == id)
                                             .AsNoTracking()
                                             .ToListAsync();
            return Ok(funcionarios);
        }

        // POST: api/departamentos; Cria um departamento
        [HttpPost]
        public async Task<ActionResult<Departamento>> PostDepartamento([FromBody] Departamento departamento)
        {
            if (departamento == null) return BadRequest();

            _context.Departamentos.Add(departamento);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDepartamento), new { id = departamento.Id }, departamento);
        }

        // PUT: api/departamentos/5; Atualiza um departamento pelo id
        [HttpPut("{id:int}")]
        public async Task<IActionResult> PutDepartamento(int id, [FromBody] Departamento departamento)
        {
            if (id != departamento.Id) return BadRequest();

            _context.Entry(departamento).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartamentoExists(id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/departamentos/5; Deleta um departamento pelo id
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteDepartamento(int id)
        {
            var departamento = await _context.Departamentos.FindAsync(id);
            if (departamento == null) return NotFound();

            var hasEmployees = await _context.Funcionarios.AnyAsync(f => f.DepartamentoId == id);
            if (hasEmployees)
            {
                // Escolha: impedir exclusão ou excluir em cascade (aqui impedimos)
                return Conflict(new { message = "Departamento possui funcionários. Remova-os antes de excluir." });
            }

            _context.Departamentos.Remove(departamento);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool DepartamentoExists(int id)
            => _context.Departamentos.Any(e => e.Id == id);
    }
}