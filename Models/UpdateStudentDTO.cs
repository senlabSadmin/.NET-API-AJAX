﻿namespace Demo2.Models
{
    public class UpdateStudentDTO
    {
        public required string EmployeeNo { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required DateOnly DateOfBirth { get; set; }
        public required float Salary { get; set; }
    }
}
