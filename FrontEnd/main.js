$(function () {
    // Function to fetch and display data
    function fetchData() {
        $.when(
            $.ajax({
                type: 'GET',
                url: 'http://localhost:5232/api/Employee'
            }),
            $.ajax({
                type: 'GET',
                url: 'http://localhost:5232/api/Employee/averageSalary'
            })
        ).done(function (studentsData, averageSalaryData) {
            // Process student data
            var tableBody = $('#employeeTable tbody');
            tableBody.empty(); // Clear any existing data

            studentsData[0].forEach(function (item) {
                var row = `<tr data-id="${item.id}">
                    <td>${item.employeeNo}</td>
                    <td>${item.firstName}</td>
                    <td>${item.lastName}</td>
                    <td>${item.dateOfBirth}</td>
                    <td>${item.salary}</td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                </tr>`;
                tableBody.append(row);
            });

            // Process average salary data
            var averageSalary = averageSalaryData[0];
            $('#employeeGrid h1').text('Average Salary: ' + averageSalary);

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error fetching data:', textStatus, errorThrown);
        });
    }

    // Fetch and display data when the page loads
    fetchData();

    // Handle form submission
    $('#employeeForm').on('submit', function(event) {
        event.preventDefault();

        // Gather form data
        var employeeData = {
            id: $('#id').val(),
            employeeNo: $('#empNo').val(),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            dateOfBirth: $('#dob').val(),
            salary: $('#salary').val()
        };

        // Determine if we are updating or creating a new record
        var requestType = employeeData.id ? 'PUT' : 'POST';
        var url = employeeData.id 
            ? `http://localhost:5232/api/Employee/${employeeData.id}` 
            : 'http://localhost:5232/api/Employee';

        // Send request
        $.ajax({
            type: requestType,
            url: url,
            contentType: 'application/json',
            data: JSON.stringify(employeeData),
            success: function(response) {
                console.log('Employee saved:', response);
                fetchData(); // Refresh the data table
                $('#employeeForm')[0].reset(); // Clear form
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });

    // Handle edit button click
    $('#employeeTable').on('click', '.edit-btn', function() {
        var row = $(this).closest('tr');
        var employeeId = row.data('id');

        $.ajax({
            type: 'GET',
            url: `http://localhost:5232/api/Employee/${employeeId}`,
            success: function(employee) {
                $('#id').val(employee.id);
                $('#empNo').val(employee.employeeNo);
                $('#firstName').val(employee.firstName);
                $('#lastName').val(employee.lastName);
                $('#dob').val(employee.dateOfBirth);
                $('#salary').val(employee.salary);
            },
            error: function(error) {
                console.error('Error fetching employee:', error);
            }
        });
    });

    // Handle delete button click
    $('#employeeTable').on('click', '.delete-btn', function() {
        var row = $(this).closest('tr');
        var employeeId = row.data('id');

        if (confirm('Are you sure you want to delete this employee?')) {
            $.ajax({
                type: 'DELETE',
                url: `http://localhost:5232/api/Employee/${employeeId}`,
                success: function(response) {
                    console.log('Employee deleted:', response);
                    fetchData(); // Refresh the data table
                },
                error: function(error) {
                    console.error('Error deleting employee:', error);
                }
            });
        }
    });
});
