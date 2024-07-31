using Demo2.Data;
using Demo2.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Demo2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly StudentsDBContext dBContext;
        public StudentsController(StudentsDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

  

        [HttpGet]
        public IActionResult GetStudents()
        {
       
            var AllStudents = dBContext.Students.ToList();

            return Ok(AllStudents);
        }

        [HttpGet]
        [Route("{id:int}")]
        public IActionResult GetStudentsById(int id)
        {
            var studentById = dBContext.Students.Find(id);

            if(studentById is null)
            {
                return NotFound();

            }

            return Ok(studentById);
        }


        [HttpPost]
        public IActionResult AddStudent (AddStudentDTO addStudentDTO)
        {

            var studentEntity = new Student()
            {
                EmployeeNo = addStudentDTO.EmployeeNo,
                FirstName = addStudentDTO.FirstName,
                LastName = addStudentDTO.LastName,
                DateOfBirth =  addStudentDTO.DateOfBirth,
                Salary = addStudentDTO.Salary
            };

            dBContext.Students.Add(studentEntity);
            dBContext.SaveChanges();

            return Ok(studentEntity);


        }


        [HttpPut]
        [Route("{id:int}")]
        public IActionResult UpdateStudent(int id, UpdateStudentDTO updateStudentDTO)
        {
            var student = dBContext.Students.Find(id);

            if (student is null)
            {
                return NotFound();

            }

            student.EmployeeNo = updateStudentDTO.EmployeeNo;
            student.FirstName = updateStudentDTO.FirstName;
            student.LastName = updateStudentDTO.LastName;
            student.DateOfBirth = updateStudentDTO.DateOfBirth;
            student.Salary = updateStudentDTO.Salary;

           

            dBContext.SaveChanges();



            return Ok(student);
        }


        
        [HttpGet]
        [Route("averageSalry")]
        public IActionResult GetAverageSalary()
        {
            var allStudents = dBContext.Students.ToList();

            if (allStudents.Count == 0)
            {
                return Ok(new { Students = allStudents, AverageSalary = 0 });
            }

            var AverageSalary = dBContext.Students.Average(s => s.Salary);

            return Ok(AverageSalary);
            
        }


        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult DeleteStudent(int id)
        {
            var student = dBContext.Students.Find(id);

            if (student is null)
            {
                return NotFound();

            }
            dBContext.Students.Remove(student);
            dBContext.SaveChanges();

            return Ok();
        }
    }
}
